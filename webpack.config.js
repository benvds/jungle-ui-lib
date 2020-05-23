const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var DeclarationBundlerPlugin = require("declaration-bundler-webpack-plugin");

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
      new CleanWebpackPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new DeclarationBundlerPlugin({
        moduleName: "jungleUiLib",
        out: "./index.d.ts"
      })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        } /*,
        {
          enforce: "pre",
          test: /\.jsx?$/,
          loader: "source-map-loader"
        }*/
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
