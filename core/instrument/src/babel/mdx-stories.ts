import {
  Story,
  StoriesDoc,
  StoryParameters,
  CodeLocation,
} from '@component-controls/specification';
import { getASTSource } from '@component-controls/core';
import camelCase from 'camelcase';
import { File } from '@babel/types';
import traverse from '@babel/traverse';
import { extractFunctionParameters } from './extract-function-parameters';
import { followStoryImport } from './follow-imports';
import { extractAttributes } from './extract-attributes';
import { sourceLocation } from '../misc/source-location';
import { ParseStorieReturnType, InstrumentOptions } from '../types';

import { componentsFromParams } from '../misc/component-attributes';

export const extractMDXStories = (props: any) => (
  ast: File,
  _options: Required<InstrumentOptions>,
  { source, filePath }: { source: string; filePath: string },
): ParseStorieReturnType => {
  const collectAttributes = (node: any): StoryParameters => {
    return node.attributes.reduce((acc: StoryParameters, attribute: any) => {
      if (attribute.value.type === 'StringLiteral') {
        return {
          ...acc,
          [attribute.name.name]: attribute.value.value,
        };
      } else if (attribute.value.type === 'JSXExpressionContainer') {
        return {
          ...acc,
          [attribute.name.name]: extractAttributes(attribute.value.expression),
        };
      }
      return acc;
    }, {});
  };

  let components: { [key: string]: string | undefined } = {};
  const collectComponent = (attributes: StoryParameters) => {
    const attrComponents = componentsFromParams(attributes);
    components = attrComponents.reduce(
      (acc, componentName) => ({ ...acc, [componentName]: undefined }),
      components,
    );
    return attrComponents.length > 0 ? attrComponents[0] : undefined;
  };

  const store: Required<Pick<
    ParseStorieReturnType,
    'stories' | 'doc' | 'components' | 'exports' | 'packages'
  >> = {
    stories: {},
    doc: props ? { ...props } : undefined,
    components: {},
    exports: {},
    packages: {},
  };

  if (props) {
    store.exports.default = {
      story: props,
    };
  }
  const { transformMDX } = _options.mdx;
  traverse(ast as any, {
    JSXElement: (path: any) => {
      const node = path.node.openingElement;
      if (
        [
          'Description',
          'Meta',
          'Story',
          'Preview',
          'PropsTable',
          'Playground',
          'ComponentSource',
        ].indexOf(node.name.name) > -1
      ) {
        switch (node.name.name) {
          case 'Story': {
            const attributes = collectAttributes(node);
            const exports = transformMDX ? { story: attributes } : undefined;
            const { name } = attributes;
            if (typeof name === 'string') {
              if (store.stories[name]) {
                throw new Error(`Duplicated story name ${name}`);
              }
              const id = camelCase(name);
              const expression =
                Array.isArray(path.node.children) &&
                path.node.children.find(
                  (child: any) => child.type === 'JSXExpressionContainer',
                );
              let story: Story = {
                ...attributes,
                name,
                id,
              };

              if (
                expression &&
                (expression.expression.type === 'CallExpression' ||
                  (expression.expression.type === 'ArrowFunctionExpression' &&
                    expression.expression.body &&
                    expression.expression.body.callee))
              ) {
                const importedName =
                  expression.expression.type === 'CallExpression'
                    ? expression.expression.callee.name
                    : expression.expression.body.callee.name;
                const followStory = followStoryImport(
                  name,
                  importedName,
                  filePath,
                  source,
                  _options,
                  ast,
                  exports,
                );
                story = { ...followStory, ...story };
              } else {
                const loc: CodeLocation = path.node.children.length
                  ? expression
                    ? expression.expression.loc
                    : {
                        start: path.node.children[0].loc.start,
                        end:
                          path.node.children[path.node.children.length - 1].loc
                            .end,
                      }
                  : path.node.loc;
                // adjust for source code wraping issues
                const storySource = getASTSource(source, loc);
                const storyLines = storySource?.split('\n');
                //remove as many spaces as there are in the first non-empty line
                const firstLine = storyLines?.find(
                  line => line.trim().length > 0,
                );
                const whiteSpaces = firstLine ? firstLine.search(/\S/) : 0;
                story.loc = sourceLocation(loc);
                story.source = storyLines
                  ? storyLines
                      .map(line => line.substr(whiteSpaces))
                      .join('\n')
                      .trim()
                  : storySource;
              }
              const component = collectComponent(attributes);
              if (component) {
                story.component = component;
              }
              traverse(
                expression || path.node,
                extractFunctionParameters(story, exports),
                path.scope,
                path,
              );
              store.stories[id] = story;
              if (exports) {
                store.exports[id] = exports;
              }
            }
            break;
          }
          case 'Meta': {
            const attributes = collectAttributes(node);
            const exports = transformMDX ? { story: attributes } : undefined;
            const { title } = attributes;
            if (title) {
              const doc: StoriesDoc = {
                components: {},
                ...attributes,
                title,
              };
              if (exports) {
                store.exports.default = exports;
              }
              const component = collectComponent(attributes);
              if (component !== undefined) {
                doc.component = component;
              }
              store.doc = doc;
            }
            break;
          }
          default:
            break;
        }
        // console.log(node.name.name, attributes);
      }
    },
  });

  if (store.doc && store.doc.title) {
    //@ts-ignore
    store.doc.components = components;
  } else {
    throw new Error(`MDX documenation pages should have at least a title`);
  }
  return store;
};
