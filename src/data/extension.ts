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
const storageKey = "@ghpr-ext";

export interface StorageRepo {
  url: string;
  jiraDomain?: string;
  jiraTags?: string[];
}

export interface Storage {
  repos: StorageRepo[];
  token: string;
}

/**
 * Gets the storage values for this extension
 * @returns the storage object
 */
export async function getStorage(): Promise<Storage> {
  const storage = await Browser.storage.sync.get([storageKey]);
  return storage[storageKey];
}

/**
 * Clears the storage values for this extension
 */
export async function clearStorage(): Promise<void> {
  await Browser.storage.sync.set({ [storageKey]: {} });
  console.log("ghpr-ext cleared.");
}

/**
 * Updates the storage values for this extension
 * @param {object} value The new update storage object
 */
export async function setStorage(value: any): Promise<void> {
  await Browser.storage.sync.set({ [storageKey]: value });
}

/**
 * Adds a repository's url to chrome storage. If the repository is already added,
 * then this function will do nothing.
 */
export async function addRepository(
  repoUrl: StorageRepo["url"],
  jiraTags: StorageRepo["jiraTags"],
  jiraDomain: StorageRepo["jiraDomain"]
): Promise<void> {
  const repoToAdd: StorageRepo = {
    url: repoUrl,
    jiraTags,
    jiraDomain,
  };

  const storage = await getStorage();
  if (storage.repos === undefined || !Array.isArray(storage.repos)) {
    storage.repos = [];
  }

  // Do nothing if already added
  if (
    storage.repos.find((repo: { url: any }) => repo.url === repoUrl) != null
  ) {
    return;
  }

  storage.repos.push(repoToAdd);
  await setStorage(storage);
}

/**
 * Removes a repository's url from chrome storage
 */
export async function removeRepository(
  repoUrl: StorageRepo["url"]
): Promise<void> {
  const storage = await getStorage();
  if (storage.repos !== undefined && Array.isArray(storage.repos)) {
    storage.repos = storage.repos.filter(
      (repo: { url: any }) => repo.url !== repoUrl
    );
  }
  await setStorage(storage);
}

export async function getRepositories(): Promise<StorageRepo[]> {
  const storage = await getStorage();
  return storage.repos;
}

/**
 * Sets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @param {string} token The personal access token
 */
export async function setToken(token: string): Promise<void> {
  const storage = await getStorage();
  storage.token = token;
  await setStorage(storage);
}

/**
 * Gets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @returns {string} token The personal access token
 */
export async function getToken(): Promise<Storage["token"]> {
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
export async function setBadge(text: number): Promise<void> {
  console.log(Browser.browserAction);
  const browserAction =
    Browser.browserAction !== undefined
      ? Browser.browserAction
      : Browser.action;
  await browserAction.setBadgeText({
    text: `${text}`,
  });
  await browserAction.setBadgeBackgroundColor({
    color: "black",
  });
}

/**
 * Creates a new tab and navigates to the provided URL
 * @param {string} url The URL to navigate to in the new tab
 */
export async function createTab(url: StorageRepo["url"]): Promise<void> {
  await Browser.tabs.create({
    url: `${url}`,
  });
}
