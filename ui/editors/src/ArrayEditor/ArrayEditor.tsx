import React, { FC } from 'react';
import { Button, Box, Flex } from 'theme-ui';
import deepmerge from 'deepmerge';
import { TrashcanIcon, PlusIcon } from '@primer/octicons-react';
import {
  ComponentControl,
  ComponentControlArray,
  ControlTypes,
  newControlValues,
  ComponentControls,
} from '@component-controls/core';

import { Popover } from '@component-controls/components';
import { useControl, ControlsStateProvider } from '@component-controls/store';
import { PropertyEditor, PropertyControlProps } from '../types';
import { addPropertyEditor, getPropertyEditor } from '../prop-factory';

const ChildContainer: FC = props => (
  <Box
    css={{
      maxWidth: 800,
      padding: 15,
      boxSizing: 'content-box',
    }}
    {...props}
  />
);

interface RowEditorProps {
  propName: string;
  control: ComponentControlArray;
  row: any;
  Editor: PropertyEditor;
  onChange: (name: string | undefined, value: any) => void;
}
const RowEditor: FC<RowEditorProps> = ({
  propName,
  control,
  row,
  Editor,
  onChange,
}) => {
  const controls: ComponentControls = {
    [propName]:
      control.rowType[propName].type === ControlTypes.OBJECT
        ? deepmerge<ComponentControl>(control.rowType[propName], {
            value: Object.keys(row[propName]).reduce(
              (a, k) => ({
                ...a,
                [k]: {
                  value: row[propName] ? row[propName][k] : {},
                },
              }),
              {},
            ),
          })
        : deepmerge<ComponentControl>(control.rowType[propName], {
            value: row[propName],
          }),
  };

  return (
    <ControlsStateProvider controls={controls} onChange={onChange}>
      <Editor name={propName} />
    </ControlsStateProvider>
  );
};

export interface ArrayEditorProps extends PropertyControlProps {
  /**
   * label for the editor button.
   */
  editLabel?: string;
}
/**
 * Array control editor.
 *
 */
export const ArrayEditor: PropertyEditor<ArrayEditorProps> = ({
  name,
  editLabel = 'edit...',
}) => {
  const [control, setProp] = useControl<ComponentControlArray>(name);
  const { editLabel: controlEditLabel } = control;
  const [isOpen, setIsOpen] = React.useState(false);
  const handleChange = (
    rowIndex: number,
    propName: string | undefined,
    value: any,
  ) => {
    if (Array.isArray(control.value)) {
      setProp(
        control.value.map((row, index) =>
          rowIndex === index ? { ...row, [propName as string]: value } : row,
        ),
      );
    }
  };
  const handleOnDelete = (rowIndex: number) => {
    if (Array.isArray(control.value)) {
      setProp(control.value.filter((row, index) => index !== rowIndex));
    }
  };
  const handleOnAdd = () => {
    if (Array.isArray(control.value)) {
      setProp([...control.value, newControlValues(control.rowType)]);
    }
  };
  return (
    <Popover
      trigger="click"
      placement="bottom"
      tooltipShown={isOpen}
      onVisibilityChange={(isVisible: boolean) => {
        setIsOpen(isVisible);
      }}
      tooltip={() => (
        <ChildContainer>
          <table>
            <thead>
              <tr>
                {control.rowType &&
                  Object.keys(control.rowType).map(key => (
                    <th key={`head_${key}`}>
                      {control.rowType[key].label || key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(control.value) &&
                control.value.map((row, idx) => (
                  <tr key={`array_row_${idx}`}>
                    {typeof row === 'object' &&
                      Object.keys(control.rowType)
                        .map(key => {
                          const Editor: PropertyEditor = getPropertyEditor(
                            control.rowType[key].type,
                          );

                          return Editor ? (
                            <td key={`row_data_${idx}_${key}`}>
                              <Flex>
                                <RowEditor
                                  control={control}
                                  propName={key}
                                  row={row}
                                  Editor={Editor}
                                  onChange={(
                                    propName: string | undefined,
                                    value: any,
                                  ) => handleChange(idx, propName, value)}
                                />
                              </Flex>
                            </td>
                          ) : null;
                        })
                        .filter(r => r)}
                    <td>
                      <Button
                        onClick={() => handleOnDelete(idx)}
                        aria-label="delete row"
                      >
                        <TrashcanIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Button onClick={handleOnAdd} aria-label="add new row">
            <PlusIcon />
            {` `}
            Add row
          </Button>
        </ChildContainer>
      )}
    >
      <Button aria-label="edit the properties of the array">
        {controlEditLabel || editLabel}
        <Box />
      </Button>
    </Popover>
  );
};

addPropertyEditor(ControlTypes.ARRAY, ArrayEditor);
