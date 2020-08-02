import React from 'react';
import { ThemeProvider, MockContext } from '@component-controls/blocks';
import { App } from './App';

export default {
  title: 'Application/App',
  component: App,
};

export const overview = () => (
  <ThemeProvider>
    <MockContext storyId="id-of-story">
      <App />
    </MockContext>
  </ThemeProvider>
);
