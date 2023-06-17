const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/popup.jsx",
    background: "./src/background/background.ts",
  },
  output: {
    path: path.resolve(__dirname, "..", "..", "dist", "firefox"),
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
      // Compiles all TypeScript code
      {
        rules: [
          {
            test: /\.(ts|tsx)?$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      // Allows for use of SVGs as React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup/popup.html",
      chunks: ["popup"],
      filename: "popup.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.firefox.json", to: "./manifest.json" },
        { from: "public/icon512.png", to: "./" },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
