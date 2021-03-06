import React from 'react';
import styled from '@emotion/styled';
import { ComponentControlOptions } from '@component-controls/core';
import { useControl } from '@component-controls/store';
import { normalizeOptions, NormalizedOption } from './utils';
import { PropertyEditor } from '../types';

const RadiosWrapper = styled.div<{ isInline: boolean }>(({ isInline }) =>
  isInline
    ? {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        '> * + *': {
          marginLeft: 10,
        },
      }
    : {},
);

const RadioLabel = styled.label({
  padding: '3px 0 3px 5px',
  lineHeight: '18px',
  display: 'inline-block',
});

export const RadiosEditor: PropertyEditor = ({ name }) => {
  const [control, onChange] = useControl<ComponentControlOptions>(name);

  const renderRadioButton = (entry: NormalizedOption) => {
    const id = `${entry.label}-${entry.value}`;
    return (
      <div key={id}>
        <input
          type="radio"
          id={id}
          name={name}
          value={entry.value}
          onChange={e => onChange(e.target.value)}
          checked={
            entry.value === control.value ||
            (typeof entry.value.toString === 'function' &&
              entry.value.toString() === control.value)
          }
        />
        <RadioLabel htmlFor={id}>{entry.label}</RadioLabel>
      </div>
    );
  };
  const renderRadioButtonList = () => {
    const { options, value } = control;
    const { entries } = normalizeOptions(options, value);
    return entries.map(entry => renderRadioButton(entry));
  };
  const isInline = control.display === 'inline-radio';
  return (
    <RadiosWrapper isInline={isInline}>{renderRadioButtonList()}</RadiosWrapper>
  );
};
