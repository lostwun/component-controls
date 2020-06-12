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
   * if true, will create a home page with a top-level menu
   * by default, only story and blogs have home pages
   */
  hasHomePage?: boolean;
}

export type PagesConfiguration = Record<PageType, PageConfiguration>;

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
}

/**
 * global configuration used at build time
 * stored in a file named main.js/main.ts
 */
export interface RunConfiguration {
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

  pages?: PagesConfiguration;

  blogsLabel?: string;
  /**
   * story sorting function
   */
  storySort?: (a: string, b: string) => number;
}

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
      hasHomePage: true,
    },
    blog: {
      label: 'Blog',
      hasHomePage: true,
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
