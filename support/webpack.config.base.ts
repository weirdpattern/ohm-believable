import { join, relative } from "path";
import { optimize, Configuration } from "webpack";

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

export default {
  output: {
    path: resource("build"),
    devtoolModuleFilenameTemplate: info =>
      relative(resource("src"), info.absoluteResourcePath).replace(/\\/g, "/")
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.html?$/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    modules: ["node_modules", resource("src")]
  }
} as Configuration;
