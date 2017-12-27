import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

import { devServer } from "../package.json";
import config, { createEntry, resource } from "./webpack.config.base";

import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} from "webpack";

export default {
  ...config,
  entry: createEntry(
    "react-hot-loader/patch",
    `webpack-dev-server/client?${devServer.host}:${devServer.port}`,
    "webpack/hot/only-dev-server"
  ),
  output: {
    ...config.output,
    pathinfo: true,
    publicPath: "/",
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      publicUrl: "",
      template: resource("public", "index.html")
    }),
    new NamedModulesPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin()
  ]
};
