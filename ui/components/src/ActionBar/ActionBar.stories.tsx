import React from 'react';
import { Box } from 'theme-ui';
import { ActionBar } from './ActionBar';
import { ThemeProvider } from '../ThemeContext';
import { ExternalLink } from '../ExternalLink';

export default {
  title: 'Components/ActionBar',
  component: ActionBar,
};

const Container: React.FC = ({ children }) => (
  <ThemeProvider>
    <Box
      style={{
        height: 100,
        backgroundColor: 'rgb(250, 248, 245)',
      }}
    >
      {children}
    </Box>
  </ThemeProvider>
);
export const overview = () => (
  <Container>
    <ActionBar
      actions={[
        {
          title: 'action 1',
          onClick: () => console.log('clicked'),
        },
        {
          title: <ExternalLink href="https://google.com">google</ExternalLink>,
          onClick: () => console.log('clicked'),
        },
      ]}
    />
  </Container>
);

export const disabled = () => (
  <Container>
    <ActionBar
      actions={[
        {
          title: 'click action',
          onClick: () => console.log('clicked'),
          disabled: true,
        },
      ]}
    />
  </Container>
);

export const link = () => (
  <Container>
    <ActionBar
      actions={[
        {
          title: <ExternalLink href="https://google.com">google</ExternalLink>,
        },
      ]}
    />
  </Container>
);

export const order = () => (
  <Container>
    <ActionBar
      actions={[
        {
          title: 'action 1',
          onClick: () => console.log('clicked'),
          order: 1,
        },
        {
          title: <ExternalLink href="https://google.com">google</ExternalLink>,
          onClick: () => console.log('clicked'),
          order: 0,
        },
      ]}
    />
  </Container>
);

export const override = () => (
  <Container>
    <ActionBar
      actions={[
        {
          title: 'action 1',
          onClick: () => console.log('clicked'),
          id: 'copy',
        },
        {
          title: <ExternalLink href="https://google.com">google</ExternalLink>,
          onClick: () => console.log('clicked'),
        },
        {
          //this will override the action above
          title: 'Copy',
          id: 'copy',
        },
      ]}
    />
  </Container>
);
