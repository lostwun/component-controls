import React from 'react';
import { Donut } from 'theme-ui';
import { BlockContainer, BlockContainerProps } from './BlockContainer';

export default {
  title: 'Components/BlockContainer',
  component: BlockContainer,
};

export const overview = ({ title }: BlockContainerProps) => {
  return (
    <BlockContainer title={title}>
      <Donut value={1 / 2} />
    </BlockContainer>
  );
};

overview.story = {
  controls: {
    title: { type: 'text', value: 'Block title' },
  },
};
