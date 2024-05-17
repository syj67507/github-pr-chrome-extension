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
  | null; // remove this later

/**
 * Test Raw
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
      }>;
    };
  }
>;

/**
 * The raw JSON response body when fetching a pull request from
 * GitHub's API
 */
interface PullRequestResponse {
  /** The title of the pull request */
  title: string;
  /** The description of the pull request */
  body: string;
  /** The issue number of the pull request */
  number: number;
  /** The url of the pull request */
  html_url: string;
  /** The user who is the author of the pull request */
  user: {
    /** The login username */
    login: string;
  };
  /** Indicates if this pull request is in draft */
  draft: boolean;
}

/**
 * The raw JSON response body when fetching the authenticated user from
 * GitHub's API
 */
interface AuthenticatedUserResponse {
  /** The login username */
  login: string;
}

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

  /**
   * Fetches pull request data for the provided repository
   * @param {object} repo The repository's metadata
   * @returns An array of pull request metadata for the provided repository
   */
  async getPullRequests(repo: {
    owner: string;
    name: string;
  }): Promise<PullRequestData[]> {
    const headersList = {
      Accept: "application/json",
      Authorization: `token ${this.token}`,
    };

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.owner}/${repo.name}/pulls`,
        {
          method: "GET",
          headers: headersList,
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }

      return data.map((pullRequest: PullRequestResponse) => {
        return {
          title: pullRequest.title,
          body: pullRequest.body !== null ? pullRequest.body : "",
          number: pullRequest.number,
          url: pullRequest.html_url,
          username: pullRequest.user.login,
          draft: pullRequest.draft,
        };
      });
    } catch (error) {
      console.error("e", error);
      return [];
    }
  }

  /**
   * Fetch all relevant repo and pull request data to display from the repository url.
   * If JIRA information was specified, this function will provide a URL to the JIRA ticket on success.
   * @param reposData - An array where each element is an object of repo data, containing the url, jiraTag, and jiraDomain
   * url - The url to the repository's main page (ex: https://github.com/syj67507/discord-bot)
   * jiraTags - An array of JIRA project tags
   * jiraDomain - The base domain for the JIRA project
   * @returns An array of repository information and it's pull request data
   */
  async getRepoData(reposData: ConfiguredRepo[]): Promise<RepoData[]> {
    if (!Array.isArray(reposData)) {
      return [];
    }

    // map repoData to each of its pull requests
    const reposDataWithPullRequests = reposData.map(async (repoData) => {
      const { url, jiraTags, jiraDomain } = repoData;

      const parsed = url.split("/");
      const owner = parsed[3];
      const name = parsed[4];

      let pullRequests = await this.getPullRequests({
        owner,
        name,
      });

      if (jiraDomain !== undefined && jiraTags !== undefined) {
        pullRequests = pullRequests.map((pr) => {
          // Find a JIRA ticket with provided
          const ticketTags: ConfiguredRepo["jiraTags"] = [];
          jiraTags.forEach((jiraTag) => {
            const regex = new RegExp(`${jiraTag}-\\d+`, "g");
            // const regex = new RegExp(jiraTag, "g"); // For testing

            const ticketsInTitle = pr.title.match(regex);
            const ticketsInBody = pr.body.match(regex);

            if (ticketsInTitle !== null) {
              ticketTags.push(...ticketsInTitle);
            }
            if (ticketsInBody !== null) {
              ticketTags.push(...ticketsInBody);
            }
          });
          return {
            ...pr,
            jiraUrl:
              ticketTags.length > 0
                ? `${jiraDomain}/browse/${ticketTags[0]}` // grabs the first ticket detected
                : undefined,
          };
        });
      }

      return {
        owner,
        name,
        url,
        pullRequests,
        isJiraConfigured: repoData.jiraDomain !== undefined,
      };
    });

    return Promise.all(reposDataWithPullRequests);
  }

  /**
   * Fetches the authenticated user's information from the configured
   * personal access token that is passed into this client upon calling the
   * constructor.
   * @return An object that holds various pieces of information about the current user
   */
  async getAuthenticatedUser(): Promise<AuthenticatedUserData> {
    try {
      const headersList = {
        Accept: "application/json",
        Authorization: `token ${this.token}`,
      };

      const response = await fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: headersList,
      });

      if (response.status !== 200) {
        throw new Error((await response.json()).message);
      }
      const data: AuthenticatedUserResponse = await response.json();

      return {
        username: data.login,
      };
    } catch (error) {
      console.error("e");
      return {
        username: "",
      };
    }
  }

  static randomAlphaString(): string {
    return Array(10)
      .fill(0)
      .map(() => String.fromCharCode(Math.random() * 26 + 97))
      .join("");
  }

  /**
   * Fetches the raw data for each repository that the user has configured
   * @param repositories
   */
  async test(repositories: ConfiguredRepo[]): Promise<PullRequestResponseRaw> {
    // Build each individual query for each repo
    const queries = repositories.map((repository) => {
      const { url, jiraTags, jiraDomain } = repository;

      const parsed = url.split("/");
      const owner = parsed[3];
      const name = parsed[4];

      const query = `
        ${GitHubClient.randomAlphaString()} :repository(owner: "${owner}", name: "${name}") {
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
              }
            }
          }
        },
      `;

      return query;
    });

    // Merge it into one
    const query = `
    {
      ${queries.join("\n")}
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

    return (await response.json()).data as PullRequestResponseRaw;
  }

  async transform(
    rawData: PullRequestResponseRaw,
    repositories: ConfiguredRepo[]
  ): Promise<RepoData[]> {
    // need to do logic here to parse the title body and branch for the jira ticket
    // just copy it from the existing thing

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
          const ticketTags: ConfiguredRepo["jiraTags"] = [];
          configuredRepo?.jiraTags?.forEach((jiraTag) => {
            // const regex = new RegExp(`${jiraTag}-\\d+`, "g");
            const regex = new RegExp(jiraTag, "g"); // For testing

            const ticketsInTitle = node.title.match(regex);
            const ticketsInBody = node.body.match(regex);

            if (ticketsInTitle !== null) {
              ticketTags.push(...ticketsInTitle);
            }
            if (ticketsInBody !== null) {
              ticketTags.push(...ticketsInBody);
            }
          });
          return {
            jiraUrl: ticketTags[0],
            draft: node.isDraft,
            number: node.number,
            title: node.title,
            body: node.body,
            username: node.author.login,
            viewerLatestReview: node.viewerLatestReview?.state ?? null,
            url: node.url,
          };
        }),
      });
    });
    console.log("new", result, repositories);
    return result;
  }

  async getRepoDataNew(repositories: ConfiguredRepo[]): Promise<RepoData[]> {
    const rawData = await this.test(repositories);
    const repoData = await this.transform(rawData, repositories);
    return repoData;
  }
}
