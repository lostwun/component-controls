/** @jsx jsx */
import { FC } from 'react';
import { jsx } from 'theme-ui';
import { Store } from '@component-controls/core';
import {
  SidebarContextProvider,
  LinkContextProvider,
  LinkContextProviderProps,
} from '@component-controls/components';
import { BlockContextProvider } from '@component-controls/blocks';
import { App } from '../App';
import { mdxComponents } from './mdxComponents';

export interface AppContextProps {
  docId?: string;
  storyId?: string;
  store: Store;
  linkClass: LinkContextProviderProps['linkClass'];
  activeTab?: string;
}

export const AppContext: FC<AppContextProps> = ({
  docId,
  storyId,
  children,
  store,
  linkClass,
  activeTab,
}) => {
  return (
    <BlockContextProvider
      storyId={storyId}
      docId={docId}
      store={store}
      activeTab={activeTab}
      components={mdxComponents}
    >
      <SidebarContextProvider>
        <LinkContextProvider linkClass={linkClass}>
          <App title={docId}>{children}</App>
        </LinkContextProvider>
      </SidebarContextProvider>
    </BlockContextProvider>
  );
};
