import { type StorageRepo, type Storage } from "./extension";

require("regenerator-runtime");

interface GitHubAPIPullRequest {
  title: string;
  body: string;
  number: number;
  html_url: string;
  user: { login: string };
}

interface ParsedPullRequests {
  title: string;
  body: string;
  number: number;
  url: StorageRepo["url"];
  user: string;
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
  }): Promise<ParsedPullRequests[]> {
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

      return data.map((pullRequest: GitHubAPIPullRequest) => {
        return {
          title: pullRequest.title,
          body: pullRequest.body !== null ? pullRequest.body : "",
          number: pullRequest.number,
          url: pullRequest.html_url,
          user: pullRequest.user.login,
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
  async getRepoData(reposData: StorageRepo[]): Promise<
    Array<{
      owner: string;
      name: string;
      url: StorageRepo["url"];
      pullRequests: ParsedPullRequests[];
    }>
  > {
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
}
