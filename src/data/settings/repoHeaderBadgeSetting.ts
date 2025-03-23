import { getStorage, setStorage } from "../storage";

/**
 * Gets the user's current configuration for if they want to see a badge indicating how
 * many pull requests are open for each repo
 * @returns true if the user has set this configuration to be on, or false otherwise
 */
export async function getRepoHeaderBadgeSetting(): Promise<boolean> {
  const storage = await getStorage();
  // default to false if not previously saved
  if (storage.repoHeaderBadgeSetting === undefined) {
    storage.repoHeaderBadgeSetting = false;
  }
  return storage.repoHeaderBadgeSetting;
}

/**
 * Saves the value that the user wants to set the repo header badge setting to
 * @param repoHeaderBadgeSetting {boolean} - the value of the repo header badge setting
 */
export async function saveRepoHeaderBadgeSetting(
  repoHeaderBadgeSetting: boolean
): Promise<void> {
  const storage = await getStorage();
  storage.repoHeaderBadgeSetting = repoHeaderBadgeSetting;
  await setStorage(storage);
}
