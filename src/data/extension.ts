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
 * is stored in the browser's synced storage. The stored data is not validated
 * against the GitHub API, but will be used to generate the calls to fetch pull request
 * data
 */
export interface ConfiguredRepo {
  /** The url to the repository */
  url: string;
  /** The domain of the Jira project ex: https://jira.company.com/ */
  jiraDomain?: string;
  /** A list of Jira project tags to be configured for a repository */
  jiraTags?: string[];
}

export type BlankSpaceBehavior = "expand" | "link";

/**
 * The data that represents what is stored for this extension in
 * the browser's synced storage
 */
export interface Storage {
  /** A list of user configured repos */
  repos: ConfiguredRepo[];
  /** The GitHub personal access token */
  token: string;
  /** The current state of the user configured filters */
  filters: Filters;
  /** User setting to open section or go to repo when clicking blank space on the repo header */
  blankSpaceBehavior?: BlankSpaceBehavior;
}

/**
 * Gets the storage values for this extension
 * @returns All stored values for this extension
 */
export async function getStorage(): Promise<Storage> {
  const storage = await Browser.storage.sync.get([storageKey]);
  return storage[storageKey];
}

/**
 * Clears the storage values for this extension
 */
export async function resetStorage(): Promise<void> {
  await Browser.storage.sync.set({ [storageKey]: {} });
  console.log("ghpr-ext storage reset.");
}

/**
 * Updates the storage values for this extension
 * @param value The new updated storage object
 */
export async function setStorage(value: Storage): Promise<void> {
  await Browser.storage.sync.set({ [storageKey]: value });
}

/**
 * Adds a repository's url to chrome storage. If the repository is already added,
 * then this function will do nothing.
 * @param repoUrl The url of the repository
 * @param jiraTags A list of Jira project tags to be configured for a repository
 * @param jiraDomain The domain of the Jira project ex: https://company.jira.com/
 */
export async function addRepository(
  repoUrl: ConfiguredRepo["url"],
  jiraTags: ConfiguredRepo["jiraTags"],
  jiraDomain: ConfiguredRepo["jiraDomain"]
): Promise<void> {
  const repoToAdd: ConfiguredRepo = {
    url: repoUrl,
    jiraTags,
    jiraDomain,
  };

  const storage = await getStorage();
  if (storage.repos === undefined || !Array.isArray(storage.repos)) {
    storage.repos = [];
  }

  // Check if the repo was already added
  // If found, grab the index to update it with the new values passed
  const repoAlreadyAddedIndex = storage.repos.findIndex(
    (repo) => repo.url === repoUrl
  );
  if (repoAlreadyAddedIndex > -1) {
    storage.repos[repoAlreadyAddedIndex] = repoToAdd;
  }
  // Otherwise add it to storage
  else {
    storage.repos.push(repoToAdd);
  }

  await setStorage(storage);
}

/**
 * Removes a repository's url from chrome storage
 * @param repoUrl The url of the repository
 */
export async function removeRepository(
  repoUrl: ConfiguredRepo["url"]
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
export async function getRepositories(): Promise<ConfiguredRepo[]> {
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
export async function createTab(url: ConfiguredRepo["url"]): Promise<void> {
  await Browser.tabs.create({
    url: `${url}`,
  });
}

export interface Filters {
  /** Determines whether to show the user's pull requests */
  showMine: boolean;
  /** Determines whether or not to include drafts in the display */
  includeDrafts: boolean;
  /** Text filter to look for pull requests that only have this text in it */
  textFilter: string;
}

/**
 * Saves the user's current state of the filtering options on the
 * PR display page.
 */
export async function saveFilterOptions(filters: Filters) {
  const storage = await getStorage();
  storage.filters = filters;
  await setStorage(storage);
}

/**
 * Returns the saved filter options that were previously set by the user
 * @returns The filter object
 */
export async function getFilterOptions() {
  const storage = await getStorage();
  return storage.filters;
}

/**
 * Returns whether or not the user wants to expand the repo section
 * or wants to open the repo in a new tab
 */
export async function getBlankSpaceBehavior(): Promise<BlankSpaceBehavior> {
  const storage = await getStorage();
  if (storage.blankSpaceBehavior === undefined) {
    storage.blankSpaceBehavior = "expand";
  }
  return storage.blankSpaceBehavior;
}

/**
 * Sets the configuration on whether or not the user wants to expand the repo section
 * or wants to open the repo in a new tab
 */
export async function setBlankSpaceBehavior(
  behavior: BlankSpaceBehavior
): Promise<void> {
  const storage = await getStorage();
  storage.blankSpaceBehavior = behavior;
}
