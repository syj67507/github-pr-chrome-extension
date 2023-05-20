const { merge } = require("webpack-merge");
const firefoxConfig = require("./webpack.firefox");

module.exports = merge(firefoxConfig, {
  mode: "development",
  devtool: "inline-source-map",
});
