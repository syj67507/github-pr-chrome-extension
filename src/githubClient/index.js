const regeneratorRuntime = require("regenerator-runtime");
const { GH_TOKEN } = require("../config");

/**
 * A client to provide a variety of functions that communicate with
 * GitHub's REST API. Creating a new client reads the authentication token
 * from configuration.
 */
class GitHubClient {
  constructor() {
    this.token = GH_TOKEN;
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
}

module.exports = GitHubClient;
