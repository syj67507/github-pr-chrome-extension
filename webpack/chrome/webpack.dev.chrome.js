const { merge } = require("webpack-merge");
const chromeConfig = require("./webpack.chrome");

module.exports = merge(chromeConfig, {
  mode: "development",
  devtool: "inline-source-map",
});
