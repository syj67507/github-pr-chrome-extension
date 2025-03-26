import { getStorage, setStorage } from "../storage";

/**
 * Gets the user's current configuration for if they want animated expansions or not
 * @returns true if the user has set this configuration to be on, or false otherwise
 */
export async function getAnimatedExpandSetting(): Promise<boolean> {
  const storage = await getStorage();
  // default to false if not previously saved
  if (storage.animatedExpandSetting === undefined) {
    storage.animatedExpandSetting = false;
  }
  return storage.animatedExpandSetting;
}

/**
 * Saves the value that the user wants to set the animated expansion setting to
 * @param animatedExpandSetting {boolean} - the value of the animated expansion setting
 */
export async function saveAnimatedExpandSetting(
  animatedExpandSetting: boolean
): Promise<void> {
  const storage = await getStorage();
  storage.animatedExpandSetting = animatedExpandSetting;
  await setStorage(storage);
}
