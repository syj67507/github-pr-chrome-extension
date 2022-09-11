/* global chrome */
const regeneratorRuntime = require("regenerator-runtime");
const GitHubClient = require("../data/index");
const { getToken, setToken, clearStorage, getRepositories, addRepository } = require("../data/chromeStorage");

const alarmName = "fetchPRs";
const delayInMinutes = 0;
const periodInMinutes = 1;

// Install logic
chrome.runtime.onInstalled.addListener(async () => {
  console.log("Installed!");

  console.log("Creating alarm...");
  chrome.alarms.create(alarmName, {
    delayInMinutes: delayInMinutes,
    periodInMinutes: periodInMinutes,
  });
  console.log("Created!", await chrome.alarms.get(alarmName));

  await clearStorage();
});

// Periodically fetch pull requests and update the badge
chrome.alarms.onAlarm.addListener(async (alarm) => {
  try {
    const token = await getToken();
    if (token === undefined) {
      console.log("Personal access token not set. User must go to options to set personal access token.");
      return;
    }
  
    const repositories = await getRepositories();
    const client = new GitHubClient(token);
  
    let count = 0;
    const reposData = await client.getRepoData(repositories);
    for (const repoData of reposData) {
      count += repoData.pullRequests.length;
    }
    chrome.action.setBadgeText({
      text: `${count}`,
    });
    chrome.action.setBadgeBackgroundColor({
      color: "red",
    });
  } catch (e) {
    console.error(`There was an error in setting the badge`);
    console.error(e);
  }
  
});
