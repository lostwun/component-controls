/** @jsx jsx */
import React, { FC, useState } from 'react';
import { jsx, Container } from 'theme-ui';
import { Global } from '@emotion/core';
import {
  ThemeProvider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from '@component-controls/components';
import {
  SidebarContextProvider,
  SidebarContext,
  Resizer,
} from '@component-controls/app-components';
import { PageContainer } from '@component-controls/blocks';
import { Store } from '@component-controls/store';
import { SEO } from './SEO';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PagesConfig } from './types';

interface LayoutProps {
  title?: string;
  storyStore: Store;
  storyId: string;
  pages: PagesConfig;
}

export const Layout: FC<LayoutProps> = ({
  pages: pagesFn,
  title,
  storyStore,
  storyId,
}) => {
  const pages = pagesFn('');
  return (
    <ThemeProvider>
      <Global
        styles={() => ({
          a: {
            transition: `all 0.3s ease-in-out`,
          },
        })}
      />
      <SEO title={title} />
      <SidebarContextProvider>
        <SidebarContext.Consumer>
          {({ collapsed }) => {
            const content = (
              <Container>
                <Tabs>
                  <Header title={title}>
                    {pages.length > 1 && (
                      <TabList>
                        {pages.map(page => (
                          <Tab key={`tab_${page.key}`}>{page.title}</Tab>
                        ))}
                      </TabList>
                    )}
                  </Header>

                  <PageContainer store={storyStore} storyId={storyId}>
                    {pages.map(page => (
                      <TabPanel key={`panel_${page.key}`}>
                        {page.render()}
                      </TabPanel>
                    ))}
                  </PageContainer>
                </Tabs>
              </Container>
            );
            return collapsed ? (
              content
            ) : (
              <Resizer
                sectionOneProps={{
                  defaultSize: 300,
                }}
              >
                <Sidebar storyId={storyId} />
                {content}
              </Resizer>
            );
          }}
        </SidebarContext.Consumer>
      </SidebarContextProvider>
    </ThemeProvider>
  );
};
