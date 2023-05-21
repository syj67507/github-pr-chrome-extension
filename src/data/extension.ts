/**
 * This file is responsible for any functions related to interacting with
 * the extension's storage, interface, action, etc.
 * With the use of the webextension-polyfill package, most functionality defined
 * here will work across both Chrome and Firefox.
 */

import Browser from "webextension-polyfill";

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
export async function getStorage() {
  const storage = await Browser.storage.sync.get([storageKey]);
  return storage[storageKey];
}

/**
 * Clears the storage values for this extension
 */
export async function clearStorage() {
  await Browser.storage.sync.set({ [storageKey]: {} });
  console.log("ghpr-ext cleared.");
}

/**
 * Updates the storage values for this extension
 * @param {object} value The new update storage object
 */
export async function setStorage(value: any) {
  await Browser.storage.sync.set({ [storageKey]: value });
}

/**
 * Adds a repository's url to chrome storage. If the repository is already added,
 * then this function will do nothing.
 */
export async function addRepository(repoUrl: any, jiraTags: any, jiraDomain: any) {
  const repoToAdd = {
    url: repoUrl,
    jiraTags: undefined,
    jiraDomain: undefined
  };

  if (jiraTags && jiraDomain) {
    repoToAdd.jiraTags = jiraTags;
    repoToAdd.jiraDomain = jiraDomain;
  }

  const storage = await getStorage();
  if (storage.repos === undefined || !Array.isArray(storage.repos)) {
    storage.repos = [];
  }

  // Do nothing if already added
  if (storage.repos.find((repo: { url: any; }) => repo.url === repoUrl)) {
    return;
  }

  storage.repos.push(repoToAdd);
  await setStorage(storage);
}

/**
 * Removes a repository's url from chrome storage
 */
export async function removeRepository(repoUrl: any) {
  const storage = await getStorage();
  if (storage.repos && Array.isArray(storage.repos)) {
    storage.repos = storage.repos.filter((repo: { url: any; }) => repo.url !== repoUrl);
  }
  setStorage(storage);
}

export async function getRepositories() {
  const storage = await getStorage();
  return storage.repos;
}

/**
 * Sets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @param {string} token The personal access token
 */
export async function setToken(token: string) {
  const storage = await getStorage();
  storage.token = token;
  await setStorage(storage);
}

/**
 * Gets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @returns {string} token The personal access token
 */
export async function getToken() {
  const storage = await getStorage();
  return storage.token;
}

/**
 * Set's the badge contents of the browser action (the extension icon)
 *
 * NOTE: Chrome does not support browserAction APIs in Manifest Version 3. To solve this, the 'browserAction' API is
 * checked first. If this is defined, then it will be used. If undefined, then it will fall back to the 'action' API
 * @param {string} text The contents of the badge, will be converted into a string
 */
export function setBadge(text: number) {
  const browserAction = Browser.browserAction || Browser.action;
  browserAction.setBadgeText({
    text: `${text}`,
  });
  browserAction.setBadgeBackgroundColor({
    color: "black",
  });
}

/**
 * Creates a new tab and navigates to the provided URL
 * @param {string} url The URL to navigate to in the new tab
 */
export function createTab(url: string) {
  Browser.tabs.create({
    url: `${url}`,
  });
}
