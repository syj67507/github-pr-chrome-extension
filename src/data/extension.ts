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

/**
 * The data that represents a configured repo by the user that
 * is stored in the browser's synced storage
 */
export interface StorageRepo {
  /** The url to the repository */
  url: string;
  /** The domain of the Jira project ex: https://company.jira.com/ */
  jiraDomain?: string;
  /** A list of Jira project tags to be configured for a repository */
  jiraTags?: string[];
}

/**
 * The data that represents what is stored for this extension in
 * the browser's synced storage
 */
export interface Storage {
  /** A list of user configured repos */
  repos: StorageRepo[];
  /** The GitHub personal access token */
  token: string;
}

/**
 * Gets the storage values for this extension
 * @returns All stored values for this extension
 */
export async function getStorage(): Promise<Storage> {
  const storage = await Browser.storage.local.get([storageKey]);
  return storage[storageKey];
}

/**
 * Clears the storage values for this extension
 */
export async function clearStorage(): Promise<void> {
  await Browser.storage.local.set({ [storageKey]: {} });
  console.log("ghpr-ext cleared.");
}

/**
 * Updates the storage values for this extension
 * @param value The new updated storage object
 */
export async function setStorage(value: Storage): Promise<void> {
  await Browser.storage.local.set({ [storageKey]: value });
}

/**
 * Adds a repository's url to chrome storage. If the repository is already added,
 * then this function will do nothing.
 * @param repoUrl The url of the repository
 * @param jiraTags A list of Jira project tags to be configured for a repository
 * @param jiraDomain The domain of the Jira project ex: https://company.jira.com/
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
 * @param repoUrl The url of the repository
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

/**
 * Get all the repositories that have been configured
 * @returns Returns all the repositories that have been configured
 */
export async function getRepositories(): Promise<StorageRepo[]> {
  const storage = await getStorage();
  return storage.repos;
}

/**
 * Sets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @param token The GitHub personal access token
 */
export async function setToken(token: string): Promise<void> {
  const storage = await getStorage();
  storage.token = token;
  await setStorage(storage);
}

/**
 * Gets the user's personal access token. Needed for authenticating
 * GitHub API requests.
 * @returns The GitHub personal access token
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
