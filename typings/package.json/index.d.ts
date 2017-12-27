declare module '*/package.json' {
  export interface Person {
    name: string,
    email?: string,
    url?: string
  }

  export const name: string;
  export const version: string;
  export const description: string;
  export const keywords: Array<string>;
  export const homepage: string;
  export const bugs: { url: string, email: string };
  export const license: string;
  export const author: string | Person;
  export const contributors: Array<string> | Array<Person>;
  export const files: Array<string>;
  export const main: string;
  export const bin: { [key: string]: string };
  export const man: string | Array<string>;
  export const devServer: {
    host: string,
    port: string
  };
  export const channels: {
    win32: string,
    linux: string,
    darwin: string,
  };
  export const directories: {
    lib?: string,
    bin?: string,
    man?: string,
    doc?: string,
    example?: string,
    test?: string,
  };
  export const repository: { type: string, url: string };
  export const scripts: { [key: string]: string };
  export const config: { [key: string]: string };
  export const dependencies: { [key: string]: string };
  export const devDependencies: { [key: string]: string };
  export const peerDependencies: { [key: string]: string };
  export const bundledDependencies: Array<string>;
  export const optionalDependencies: { [key: string]: string };
  export const engines: { [key: string]: string };
  export const os: Array<string>;
  export const cpu: Array<string>;
  export const private: boolean;
  export const publishConfig: { [key: string]: string };
}
