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
   * Fetches pull request data for the provided repository
   * @param {object} repo The repository's metadata 
   * @returns An array of pull request metadata for the provided repository
   */
  async getPullRequests(repo) {

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
          body: pullRequest.body || "",
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
   * @param reposData - An array where each element is an object of repo data, containing the url, jiraTag, and jiraDomain
   * url - The url to the repository's main page (ex: https://github.com/syj67507/discord-bot)
   * jiraTag - The JIRA project tag
   * jiraDomain - The base domain for the JIRA project
   * @returns An array of repository information and it's pull request data
   */
  async getRepoData(reposData) { // { url, jiraTag, jiraDomain }) {
    if (Array.isArray(reposData) === false) {
      return [];
    }
    
    const result = [];
    for (const repoData of reposData) {
      const { url, jiraTag, jiraDomain } = repoData;

      const parsed = url.split("/");
      const owner = parsed[3]
      const name = parsed[4]
  
      let pullRequests = await this.getPullRequests({
        owner,
        name,
      })
      
      if (jiraDomain && jiraTag) {
        pullRequests.forEach((pr) => {
          const regex = new RegExp(jiraTag + "-\\d+", "g")
          // const regex = new RegExp(jiraTag, "g") // For testing
          const ticketTags = (pr.title.match(regex) || []).concat(pr.body.match(regex) || [])
  
          if (ticketTags.length > 0) {
            pr.jiraUrl = `${jiraDomain}/browse/${ticketTags[0]}`
          }
        })
      }
      
      result.push({
        owner,
        name,
        url,
        pullRequests,
      }); 
    }

    return result;
    
  }

}

module.exports = GitHubClient;
