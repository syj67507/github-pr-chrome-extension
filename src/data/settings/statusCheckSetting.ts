import { getStorage, setStorage } from "../storage";

/**
 * Gets the user's current configuration for if they want to see status checks for each
 * pull request
 * @returns true if the user has set this configuration to be on, or false otherwise
 */
export async function getStatusChecksSetting(): Promise<boolean> {
  const storage = await getStorage();
  // default to false if not previously saved
  if (storage.statusChecksSetting === undefined) {
    storage.statusChecksSetting = false;
  }
  return storage.statusChecksSetting;
}

/**
 * Saves the value that the user wants to set the pull request check status setting to
 * @param statusChecksSetting {boolean} - the value of the animated expansion setting
 */
export async function saveStatusChecksSetting(
  statusChecksSetting: boolean
): Promise<void> {
  const storage = await getStorage();
  storage.statusChecksSetting = statusChecksSetting;
  await setStorage(storage);
}
