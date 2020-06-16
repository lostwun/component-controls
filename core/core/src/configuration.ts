import { Configuration as WebpackConfiguration } from 'webpack';
import { ComponentType } from 'react';
import { StoryRenderFn } from './utility';

export type PageType = 'story' | 'blog' | 'page' | 'tags' | 'author';

export interface PageConfiguration {
  /**
   * base url path for the page
   */
  basePath?: string;

  /**
   * label - used for menu labels
   */
  label?: string;

  /**
   * whether to take a fullpage theme option
   */
  fullPage?: boolean;

  /**
   * whether to add navigation sidebars to the page
   */
  sidebars?: boolean;

  /**
   * whether to add to the top navigation menu
   */
  topMenu?: boolean;
}

export type PagesConfiguration = Record<PageType, PageConfiguration>;

type WebpackConfigFn = (
  config: WebpackConfiguration,
  options?: any,
) => WebpackConfiguration;
type WebpackConfig = WebpackConfiguration | WebpackConfigFn;

/**
 * global configuration used at build time
 * stored in a file named main.js/main.ts
 */
export interface BuildConfiguration {
  /**
   * wild card search string for the stories
   * internally using `glob` for the search: https://www.npmjs.com/package/glob
   * example: "./stories/**/ /*.stories.(js|jsx|tsx|mdx)"
   */
  stories?: string[];
  /**
   * base url path for API documentation pages. Default is "docs/"
   */
  pages?: Record<PageType, Pick<PageConfiguration, 'basePath'>>;

  /**
   * page types that are considred as categories fields as well
   */
  categories?: PageType[];
  /**
   * custom webpack fonfigurations setup. One or the other will be used
   */
  webpack?: WebpackConfig;
  finalWebpack?: WebpackConfig;
}

/**
 * global configuration used at build time
 * stored in a file named main.js/main.ts
 */
export interface RunOnlyConfiguration {
  /**
   * story decorator functions - used to wrap stories
   * example: [story => <ThemeProvider>{story()}</ThemeProvider>]
   */
  decorators?: StoryRenderFn[];
  /**
   * standalone site title. Default is "Component controls"
   */
  siteTitle?: string;
  /**
   * site alt for images. Default is "Component controls - https://github.com/ccontrols/component-controls"
   */
  siteTitleAlt?: string;

  /**
   * Site headline. Default is "Component controls gatsby"
   */
  siteHeadline?: string;

  /**
   * Deployed site url. Default is "https://component-controls-gatsby.netlify.app"
   */
  siteUrl?: string;

  /**
   * site description. siteDescription: Default is "Component controls stories. Write your components documentation with MDX and JSX. Design, develop, test and review in a single site."
   */
  siteDescription?: string;

  /**
   * site language, Deault is "en"
   */
  siteLanguage?: string;

  /**
   * author: Default is "@component-controls"
   */
  author?: string;

  /**
   * link to site image
   */
  siteImage?: string;

  /**
   * page types configurations
   */
  pages?: PagesConfiguration;

  /**
   * theme-ui theme configuration
   */
  theme?: { [key: string]: any };

  /**
   * story sorting function
   */
  storySort?: (a: string, b: string) => number;

  /**
   * page container react component
   */
  container?: ComponentType;
}

export type RunConfiguration = RunOnlyConfiguration &
  Omit<BuildConfiguration, 'pages'>;

export const defaultRunConfig: RunConfiguration = {
  siteTitle: 'Component controls',
  siteTitleAlt:
    'Component controls - https://github.com/ccontrols/component-controls',
  siteHeadline: 'Component controls gatsby',
  siteUrl: 'https://component-controls-gatsby.netlify.app',
  siteDescription:
    'Component controls stories. Write your components documentation with MDX and JSX. Design, develop, test and review in a single site.',
  siteLanguage: 'en',
  author: '@component-controls',
  pages: {
    story: {
      label: 'Docs',
      sidebars: true,
      topMenu: true,
    },
    blog: {
      label: 'Blog',
      sidebars: false,
      topMenu: true,
    },
    author: {
      label: 'Authors',
    },
    page: {
      label: 'Page',
    },
    tags: {
      label: 'Tags',
    },
  },
};

export const defaultBuildConfig: BuildConfiguration = {
  categories: ['author', 'tags'],
  pages: {
    story: {
      basePath: 'docs/',
    },
    blog: {
      basePath: 'blogs/',
    },
    author: {
      basePath: 'authors/',
    },
    page: {
      basePath: 'pages/',
    },
    tags: {
      basePath: 'tags/',
    },
  },
};
