import React from 'react';
import { merge } from 'theme-ui';
import { ThemeProvider as ThemeUIProvider, Theme } from 'theme-ui';

import { markdownComponents, MarkdownComponentType } from '../Markdown';
import { theme as defaultTheme } from './theme';

export interface ThemeContextProps {
  theme?: Theme;
}
export const ThemeContext = React.createContext<ThemeContextProps>({});

export interface ThemeProviderProps {
  /**
   * components to customize the markdown display.
   */
  components?: MarkdownComponentType;
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: customTheme,
  children,
  components = {},
}) => {
  const theme = React.useMemo(() => {
    return customTheme ? merge(defaultTheme, customTheme) : defaultTheme;
  }, [customTheme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
      }}
    >
      <ThemeUIProvider
        theme={theme}
        //@ts-ignore
        components={{ ...markdownComponents, ...components }}
      >
        {children}
      </ThemeUIProvider>
    </ThemeContext.Provider>
  );
};
