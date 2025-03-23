import { getStorage, setStorage } from "./storage";

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
