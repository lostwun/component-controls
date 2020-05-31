import React, { FC, createContext, useEffect } from 'react';
import { Button, ButtonProps } from 'theme-ui';
import Octicon, { ThreeBars } from '@primer/octicons-react';
import { useBreakpointIndex } from '@theme-ui/match-media';

export type SidebarToggleProps = {
  icon?: React.ReactNode;
} & ButtonProps;

export interface SidebarContextProps {
  SidebarToggle: FC<SidebarToggleProps>;
  collapsed?: boolean;
  collapsible?: boolean;
  setCollapsed: (value: boolean) => void;
}
export const SidebarContext = createContext<SidebarContextProps>({
  SidebarToggle: () => null,
  setCollapsed: () => {},
});
export interface SidebarContextProviderProps {
  collapsible?: boolean;
}
export const SidebarContextProvider: FC<SidebarContextProviderProps> = ({
  children,
  collapsible = true,
}) => {
  const [collapsed, setCollapsed] = React.useState<boolean | undefined>(
    undefined,
  );
  const size: number = useBreakpointIndex();
  useEffect(() => {
    if (collapsible) {
      setCollapsed(size <= 1);
    }
  }, [size, collapsible, collapsed]);

  const SidebarToggle: FC<SidebarToggleProps> = ({ icon, ...rest }) => {
    return collapsible ? (
      <Button
        aria-label={collapsed ? 'Expand side bar' : 'Collapse side bar'}
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          background: 'none',
          p: 2,
          boxShadow: 'none',
          cursor: 'pointer',
          color: 'text',
        }}
        {...rest}
      >
        {icon || <Octicon icon={ThreeBars} />}
      </Button>
    ) : null;
  };
  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        SidebarToggle,
        collapsible,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
