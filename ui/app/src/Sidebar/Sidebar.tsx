/** @jsx jsx */
import { FC, useState, useMemo } from 'react';
import { jsx, Input, LinkProps, Box } from 'theme-ui';
import { Story } from '@component-controls/specification';
import {
  Sidebar as AppSidebar,
  Navmenu,
  MenuItems,
  MenuItem,
} from '@component-controls/app-components';

export interface SidebarProps {
  storyId?: string;
}

interface ConsolidateKinds {
  [kind: string]: Story[];
}

const createMenuItem = (
  levels: string[],
  parent?: MenuItems,
  item?: MenuItem,
): MenuItem => {
  if (levels.length < 1) {
    return item || {};
  }
  const newItem: MenuItem = {
    id: levels[0],
    label: levels[0],
  };
  const sibling = parent && parent.find(i => i.id === newItem.id);
  if (parent && !sibling) {
    newItem.items = [];
    parent.push(newItem);
  }
  return createMenuItem(
    levels.slice(1),
    sibling ? sibling.items : newItem.items,
    newItem,
  );
};

export const Sidebar: FC<SidebarProps> = ({ storyId }) => {
  const stories = data.allStory.edges;

  const menuItems = useMemo(() => {
    const kinds: ConsolidateKinds = stories.reduce(
      (acc: ConsolidateKinds, { node }: { node: Required<Story> }) => {
        if (acc[node.kind]) {
          return { ...acc, [node.kind]: [...acc[node.kind], node] };
        }
        return { ...acc, [node.kind]: [node] };
      },
      {},
    );
    const menuItems = Object.keys(kinds).reduce((acc: MenuItems, key) => {
      const stories = kinds[key];
      const levels = key.split('/');
      const kind = createMenuItem(levels, acc);
      kind.items = stories.map(story => ({
        id: story.id,
        label: story.name,
        to: `/stories/${story.id}`,
      }));
      return acc;
    }, []);
    return menuItems;
  }, [stories]);

  const [search, setSearch] = useState<string | undefined>(undefined);
  return (
    <AppSidebar sx={{ px: 1, backgroundColor: 'sidebar' }}>
      {siteTitle}
      <Box sx={{ py: 2 }}>
        <Input
          placeholder="search stories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>
      <Navmenu
        buttonClass={Link}
        activeItem={{ id: storyId }}
        search={search}
        items={menuItems}
      />
    </AppSidebar>
  );
};
