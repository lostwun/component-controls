import { ParserOptions } from '@babel/parser';
import { SyncOpts as ResolveOptions } from 'resolve';
import {
  Options,
  ResolveConfigOptions as ResolvePrettierConfigOptions,
} from 'prettier';
import { ComponentInfo } from '@component-controls/specification';

type PrettierOptions = Options & {
  resolveConfigOptions?: ResolvePrettierConfigOptions;
};
export { ParserOptions, ResolveOptions, PrettierOptions };

export const defaultResolveOptions: ResolveOptions = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.mjs', '.es', '.es6'],
};

export const defaultParserOptions: ParserOptions = {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
};

export const defaultMDXOptions: MDXOptions = {
  test: /\.mdx$/,
};

/**
 * callback function to extract props info table  - ie docgen type libraries
 * used to extract displayName, and props tables for a component
 */
export type PropsInfoExtractorFunction = (
  /**
   * full name and path of the component path
   * react-docgen needs it to extract babel configurations
   */
  fileName: string,
  /**
   * optional component name
   * react-docgen-typescript supports multiple exports for a file
   * react-docgne does not use it
   */
  componentName?: string,
  /**
   * optional soure, saves time if its already loaded
   * react-docgen accepts source as input parameter
   * react-docgen-typescript does not use it
   */
  source?: string,
) => Promise<ComponentInfo | undefined>;

/**
 * settings to load component props tables
 * each component file extension must resolve to only 1 props info loader
 */
export interface PropsLoaderConfig {
  /**
   * module name - must be usable by require(....)
   * if a local file name, use require.esolve('../..')
   */
  name: string;

  /**
   * a regex or a list of regex masks
   * ex: test: /\.(js|jsx)$/
   */
  test: RegExp | RegExp[];
  /**
   * a regex or a list of regex masks for files to be excluded
   */
  exclude?: RegExp | RegExp[];
  /**
   * options specific to the props info loader module
   */
  options?: any;
}

export const defaultPackageOptions: PackageInfoOptions = {
  maxLevels: 10,
  packageJsonName: 'package.json',
  storeBrowseLink: true,
  storeDocsLink: true,
  storeIssuesLink: true,
};

export const defaultComponentOptions: ComponentOptions = {
  storeSourceFile: true,
  package: defaultPackageOptions,
};

export const defaultStoriesOptions: StoriesOptions = {
  storeSourceFile: true,
  package: defaultPackageOptions,
};

/**
 * options for finding and extracting package.json informtation
 * applies both for components and stories
 */
export interface PackageInfoOptions {
  /**
   * max levels of folders to look up to find the package.json file
   */
  maxLevels?: number;
  /**
   * package.json alternative name
   */
  packageJsonName?: string;

  /**
   * Whether to save the link for browsing the file in the repository field
   */
  storeBrowseLink?: boolean;

  /**
   * Whether to save the link for project readme file in the repository field
   */
  storeDocsLink?: boolean;

  /**
   * Whether to save the link for filing issues with the project in the repository field
   */

  storeIssuesLink?: boolean;
}

export interface ComponentOptions {
  /**
   * Callback function to resolve the source file name of a component.
   * Return false if this file should not be processed.
   */
  resolveFile?: (componentName: string, filePath: string) => string | undefined;

  /**
   * If set to false, will not save the component's source file
   */
  storeSourceFile?: boolean;

  /**
   * options for extracting repository information from the component's package,json file
   */
  package?: PackageInfoOptions | false;
}

export interface StoriesOptions {
  /**
   * If set to false, will not save the stories's source file, only the source of each individual story
   */
  storeSourceFile?: boolean;

  /**
   * options for extracting repository information from the component's package,json file
   */
  package?: PackageInfoOptions | false;
}

/**
 * mdx-js options
 */
export interface MDXOptions {
  /**
   * regular expression for files to pass through the MDX parser
   * by default /\.mdx$/
   */
  test?: RegExp;
  /**
   * enable footnotes
   */

  footnotes?: boolean;
  /**
   * specify remark plugins
   */
  mdPlugins?: any[];
  /**
   * specify rehype plugins
   */
  hastPlugins?: any[];
  /**
   * specify markdown compilers
   */
  compilers?: any[];

  /**
   * regex for blocks, defaults to ['[a-z\\.]+(\\.){0,1}[a-z\\.]']
   */
  blocks?: string[];
}

/**
 * Options passed for instrumenting
 */
export interface InstrumentOptions {
  /**
   * Options to control babel parser.
   */
  parser?: ParserOptions;
  /**
   * prettier options are used to prettify the code at the end of the process
   * this is useful for "story" code, where the story is extracted from the full file
   * fassing a value of false as prettier option will disabled prettifying
   */
  prettier?: PrettierOptions | false;

  /**
   * Options to control the `resolve` import resolving utilities.
   */
  resolver?: ResolveOptions;

  /**
   * Options for extracting components information.
   */
  components?: ComponentOptions;

  /**
   * Options for extracting stories information.
   */
  stories?: StoriesOptions;

  /**
   * props tables loaders
   * must have a default export that returns a PropsInfoExtractorFunction
   */
  propsLoaders?: PropsLoaderConfig[];

  /**
   * mdx-js parsing options
   */
  mdx?: MDXOptions;
}
