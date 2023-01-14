/* global chrome */
/**
 * This file is responsible for any functions related to reading and
 * writing data to Chrome's storage system.
 */

/**
 * The storage key for this extension.
 * All stored values will be stored in chrome's sync storage using
 * this key.
 */
const storageKey = "ghpr-ext";

/**
 * Gets the storage values for this extension
 * @returns the storage object
 */
async function getStorage() {
  const storage = await chrome.storage.sync.get([storageKey]);
  return storage[storageKey];
}

/**
 * Clears the storage values for this extension
 */
async function clearStorage() {
  await chrome.storage.sync.set({ [storageKey]: {} });
  console.log("ghpr-ext cleared.");
}

/**
 * Updates the storage values for this extension
 * @param {object} value The new update storage object
 */
async function setStorage(value) {
  await chrome.storage.sync.set({ [storageKey]: value });
}

/**
 * Adds a repository's url to chrome storage. If the repository is already added,
 * then this function will do nothing.
 */
async function addRepository(repoUrl, jiraTag, jiraDomain) {
  const repoToAdd = {
    url: repoUrl,
  };

  if (jiraTag && jiraDomain) {
    repoToAdd.jiraTag = jiraTag;
    repoToAdd.jiraDomain = jiraDomain;
  }

  const storage = await getStorage();
  if (storage.repos === undefined || !Array.isArray(storage.repos)) {
    storage.repos = [];
  }

  // Do nothing if already added
  if (storage.repos.find((repo) => repo.url === repoUrl)) {
    return;
  }

  storage.repos.push(repoToAdd);
  await setStorage(storage);
}

/**
 * Removes a repository's url from chrome storage
 */
async function removeRepository(repoUrl) {
  const storage = await getStorage();
  if (storage.repos && Array.isArray(storage.repos)) {
    storage.repos = storage.repos.filter((repo) => repo.url !== repoUrl);
  }
  setStorage(storage);
}

async function getRepositories() {
  const storage = await getStorage();
  return storage.repos;
}

/**
 * Sets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @param {string} token The personal access token
 */
async function setToken(token) {
  const storage = await getStorage();
  storage.token = token;
  await setStorage(storage);
}

/**
 * Gets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @returns {string} token The personal access token
 */
async function getToken() {
  const storage = await getStorage();
  return storage.token;
}

/**
 * Set's the badge contents of the browser action (the extension icon)
 * @param {string} text The contents of the badge, will be converted into a string
 */
function setBadge(text) {
  chrome.action.setBadgeText({
    text: `${text}`,
  });
  chrome.action.setBadgeBackgroundColor({
    color: "black",
  });
}

/**
 * Creates a new tab and navigates to the provided URL
 * @param {string} url The URL to navigate to in the new tab
 */
function createTab(url) {
  chrome.tabs.create({
    url: `${url}`,
  });
}

module.exports = {
  getStorage,
  setStorage,
  clearStorage,
  getRepositories,
  addRepository,
  removeRepository,
  getToken,
  setToken,
  setBadge,
  createTab,
};
