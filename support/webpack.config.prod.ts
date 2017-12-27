import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ManifestPlugin from "webpack-manifest-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

import { homepage } from "../package.json";
import { DefinePlugin, optimize } from "webpack";
import config, { createEntry, resource } from "./webpack.config.base";

const publicPath: string = homepage || process.env.PUBLIC_PATH;

export default {
  ...config,
  bail: true,
  entry: createEntry(),
  output: {
    ...config.output,
    publicPath,
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      publicUrl: publicPath.slice(0, -1),
      template: resource("public", "index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        comparisons: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    })
  ]
};
