import React from 'react';
import { ControlTypes } from '@component-controls/specification';
import { ControlsTable } from '@component-controls/storybook';

export default {
  title: 'Storybook/Kind',
  component: ControlsTable,
  parameters:{ 
    controls: {
      name: { type: ControlTypes.TEXT, label: 'Name', value: 'Mark', order: 9999 },
    },
  },  
};

interface DocsControlsTable {
  name: string;
  age: number;
}
export const docsControlsTable = ({ name, age }: DocsControlsTable) => {
  return (
    <>
      <h2>{`Hello, my name is ${name}, and I am ${age} years old.`}</h2>
    </>
  );
};

docsControlsTable.story = {
  parameters: {
    controls: {
      age: { type: ControlTypes.NUMBER, label: 'Age', value: 19, min: 10, max: 75, step: 5 },
    },
  },  
};