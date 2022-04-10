/* global chrome */
const regeneratorRuntime = require("regenerator-runtime");
const GitHubClient = require("../githubClient/index");

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
});

// Periodically fetch pull requests and update the badge
chrome.alarms.onAlarm.addListener(async (alarm) => {
  const storage = await chrome.storage.sync.get();

  const client = new GitHubClient(storage.token);

  try {
    console.log("Alarm activated!");

    // Get the name of the saved repos
    const storage = await chrome.storage.sync.get();
    const savedRepos = storage.savedRepos;

    let count = 0;
    for (const repo of savedRepos) {
      const pullRequests = await client.fetchPullRequests(repo);
      console.log(pullRequests);
      count += pullRequests.length;
    }
    chrome.action.setBadgeText({
      text: `${count}`,
    });
    chrome.action.setBadgeBackgroundColor({
      color: "red",
    });
  } catch (error) {
    console.log(error);
  }
});
