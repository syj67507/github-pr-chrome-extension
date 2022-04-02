# GitHub Pull Request Chrome Extension

## About

A Google Chrome extension that displays open pull requests for your favorite repositories. Configure which repositories you would like to see in the options.

## Installation

This extension is on Chrome's web store so usage will have to be done through manual developer mode.

1. Install Node.js and NPM

2. Clone this repository

3. Create a `config.js` file in the `src` folder that looks like the following

   ```js
   {
       GH_TOKEN: "<personal access token goes here>",
   }
   ```

4. Create a personal access token from the `Developer Settings` in your GitHub account and provide it the `repos` permissions. Fill in that token in the `config.js` and save.

5. Run `npm run build`. This will create a `dist` folder at the base of the project folder.

6. Go to `chrome://extensions` and enable `Developer Mode`

7. Click on `Load unpacked` and select the `dist` folder. You may turn off `Developer Mode` now if you wish.

You have successfully installed the Chrome extension. You can configure which repositories are connected by right clicking the extension icon and going to the options page.
