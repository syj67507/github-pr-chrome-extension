import { type StorageRepo, type Storage } from "./extension";

require("regenerator-runtime");

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
  url: StorageRepo["url"];
  /** All the pull requests open for this repo */
  pullRequests: PullRequestData[];
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
  url: StorageRepo["url"];
  /** The login username of the author of the pull request */
  username: string;
  /** The url of the detected Jira ticket */
  jiraUrl?: string;
  /** Indicates if this pull request is in draft */
  draft: boolean;
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
  async getRepoData(reposData: StorageRepo[]): Promise<RepoData[]> {
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
          const ticketTags: StorageRepo["jiraTags"] = [];
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
}
