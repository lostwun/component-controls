import React, { FC } from 'react';
import { Box } from 'theme-ui';

export interface ZoomProps {
  /**
   * default scale
   */
  scale?: number;
}

/**
 * zooming transform component
 */
export const Zoom: FC<ZoomProps> = ({ scale = 1, children }) => {
  return (
    <Box
      css={{
        overflow: scale === 1 ? 'inherit' : 'hidden',
      }}
    >
      <Box
        variant="zoom"
        css={{
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
