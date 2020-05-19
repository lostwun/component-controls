import React from 'react';
import { ControlTypes } from '@component-controls/specification';
import { ColorControl } from './components/ColorControl';

export default {
  title: 'Controls/COLOR',
  component: ColorControl,
};

export const overview = ({ color }) => (
  <div style={{ width: 50, height: 50, backgroundColor: color }} />
);

overview.story = {
  description: 'A simple story that draws a colored rectangle box',
  controls: {
    color: {
      type: ControlTypes.COLOR,
      value: 'red',
      description: 'a color control',
    },
  },
};