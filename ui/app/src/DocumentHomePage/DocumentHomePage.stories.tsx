import React from 'react';
import { ThemeProvider, MockContext } from '@component-controls/blocks';
import { DocumentHomePage } from './DocumentHomePage';

export default {
  title: 'Application/DocumentHomePage',
  component: DocumentHomePage,
};

export const overview = () => (
  <ThemeProvider>
    <MockContext storyId="id-of-story">
      <DocumentHomePage type="blog" />
    </MockContext>
  </ThemeProvider>
);
