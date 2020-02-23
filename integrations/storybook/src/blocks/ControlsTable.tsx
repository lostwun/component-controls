import React, { FC } from 'react';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import {
  SetControlValueFn,
  ClickControlFn,
  ComponentControlButton,
} from '@component-controls/specification';
import { mergeControlValues } from '@component-controls/core';
import {
  BlockContext,
  BlockContextProvider,
  BlockContextProviderProps,
} from './BlockContext';
import { SharedControlsTable } from '../shared/ControlsTable';
import { SET_DATA_MSG } from '../shared/shared';

export interface ControlsTableProps {
  /** a title to display */
  title?: string;
}

const ControlsTableBlock: FC<ControlsTableProps> = ({ title }) => (
  <BlockContext.Consumer>
    {({ id, controls, story, api, channel }) => {
      const setControlValue: SetControlValueFn =
        api && api.setControlValue
          ? api.setControlValue
          : (storyId: string, propName: string | undefined, propValue: any) => {
              if (story) {
                const newValues = mergeControlValues(
                  story.parameters.controls,
                  propName,
                  propValue,
                );
                story.parameters.controls = newValues;
                channel.emit(FORCE_RE_RENDER);
                channel.emit(SET_DATA_MSG, {
                  storyId,
                  controls: newValues,
                });
              }
            };
      const clickControl: ClickControlFn =
        api && api.clickControl
          ? api.clickControl
          : (storyId: string, propName: string) => {
              if (controls && controls[propName]) {
                const control: ComponentControlButton = controls[
                  propName
                ] as ComponentControlButton;
                if (control && typeof control.onClick === 'function') {
                  control.onClick(control);
                }
              }
            };
      if (!story || !controls || controls.disable) {
        return null;
      }

      return id ? (
        <SharedControlsTable
          title={title}
          controls={controls}
          storyId={id}
          setControlValue={setControlValue}
          clickControl={clickControl}
        />
      ) : null;
    }}
  </BlockContext.Consumer>
);

export const ControlsTable: FC<BlockContextProviderProps &
  ControlsTableProps> = ({ title = 'Property Editors', ...rest }) => (
  <BlockContextProvider {...rest}>
    <ControlsTableBlock title={title} />
  </BlockContextProvider>
);