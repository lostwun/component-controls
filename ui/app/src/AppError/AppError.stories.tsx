/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ControlTypes } from '@component-controls/core';
import { AppError, AppErrorProps } from './AppError';

export default {
  title: 'Application/AppError',
  component: AppError,
};

export const overview = ({ error }: AppErrorProps) => (
  <AppError error={error} />
);

overview.controls = {
  error: {
    type: ControlTypes.TEXT,
    rows: 4,
    value: `some error
text
`,
  },
};
