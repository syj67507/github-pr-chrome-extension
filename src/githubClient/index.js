const regeneratorRuntime = require("regenerator-runtime");

/**
 * A client to provide a variety of functions that communicate with
 * GitHub's REST API. Creating a new client reads the authentication token
 * from configuration.
 */
class GitHubClient {
  constructor(token) {
    this.token = token;
  }

  /**
   * Attempts to fetch pull requests for a given repo. A failed called
   * will log the error and return an empty array.
   * @param {object} repo An object with `user`, `name`, and `url` property associated with the repo
   * @returns An array of pull request data
   * 
   * @example
   * [
   *   {
   *      number: 1,
   *      title: "The Title",
   *      url: "https://...",
   *      repo: {
   *        name: "Repo Name",
   *        user: "username123",
   *        url: "https://....",
   *        jiraTag: "TAG",
   *      }
   *   }
   * ]
   */
  async fetchPullRequests(repo) {
    const headersList = {
      Accept: "application/json",
      Authorization: `token ${this.token}`,
    };

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.user}/${repo.name}/pulls`,
        {
          method: "GET",
          headers: headersList,
        }
      );
  
      const data = await response.json();
  
      return data.map((pullRequest) => {
        return {
          repo: repo,
          title: pullRequest.title,
          number: pullRequest.number,
          url: pullRequest.patch_url.replace(".patch", ""),
        };
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Fetches pull request data for the provided repository
   * @param {object} repo The repository's metadata 
   * @returns An array of pull request metadata for the provided repository
   */
  async _getPullRequests(repo) {

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
  
      return data.map((pullRequest) => {
        return {
          title: pullRequest.title,
          body: pullRequest.body,
          number: pullRequest.number,
          url: pullRequest.url,
        };
      });
    } catch (error) {
      console.log("e", error);
      return [];
    }
  }

  /**
   * Fetch all relevant repo and pull request data to display from the repository url.
   * If JIRA information was specified, this function will provide a URL to the JIRA ticket on success.
   * @param repoUrl - The url to the repository's main page (ex: https://github.com/syj67507/discord-bot)
   * @returns Repository information and it's pull request data
   */
  async _getRepoData(repoUrl) {
    const parsed = repoUrl.split("/");
    const owner = parsed[3]
    const name = parsed[4]
    const pullRequests = await this._getPullRequests({
      owner,
      name,
    })

    return {
      owner,
      name,
      url: repoUrl,
      pullRequests,
    }
  }

}

module.exports = GitHubClient;
