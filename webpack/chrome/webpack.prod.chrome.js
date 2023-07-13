const { merge } = require("webpack-merge");
const chromeConfig = require("./webpack.chrome");

module.exports = merge(chromeConfig, {
  mode: "production",
  optimization: {
    minimize: false,
  },
});
