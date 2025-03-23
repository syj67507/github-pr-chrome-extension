import { type HeaderClickBehavior, getStorage, setStorage } from "../storage";

/**
 * Returns whether or not the user wants to expand the repo section
 * or wants to open the repo in a new tab
 * @returns "expand" or "link", defaults to expand if not previously saved
 */
export async function getHeaderClickBehavior(): Promise<HeaderClickBehavior> {
  const storage = await getStorage();
  if (storage.headerClickBehavior === undefined) {
    storage.headerClickBehavior = "expand";
  }
  return storage.headerClickBehavior;
}

/**
 * Sets the configuration on whether or not the user wants to expand the repo section
 * or wants to open the repo in a new tab
 */
export async function saveHeaderClickBehavior(
  behavior: HeaderClickBehavior
): Promise<void> {
  const storage = await getStorage();
  storage.headerClickBehavior = behavior;
  await setStorage(storage);
}
