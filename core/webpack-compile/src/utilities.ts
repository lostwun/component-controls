import webpack, {
  Configuration,
  Compiler,
  Stats,
  HotModuleReplacementPlugin,
  BannerPlugin,
} from 'webpack';
import path from 'path';
import fs from 'fs';
const chalk = require('chalk');
import LoaderPlugin from '@component-controls/loader/plugin';
import {
  mergeWebpackConfig,
  deepMergeWebpackConfig,
  CompileProps,
  CompileResults,
  defBundleName,
} from '@component-controls/webpack-configs';
import { loadConfiguration } from '@component-controls/config';

import { ResolveExternals, ResolveExternalsConfig } from './resolve_externals';
import { defaultExternals } from './externals-config';

export type CompileRunProps = CompileProps & {
  /**
   * webpack mode
   */
  mode: Configuration['mode'];
};

const createConfig = (options: CompileRunProps): webpack.Configuration => {
  const {
    webPack,
    presets,
    configPath,
    mode,
    staticFolder: propStaticFolder,
    distFolder: propDistFolder,
    bundleName = defBundleName,
  } = options;
  const distFolder = propDistFolder || `${path.join(process.cwd(), 'public')}`;
  const staticFolder = propStaticFolder || path.join(distFolder, 'static');
  const plugins = [
    new LoaderPlugin({
      config: configPath,
      escapeOutput: mode === 'development',
    }),
    new BannerPlugin({
      raw: true,
      banner: '/* eslint-disable */',
    }),
    mode === 'development' && new HotModuleReplacementPlugin({}),
  ].filter(Boolean);
  const webpackConfig = mergeWebpackConfig(
    {
      mode,
      entry: {
        stories: require.resolve(
          '@component-controls/loader/story-store-data.js',
        ),
      },
      output: {
        path: distFolder,
        filename: bundleName,
        libraryTarget: 'umd',
        globalObject: 'this',
      },
      resolve: {
        alias: {},
      },
      externals: {},
      plugins,
      ...(webPack || {}),
    },
    presets,
    { staticFolder, distFolder },
  );

  //add all the aliases to avoid double loading of packages
  const alias = new ResolveExternals(webpackConfig as ResolveExternalsConfig);
  defaultExternals.forEach(a => alias.addAlias(a));

  const runConfig = loadConfiguration(process.cwd(), configPath);

  const userWebpackConfig =
    runConfig?.config &&
    (runConfig.config.webpack || runConfig.config.finalWebpack);

  if (!userWebpackConfig) {
    return webpackConfig;
  }
  return typeof userWebpackConfig === 'function'
    ? userWebpackConfig(webpackConfig, options)
    : deepMergeWebpackConfig(webpackConfig, userWebpackConfig);
};

export const runCompiler = (
  run: (
    compiler: Compiler,
    callback: (err: Error, stats: Stats) => void,
  ) => void,

  props: CompileRunProps,
): Promise<CompileResults> => {
  return new Promise(resolve => {
    const compiler = webpack(createConfig(props));
    run(compiler, (err, stats) => {
      const bundleName = path.join(
        stats.compilation.outputOptions.path,
        stats.compilation.outputOptions.filename,
      );
      const bailError = (error: string) => {
        fs.writeFileSync(
          bundleName,
          `
module.exports = ${JSON.stringify({
            stores: [],
            packages: [],
            components: [],
            error,
          })}

          `,
        );
        console.error(error);
        return resolve({ bundleName, stats }); //reject(error);
      };
      if (err) {
        return bailError(err.toString());
      }
      if (stats.hasErrors() || stats.hasWarnings()) {
        const error = stats.toString({
          errorDetails: true,
          warnings: true,
        });
        return bailError(error);
      }
      const { store } = require('@component-controls/loader/store');
      console.log(
        chalk.bgRgb(
          244,
          147,
          66,
        )(
          store
            ? `compiled ${store.stores.length} documents`
            : 'error creating bundle',
        ),
        bundleName,
      );
      resolve({ bundleName, stats });
    });
  });
};
