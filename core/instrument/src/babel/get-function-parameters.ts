import traverse from '@babel/traverse';
import {
  Story,
  CodeLocation,
  StoryArguments,
} from '@component-controls/specification';
import { adjustSourceLocation } from './utils';
import {
  extractArgumentsUsage,
  addArgumentUsage,
} from './control-values-in-source';

interface KeyType {
  name: string;
}
interface ASTPropNode {
  name?: string;
  loc: CodeLocation;
  properties?: ASTPropNode[];
  key?: KeyType;
  value?: ASTPropNode;
  left?: ASTPropNode;
}
export const extractFunctionParameters = (story: Story) => ({
  ArrowFunctionExpression: (path: any) => {
    const node = path.node;
    if (!story.arguments) {
      story.arguments = [];
    }
    story.loc = {
      start: {
        column: node.loc.start.column,
        line: node.loc.start.line,
      },
      end: {
        column: node.loc.end.column,
        line: node.loc.end.line,
      },
    };

    const pushParams = (
      node: ASTPropNode,
      parameters: StoryArguments,
      key?: KeyType,
    ) => {
      const pushProperties = (properties: ASTPropNode[]) => {
        const nestedParameters: StoryArguments = [];
        parameters.push({
          value: nestedParameters,
          name: key ? key.name : node.name,
          loc,
        });
        properties.forEach(({ value, key }) => {
          if (value) {
            pushParams(value, nestedParameters, key);
          }
        });
      };
      const loc = adjustSourceLocation(story, node.loc);
      if (node.name) {
        parameters.push({
          value: node.name,
          name: key ? key.name : node.name,
          loc,
        });
      } else if (node.left && node.left.properties) {
        pushProperties(node.left.properties);
      } else if (node.properties) {
        pushProperties(node.properties);
      }
    };
    if (node.params) {
      node.params.forEach(
        (p: { name: string; loc: CodeLocation; properties?: any }) => {
          if (story.arguments) {
            pushParams(p, story.arguments);
          }
        },
      );
    }
    if (story.arguments.length) {
      const params = story.arguments[0];
      if (node.body.type === 'Identifier') {
        addArgumentUsage(story, [params], node.body);
      } else {
        traverse(
          node.body,
          extractArgumentsUsage(story, [params]),
          path.scope,
          path,
        );
      }
    }
    path.skip();
  },
});
