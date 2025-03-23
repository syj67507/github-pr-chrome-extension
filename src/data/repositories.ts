import { getStorage, setStorage } from "./storage";

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
