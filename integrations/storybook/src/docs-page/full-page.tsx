/* eslint-disable react/display-name */
import React from 'react';
import { ClassicPage } from '@component-controls/pages';
import { DocsContainer } from './DocsContainer';

module.exports = {
  key: 'page',
  title: 'Page',
  render: ({ active }: { active: boolean }) => {
    return (
      <DocsContainer active={active}>
        <ClassicPage />
      </DocsContainer>
    );
  },
};
