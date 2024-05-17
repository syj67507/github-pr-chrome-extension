import Browser from "webextension-polyfill";
import "regenerator-runtime";
import GitHubClient from "../data/index";
import {
  getToken,
  getRepositories,
  setBadge,
  getStorage,
  resetStorage,
} from "../data/extension";

const alarmName = "fetchPRs";
const delayInMinutes = 0;
const periodInMinutes = 15 / 60;

// Install logic
// eslint-disable-next-line @typescript-eslint/no-misused-promises
Browser.runtime.onInstalled.addListener(async () => {
  console.log("Installed!");

  console.log("Creating alarm...");
  Browser.alarms.create(alarmName, {
    delayInMinutes,
    periodInMinutes,
  });
  console.log("Created!", await Browser.alarms.get(alarmName));

  // Initializing storage
  // Checking if it exists to not override previous data
  if ((await getStorage()) === undefined) {
    console.log("No storage data detected, resetting storage...");
    await resetStorage();
  }
});

// Periodically fetch pull requests and update the badge
// eslint-disable-next-line @typescript-eslint/no-misused-promises
Browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== alarmName) {
    return;
  }
  try {
    const token = await getToken();
    if (token === undefined) {
      console.log(
        "Personal access token not set. User must go to options to set personal access token."
      );
      return;
    }

    const repositories = await getRepositories();
    const client = new GitHubClient(token);

    let count = 0;
    const reposData = await client.getRepoData(repositories);
    reposData.forEach((repoData) => {
      count += repoData.pullRequests.length;
    });
    await setBadge(count);
  } catch (e) {
    console.error(`There was an error in setting the badge`);
    console.error(e);
  }
});
