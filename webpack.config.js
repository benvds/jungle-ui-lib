const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "jungle-ui-lib.js",
    library: "jungleUiLib",
    libraryTarget: "umd",
  },
  plugins: [new CleanWebpackPlugin()],
};
