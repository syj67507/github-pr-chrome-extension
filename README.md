# GitHub Pull Requests Browser Extension / Add on

## About

A browser extension / add on that displays open pull requests for your favorite repositories. Configure which repositories you would like to see in the options.

This extension is currently live and available in [Chrome's web store](https://chrome.google.com/webstore/detail/github-pull-requests/knfpkdjfepghlhlndeapopnijbapcjcg).

## Custom Developer Install

If you wish to install through developer mode, you may use one of the releases available in this repository.

1. Download the [latest release][latest-release] archive (`ghpr-ext-<browser>-<version>.zip` or `github-pr-<browser>-<version>.tgz`) based on your browser.
2. Unpack the archive
3. Load the extension / add on. For Firefox, you can follow [this page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing). For Chrome, you can follow [this page](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

## Development

Development and testing requires Node.js and NPM. This extension was developed using node `v18.13.0` and npm `v8.19.3`.

1. Install Node.js and NPM
2. Clone this repository
3. Run `npm install` and then `npm run build`. This will create a `dist` folder at the base of the project folder.
4. Load the extension / add on. For Firefox, you can follow [this page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing). For Chrome, you can follow [this page](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

[latest-release]: https://github.com/syj67507/github-pr-chrome-extension/releases/latest
