# GitHub Pull Request Chrome Extension

## About

A Google Chrome extension that displays open pull requests for your favorite repositories. Configure which repositories you would like to see in the options.

## Installation

This extension is not on Chrome's web store so usage will have to be done through manual developer mode.

1. Install Node.js and NPM (This was developed on node v18.13.0 and npm v8.19.3)

2. Clone this repository

3. Run `npm install` and then `npm run build`. This will create a `dist` folder at the base of the project folder.

4. Go to `chrome://extensions` and enable `Developer Mode`

5. Click on `Load unpacked` and select the `dist` folder. You may turn off `Developer Mode` now if you wish.

You have successfully installed the Chrome extension. You can configure the permissions and which repositories are connected by clicking on the extension's icon and navigating to the respective views.
