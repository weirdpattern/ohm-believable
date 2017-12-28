import { devServer } from "../package.json";

import config, {
  createEntry,
  createRules,
  resource
} from "./webpack.config.base";

import {
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin
} from "webpack";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

export default {
  ...config,
  devtool: "cheap-module-source-map",
  entry: createEntry(
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
    "webpack/hot/only-dev-server"
  ),
  output: {
    ...config.output,
    pathinfo: true,
    publicPath: "/",
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js"
  },
  devServer: {
    ...devServer,
    publicPath: "/",
    hot: true
  },
  module: {
    ...config.module,
    rules: createRules({
      test: /\.tsx?$/,
      include: resource("src"),
      loaders: ["react-hot-loader/webpack", "ts-loader"]
    })
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      publicUrl: "",
      template: resource("public", "index.html")
    }),
    new NamedModulesPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new CaseSensitivePathsPlugin()
  ]
} as Configuration;
