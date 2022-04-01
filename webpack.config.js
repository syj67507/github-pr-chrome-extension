const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/popup.jsx",
    background: "./src/background/background.js",
    options: "./src/options/options.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      // Used to transpile all React code
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup/popup.html",
      chunks: ["popup"],
      filename: "popup.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/options/options.html",
      chunks: ["options"],
      filename: "options.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "./" }],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
