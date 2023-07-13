const { merge } = require("webpack-merge");
const firefoxConfig = require("./webpack.firefox");

module.exports = merge(firefoxConfig, {
  mode: "production",
  optimization: {
    minimize: false,
  },
});
