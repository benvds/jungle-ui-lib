const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TypingsBundlerPlugin = require("typings-bundler-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");

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
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "jungle-ui-lib.js",
      library: "jungleUiLib",
      libraryTarget: "umd"
    },
    plugins: [
      // Does not work
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
        // cleanAfterEveryBuildPatterns: ["!*.png", "!*.svg"]
      }),
      new CheckerPlugin(),
      // new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      // new TypingsBundlerPlugin({
      //   out: "index.d.ts"
      // }),
      new ExtractCssChunks()
    ],
    module: {
      rules: [
        {
          test: /\.(png|svg)$/,
          use: ["file-loader"]
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                esModule: true,
                hmr: isEnvDevelopment
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.js$/,
          use: ["babel-loader", "source-map-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "awesome-typescript-loader"]
        }
      ]
    },
    externals: {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    }
  };
};
