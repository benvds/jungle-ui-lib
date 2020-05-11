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
    entry: "./src/index.ts",
    resolve: {
      extensions: [".js", ".ts"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "jungle-ui-lib.js",
      library: "jungleUiLib",
      libraryTarget: "umd"
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    }
  };
};
