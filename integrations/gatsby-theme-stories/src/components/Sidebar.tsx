/** @jsx jsx */
import { FC } from 'react';
import { jsx, LinkProps, Theme } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';
import { Sidebar as AppSidebar } from '@component-controls/app';

const Link: FC<LinkProps> = props => (
  //@ts-ignore
  <GatsbyLink
    {...props}
    activeClassName="active"
    sx={{
      color: 'inherit',
      '&.active': {
        borderLeft: (t: Theme) => `4px solid ${t?.colors?.accent}`,
        color: 'white',
      },
      ':hover': {
        backgroundColor: 'shadow',
      },
    }}
  />
);
export interface SidebarProps {
  docPath?: string;
}

export const Sidebar: FC<SidebarProps> = ({ docPath }) => {
  return <AppSidebar docPath={docPath} buttonClass={Link} />;
};
