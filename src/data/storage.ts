import Browser from "webextension-polyfill";
import type { Filters } from "./filters";
import { type ConfiguredRepo } from "./repositories";

/**
 * The storage key for this extension.
 * All stored values will be stored in chrome's sync storage using
 * this key.
 */
const storageKey = "@ghpr-ext";

export type HeaderClickBehavior = "expand" | "link";

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
  headerClickBehavior?: HeaderClickBehavior;
  /** User setting to animate the expansion of a repo section or not */
  animatedExpandSetting?: boolean;
  /** User setting to enable the status checks for each pull request */
  statusChecksSetting?: boolean;
  /** User setting to enable a badge on the repo header for a repo section */
  repoHeaderBadgeSetting?: boolean;
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
