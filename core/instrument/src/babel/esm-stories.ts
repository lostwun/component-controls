import { Story, Document, Stories } from '@component-controls/core';
import { File } from '@babel/types';
import traverse from '@babel/traverse';
import { extractFunctionParameters } from './extract-function-parameters';
import { extractAttributes } from './extract-attributes';
import { followStoryImport } from './follow-imports';
import { componentsFromParams } from '../misc/component-attributes';
import { sourceLocation } from '../misc/source-location';
import {
  LoadingDocStore,
  ParseStorieReturnType,
  InstrumentOptions,
} from '../types';

export const extractCSFStories = (
  ast: File,
  _options: InstrumentOptions,
  { source, filePath }: { source: string; filePath: string },
): ParseStorieReturnType => {
  const globals: Stories = {};
  const localStories: Stories = {};

  const extractArrowFunction = (
    path: any,
    declaration: any,
  ): Story | undefined => {
    if (declaration.init) {
      switch (declaration.init.type) {
        case 'ArrowFunctionExpression': {
          const el = declaration.init.body;
          const name = declaration.id.name;
          const story: Story = {
            loc: sourceLocation(el.loc),
            name,
            id: name,
          };
          traverse(path.node, extractFunctionParameters(story), path.scope);
          return story;
        }
        case 'Identifier': {
          return followStoryImport(
            declaration.id.name,
            declaration.init.name,
            filePath,
            source,
            _options,
            ast,
          );
        }
      }
    }
    return undefined;
  };
  let components: { [key: string]: string | undefined } = {};
  const store: LoadingDocStore = {
    stories: {},
    doc: undefined,
    components: {},
    packages: {},
  };
  traverse(ast as any, {
    ExportDefaultDeclaration: (path: any) => {
      const { declaration } = path.node;
      const attributes = extractAttributes(declaration);

      const { title } = attributes || {};
      if (typeof title === 'string') {
        const attrComponents = componentsFromParams(attributes);
        components = attrComponents.reduce(
          (acc, componentName) => ({ ...acc, [componentName]: undefined }),
          components,
        );
        const doc: Document = {
          ...attributes,
          title,
          components: {},
        };
        if (attrComponents.length > 0) {
          doc.component = attrComponents[0];
        }

        store.doc = doc;
      }
    },
    AssignmentExpression: (path: any) => {
      const node = path.node;
      const storyExport = node.left?.object?.name;
      if (
        node.left.type === 'MemberExpression' &&
        node.left.property.type === 'Identifier' &&
        store.stories[storyExport]
      ) {
        const extractedValue = extractAttributes(node.right);
        const extractedProps =
          node.left.property.name === 'story'
            ? extractedValue
            : { [node.left.property.name]: extractedValue };
        const { name, storyName, ...attributes } = extractedProps;

        const nameAttr = storyName || name;
        if (store.stories[storyExport]) {
          const attrComponents = componentsFromParams(attributes);
          components = attrComponents.reduce(
            (acc, componentName) => ({ ...acc, [componentName]: undefined }),
            components,
          );
          const story: Story = {
            ...attributes,
            ...store.stories[storyExport],
          };
          if (nameAttr) {
            story.name = nameAttr;
          }
          store.stories[storyExport] = story;
          globals[storyExport] = story;
        }
      }
    },
    VariableDeclaration: (path: any) => {
      const { declarations } = path.node;

      if (Array.isArray(declarations) && declarations.length > 0) {
        const declaration = declarations[0];
        if (declaration) {
          const name = declaration.id.name;
          //check if it was a named export
          if (!store.stories[name]) {
            const story = extractArrowFunction(path, declaration);
            if (story && story.name) {
              localStories[story.name] = story;
            }
          }
        }
      }
    },
    ExportSpecifier: (path: any) => {
      const { node } = path;
      const localName = node.local.name;
      const exportedName = node.exported.name;
      const story = localStories[localName];
      if (story) {
        const global = globals[localName];
        if (global) {
          localStories[localName] = {
            ...story,
            ...global,
          };
        }
        store.stories[exportedName] = story;
      }
    },
    ExportNamedDeclaration: (path: any) => {
      const { declaration } = path.node;
      if (declaration) {
        const { declarations } = declaration;
        if (Array.isArray(declarations) && declarations.length > 0) {
          const story = extractArrowFunction(path, declarations[0]);
          if (story) {
            const name = story.name;
            store.stories[name] = {
              ...story,
              ...globals[name],
            };
          }
        }
      }
    },
  });
  if (store.doc) {
    //@ts-ignore
    store.doc.componentsLookup = components;
  } else {
    throw new Error(`esm files should have one default export`);
  }
  return store;
};
