import {
  getDocPath,
  getStoryPath,
  PageType,
  TabConfiguration,
} from '@component-controls/core';

import {
  compile,
  watch,
  CompileProps,
} from '@component-controls/webpack-compile';
import { CreatePagesArgs } from 'gatsby';
import { LoaderOptions } from './types';

const defaultPresets = ['react', 'react-docgen-typescript'];

exports.createPages = async (
  { actions }: CreatePagesArgs,
  options: LoaderOptions,
) => {
  const { createPage } = actions;
  const config: CompileProps = {
    webPack: options.webpack,
    presets: defaultPresets,
    configPath: options.configPath,
  };
  const { store } =
    process.env.NODE_ENV === 'development'
      ? await watch(config)
      : await compile(config);
  if (store) {
    const { pages, categories = [] } = store.buildConfig || {};
    if (pages) {
      Object.keys(pages).forEach(type => {
        if (!categories.includes(type as PageType)) {
          const page = pages[type as PageType];
          const pageType = type as PageType;
          const docs = store.getDocs(pageType);
          const tabs: Pick<TabConfiguration, 'route'>[] = page.tabs || [
            { route: undefined },
          ];
          tabs.forEach((tab, tabIndex) => {
            const route = tabIndex > 0 ? tab.route : undefined;
            docs.forEach(doc => {
              const stories =
                page.storyPaths && doc.stories?.length
                  ? doc.stories
                  : [undefined];
              stories.forEach((storyId?: string) => {
                const url = getStoryPath(
                  storyId,
                  doc,
                  store.buildConfig?.pages,
                  route,
                );
                createPage({
                  path: url,
                  component: require.resolve(`../src/templates/DocPage.tsx`),
                  context: {
                    type: pageType,
                    activeTab: route,
                    docId: doc.title,
                    storyId,
                  },
                });
              });
            });
          });
          if (docs.length) {
            const docsPage = docs.find(
              doc => doc?.route === `/${page.basePath}`,
            );
            createPage({
              path: `/${page.basePath}`,
              component: require.resolve(`../src/templates/DocHome.tsx`),
              context: {
                type: pageType,
                docId: docsPage?.title,
              },
            });
          }
        }
      });
      categories.forEach(catName => {
        const cats = store.getUniquesByField(catName);
        const catPage = pages[catName as PageType];
        const catKeys = Object.keys(cats);
        catKeys.forEach(tag => {
          createPage({
            path: getDocPath(
              catName as PageType,
              undefined,
              store.buildConfig?.pages,
              tag,
            ),
            component: require.resolve(`../src/templates/CategoryPage.tsx`),
            context: {
              type: catName as PageType,
              category: tag,
              docId: null,
            },
          });
        });
        if (catKeys.length) {
          createPage({
            path: `/${catPage.basePath}`,
            component: require.resolve(`../src/templates/CategoryList.tsx`),
            context: {
              type: catName,
              docId: null,
            },
          });
        }
      });
    }
    const homePage = store.stores.find(s => s.doc?.route === '/');
    createPage({
      path: `/`,
      component: require.resolve(`../src/templates/DocPage.tsx`),
      context: {
        docId: homePage?.doc?.title,
        type: homePage?.doc?.type,
      },
    });
  }
};
