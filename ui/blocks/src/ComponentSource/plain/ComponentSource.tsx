import React, { FC } from 'react';
import { ActionItem } from '@component-controls/components';
import { ComponentsContainer } from '../../context/components/ComponentsContainer';
import { ComponentInputProps } from '../../context/components/ComponentsContext';
import {
  ThemeContext,
  Source,
  SourceProps,
} from '@component-controls/components';
import { repositoryActions } from '../../utils/repositoryActions';

export type ComponentSourceProps = ComponentInputProps &
  Omit<SourceProps, 'children'>;

/**
 * Displays import statement for a component as well as the component file source code
 * Optionally also displays some repository information from the component's package.json
 */

export const ComponentSource: FC<ComponentSourceProps> = ({
  of,
  actions,
  ...rest
}) => {
  return (
    <ComponentsContainer of={of}>
      {component => {
        let source;
        const { from, importedName, name: componentName, repository } =
          component || {};
        const importFrom =
          repository && repository.name ? repository.name : from;
        if (importFrom) {
          source =
            importedName !== 'default' && importedName !== 'namespace'
              ? `import { ${componentName} } from '${importFrom}';`
              : `import ${componentName} from '${importFrom}';`;
        }

        if (!source) {
          return null;
        }
        const { dark } = React.useContext(ThemeContext);
        const [showFileSource, setShowFileSource] = React.useState<boolean>(
          false,
        );

        const onShowFileSource = () => setShowFileSource(!showFileSource);
        const allActions: ActionItem[] = [];

        if (component && component.source) {
          allActions.push({
            title: showFileSource ? 'import' : 'component',
            onClick: onShowFileSource,
          });
        }
        const repositoryItems =
          component && repositoryActions(component?.repository);
        if (repositoryItems) {
          allActions.push.apply(allActions, repositoryItems);
        }
        if (actions) {
          allActions.push.apply(allActions, actions);
        }
        return (
          <Source dark={dark} {...rest} actions={allActions}>
            {showFileSource ? component?.source ?? '' : source}
          </Source>
        );
      }}
    </ComponentsContainer>
  );
};