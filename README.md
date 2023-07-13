# GitHub Pull Request Chrome Extension

## About

A Google Chrome extension that displays open pull requests for your favorite repositories. Configure which repositories you would like to see in the options.

## Quick Start

This extension is not in Chrome's web store so installation must be done through Chrome's manual developer mode.

1. Download the [latest release][latest-release] archive (`github-pr-chrome-extension.zip` or `github-pr-chrome-extension.tgz`)
2. Unpack the archive
3. Go to `chrome://extensions` and enable `Developer Mode`
4. Click on `Load unpacked` and select the the extracted archive folder (`github-pr-chrome-extension`)
5. [Optional]: Disable `Developer Mode`

You have successfully installed the Chrome extension. You can configure the permissions and which repositories are connected by right clicking the extension icon and going to the options page.

## Development

Development and testing requires Node.js and NPM. This extension was developed using node `v18.13.0` and npm `v8.19.3`.

1. Install Node.js and NPM
2. Clone this repository
3. Run `npm install` and then `npm run build`. This will create a `dist` folder at the base of the project folder.
4. Go to `chrome://extensions` and enable `Developer Mode`
5. Click on `Load unpacked` and select the `dist` folder. You may turn off `Developer Mode` now if you wish.

[latest-release]: https://github.com/syj67507/github-pr-chrome-extension/releases/latest
