import React, { useContext } from 'react';
import { deepMerge } from '@component-controls/core';
import { StoryStore } from '@component-controls/store';
import { RecoilRoot } from 'recoil';
import { BlockDataContextProvider } from './BlockDataContext';
import { ErrorBoundary } from './ErrorBoundary';

export interface BlockContextInputProps {
  /**
   * current story id
   */
  storyId?: string;
  /**
   * current documentation page, if no story is selected
   */
  docId?: string;

  /**
   * store object
   */
  store: StoryStore;

  /**
   * global options passed from container
   * those are global parameters as well as decorators
   */
  options?: any;
}

export interface BlockContextProps {
  /**
   * current story
   */
  storyId?: string;
  /**
   * current documentation page, if no story is selected
   */
  docId?: string;

  /**
   * store interface
   */
  storeProvider: StoryStore;
  /**
   * global options passed from container
   * those are global parameters as well as decorators
   */
  options?: any;
}

export const StoreContext = React.createContext<{ storeProvider: StoryStore }>(
  //@ts-ignore
  {},
);
//@ts-ignore
export const BlockContext = React.createContext<BlockContextProps>({});

export const BlockContextProvider: React.FC<BlockContextInputProps> = ({
  children,
  storyId: propsStoryId,
  docId: propsDocId,
  store,
  options,
}) => {
  let storyId = propsStoryId;
  const docId = storyId || propsDocId;
  if (!storyId && docId) {
    const doc = store.getStoryDoc(docId);
    storyId =
      doc && doc.stories && doc.stories.length ? doc.stories[0] : undefined;
  }
  store.visitPage();
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <StoreContext.Provider
          value={{
            storeProvider: store,
          }}
        >
          <BlockContext.Provider
            value={{
              storyId,
              docId: propsDocId,
              storeProvider: store,
              options: store.config
                ? deepMerge(options, store.config)
                : options,
            }}
          >
            <BlockDataContextProvider
              store={store}
              storyId={storyId}
              docId={propsDocId}
            >
              {children}
            </BlockDataContextProvider>
          </BlockContext.Provider>
        </StoreContext.Provider>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export const useBlockContext: () => BlockContextProps = () =>
  React.useContext(BlockContext);

export const useStore = () => {
  const { storeProvider } = useContext(StoreContext);
  return storeProvider;
};

export const useCustomProps = <T extends unknown>(
  name: string,
  props: T,
): T => {
  const { storeProvider } = useContext(StoreContext);
  const { config } = storeProvider;
  const userProps = config?.components?.[name];
  return userProps ? deepMerge(props, userProps) : props;
};
