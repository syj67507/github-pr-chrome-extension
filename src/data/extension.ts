/**
 * This file is responsible for any miscellaneous functions related to interacting with
 * the extension's APIs that are not defined in the other files.
 * With the use of the webextension-polyfill package, most functionality defined
 * here will work across both Chrome and Firefox.
 */

import Browser from "webextension-polyfill";
import { type ConfiguredRepo } from "./repositories";

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
