import { type ConfiguredRepo, type Storage } from "./extension";

require("regenerator-runtime");

/**
 * The review state the pull request can be in
 */
export type PullRequestReviewState =
  | "PENDING"
  | "COMMENTED"
  | "APPROVED"
  | "CHANGES_REQUESTED"
  | "DISMISSED"
  | null; // This will be null when the user has not given a review

export type CheckStatusRaw =
  | "REQUESTED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "WAITING"
  | "PENDING";

export type CheckConclusionRaw =
  | "ACTION_REQUIRED"
  | "TIMED_OUT"
  | "CANCELLED"
  | "FAILURE"
  | "SUCCESS"
  | "NEUTRAL"
  | "SKIPPED"
  | "STARTUP_FAILURE"
  | "STALE";

interface CheckSuiteRaw {
  status: CheckStatusRaw;
  conclusion: CheckConclusionRaw;
}

/**
 * The raw JSON response body when fetching the pull request data for a given
 * repository  from GitHub's GraphQL API
 */
type PullRequestResponseRaw = Record<
  string,
  {
    name: string;
    owner: {
      login: string;
    };
    url: string;
    pullRequests: {
      nodes: Array<{
        number: number;
        title: string;
        body: string;
        url: string;
        isDraft: boolean;
        author: {
          login: string;
        };
        viewerLatestReview: {
          state: PullRequestReviewState;
        } | null;
        checksUrl: string;
        commits: {
          nodes: Array<{
            commit: {
              checkSuites: {
                nodes: CheckSuiteRaw[];
              };
            };
          }>;
        };
      }>;
    };
  }
>;

/**
 * The raw JSON response body when fetching the authenticated user from
 * GitHub's GraphQL API
 */
interface AuthenticatedUserResponse {
  /** The login username */
  viewer: {
    login: string;
  };
}

export type ChecksState = "SUCCESS" | "FAILURE" | "PENDING" | "NONE";

export interface RepoData {
  /** The owner of the repo */
  owner: string;
  /** The name of the repo */
  name: string;
  /** The url of the repo */
  url: ConfiguredRepo["url"];
  /** All the pull requests open for this repo */
  pullRequests: PullRequestData[];
  /** Determines if the user configured Jira for this repo */
  isJiraConfigured: boolean;
}

/**
 * The parsed information of a pull request
 */
export interface PullRequestData {
  /** The title of the pull request */
  title: string;
  /** The description of the pull request */
  body: string;
  /** The issue number of the pull request */
  number: number;
  /** The url of the pull request */
  url: ConfiguredRepo["url"];
  /** The login username of the author of the pull request */
  username: string;
  /** The url of the detected Jira ticket */
  jiraUrl?: string;
  /** Indicates if this pull request is in draft */
  draft: boolean;
  /** Indicates the type of the last review this user gave on the pull request */
  viewerLatestReview: PullRequestReviewState;
  checksUrl: string;
  checksState: ChecksState;
}

/**
 * The parsed information of the Authenticated User
 */
interface AuthenticatedUserData {
  /** The login username */
  username: string;
}

/**
 * A client to provide a variety of functions that communicate with
 * GitHub's REST API. Creating a new client reads the authentication token
 * from configuration.
 */
export default class GitHubClient {
  token: Storage["token"];

  constructor(token: Storage["token"]) {
    this.token = token;
  }

  async getAuthenticatedUser(): Promise<AuthenticatedUserData> {
    const query = `
        {
          viewer {
            login
          }
        }
        `;

    const headersList = {
      Accept: "application/json",
      Authorization: `token ${this.token}`,
    };

    const response = await fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify({ query }),
    });
    const data = (await response.json()).data as AuthenticatedUserResponse;
    const parsed: AuthenticatedUserData = {
      username: data.viewer.login,
    };
    return parsed;
  }

  private static randomAlphaString(): string {
    return Array(10)
      .fill(0)
      .map(() => String.fromCharCode(Math.random() * 26 + 97))
      .join("");
  }

  /**
   * Helper method to parse all the check suites and return the overall
   * status of if the checks have passed, failed, are in progress, or none were configured.
   * @
   */
  private static getCheckState(checkSuites: CheckSuiteRaw[]): ChecksState {
    let overallStatus: ChecksState = "SUCCESS";
    let hasPending = false;
    checkSuites.forEach((checkSuite) => {
      if (checkSuite.status === "IN_PROGRESS") {
        hasPending = true;
      }
      if (
        checkSuite.conclusion === "FAILURE" ||
        checkSuite.conclusion === "TIMED_OUT" ||
        checkSuite.conclusion === "CANCELLED"
      ) {
        overallStatus = "FAILURE";
      }
    });

    if (hasPending) {
      overallStatus = "PENDING";
    }

    // If there aren't any checks configured on the repository
    if (checkSuites.length === 0) {
      overallStatus = "NONE";
    }

    return overallStatus;
  }

  /**
   * Fetches the raw data for each repository that the user has configured
   * @param repositories The user configured repositories in storage
   */
  private async getRawRepoData(
    repositories: ConfiguredRepo[]
  ): Promise<PullRequestResponseRaw> {
    const headersList = {
      Accept: "application/json",
      Authorization: `token ${this.token}`,
    };

    // Build each individual query for each repo and call the API
    const queries = repositories.map(async (repository) => {
      const { url } = repository;

      const parsed = url.split("/");
      const owner = parsed[3];
      const name = parsed[4];

      const query = `
        query {
          repository(owner: "${owner}", name: "${name}") {
            owner {
              login
            },
            name,
            url,
            pullRequests(states: OPEN, first: 30, orderBy: {
              field:CREATED_AT,
              direction:DESC
            }) {
              nodes {
                number,
                title,
                body,
                url,
                isDraft,
                author {
                  login
                },
                viewerLatestReview {
                  state,
                },
                checksUrl,
                commits(last: 1) {
                  nodes {
                    commit {
                      checkSuites(first: 50) {
                        nodes {
                          status,
                          conclusion
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      return fetch(`https://api.github.com/graphql`, {
        method: "POST",
        headers: headersList,
        body: JSON.stringify({ query }),
      });
    });

    // Await the responses in parallel
    const responses = await Promise.all(queries);
    const rawDataResponse = await Promise.all(
      responses.map(async (r) => r.json())
    );
    const rawData = rawDataResponse.map((r) => r.data);

    // Merge it all together
    const result: PullRequestResponseRaw = {};
    rawData.forEach((value) => {
      result[GitHubClient.randomAlphaString()] = value.repository;
    });
    console.log(result);

    return result;
  }

  private static parseRawData(
    rawData: PullRequestResponseRaw,
    repositories: ConfiguredRepo[]
  ): RepoData[] {
    const result: RepoData[] = [];
    Object.values(rawData).forEach((data) => {
      const configuredRepo = repositories.find((repo) => repo.url === data.url);
      const isJiraConfigured =
        configuredRepo?.jiraDomain !== undefined &&
        configuredRepo?.jiraTags !== undefined;

      result.push({
        name: data.name,
        owner: data.owner.login,
        url: data.url,
        isJiraConfigured,
        pullRequests: data.pullRequests.nodes.map((node) => {
          // Parse jira tickets if detected
          const ticketTags: ConfiguredRepo["jiraTags"] = [];
          configuredRepo?.jiraTags?.forEach((jiraTag) => {
            const regex = new RegExp(`${jiraTag}-\\d+`, "g");
            // const regex = new RegExp(jiraTag, "g"); // For testing
            const ticketsInTitle = node.title.match(regex);
            const ticketsInBody = node.body.match(regex);

            if (ticketsInTitle !== null) {
              ticketTags.push(...ticketsInTitle);
            }
            if (ticketsInBody !== null) {
              ticketTags.push(...ticketsInBody);
            }
          });
          let jiraUrl;
          if (
            configuredRepo?.jiraDomain !== undefined &&
            ticketTags.length > 0
          ) {
            jiraUrl = `${configuredRepo.jiraDomain}/browse/${ticketTags[0]}`;
          }

          // Determine checks state and conclusion
          const checkSuites = node.commits.nodes[0].commit.checkSuites.nodes;
          const checksState = GitHubClient.getCheckState(checkSuites);

          return {
            checksState,
            number: node.number,
            checkSuite: node.commits.nodes[0].commit.checkSuites,
            title: node.title,
            jiraUrl,
            draft: node.isDraft,
            body: node.body,
            username: node.author.login,
            viewerLatestReview: node.viewerLatestReview?.state ?? null,
            url: node.url,
            checksUrl: node.checksUrl,
          };
        }),
      });
    });

    return result;
  }

  async getRepoData(repositories: ConfiguredRepo[]): Promise<RepoData[]> {
    const rawData = await this.getRawRepoData(repositories);
    const repoData = GitHubClient.parseRawData(rawData, repositories);
    return repoData;
  }
}
