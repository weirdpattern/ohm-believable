import { join, relative } from "path";
import { optimize, Configuration, Rule } from "webpack";

import * as autoprefixer from "autoprefixer";
import * as flexbugs from "postcss-flexbugs-fixes";

/**
 * Gets the path to a resource based off of the root of the repository.
 * The function accepts a relative path or an array of section paths.
 * It is recommended to use section paths to avoid possible conflicts with path
 * separators in multiplatform environments.
 * @param {string[]} sections the set of section paths
 * @returns {string} the path to the resource.
 */
export function resource(...sections: string[]): string {
  return join(__dirname, "..", ...sections);
}

/**
 * Creates the entry section of the webpack configuration.
 * By default the method loads polyfills and the default index page,
 * extras are injected between these two.
 * @param {string[]} extras the extra entry points to be added.
 * @returns {string[]} the entry point of the webpack configuration.
 */
export function createEntry(...extras: string[]): string[] {
  return [
    resource("support", "polyfills"),
    ...extras,
    resource("src", "index.tsx")
  ];
}

const src: string = resource("src");

/**
 * Creates the rule section of the webpack configuration.
 * @param {Rule} typescriptRule the customized typescript rule.
 * @returns {Rule[]} a set of rules.
 */
export function createRules(typescriptRule: Rule): Rule[] {
  return [
    {
      test: /\.tsx?$/,
      loader: "eslint-loader",
      enforce: "pre",
      include: src
    },
    {
      test: /\.js$/,
      loader: "source-map-loader",
      enforce: "pre",
      include: src
    },
    {
      oneOf: [
        typescriptRule,
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "static/media/[name].[hash:8].[ext]"
          }
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  flexbugs,
                  autoprefixer({
                    browsers: [
                      ">1%",
                      "last 4 versions",
                      "Firefox ESR",
                      "not ie < 9"
                    ],
                    flexbox: "no-2009"
                  })
                ]
              }
            }
          ]
        },
        {
          test: /\.\w+$/,
          exclude: /\.(js|html|json)$/,
          loader: "file-loader",
          options: {
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    }
  ];
}

export default {
  output: {
    path: resource("build"),
    devtoolModuleFilenameTemplate: info =>
      relative(__dirname, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  module: {
    strictExportPresence: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: ["node_modules", src]
  }
} as Configuration;
