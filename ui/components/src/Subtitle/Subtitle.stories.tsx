import React from 'react';
import { Subtitle, SubtitleProps } from './Subtitle';

export default {
  title: 'Components/Subtitle',
  component: Subtitle,
};

export const overview = ({ children }: SubtitleProps) => {
  return <Subtitle>{children}</Subtitle>;
};

overview.story = {
  subtitle: 'This is subtitle',
  controls: {
    children: { type: 'text', value: 'Subtitle text' },
  },
};
