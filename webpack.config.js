const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = webpackEnv => {
  const isEnvProduction = webpackEnv === "production";
  const isEnvDevelopment = !isEnvProduction;
  const shouldUseSourceMap = true;

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    devServer: {
      contentBase: "./dist"
    },
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "jungle-ui-lib.js",
      library: "jungleUiLib",
      libraryTarget: "umd"
    },
    plugins: [new CleanWebpackPlugin()]
  };
};
