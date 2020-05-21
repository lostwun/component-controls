import { getConfiguration, extractStories } from '@component-controls/config';
import { stringifyRequest } from 'loader-utils';
import { replaceSource, StoryPath } from './replaceSource';

module.exports = function(content: string) {
  //@ts-ignore
  const params = JSON.parse(this.query.slice(1));
  //@ts-ignore
  const config = getConfiguration(this.rootContext);
  const stories: StoryPath[] = (config ? extractStories(config) || [] : []).map(
    fileName => ({
      absPath: fileName,
      //@ts-ignore
      relPath: stringifyRequest(this, fileName),
    }),
  );

  content = replaceSource(
    stories,
    `__COMPILATION_HASH__${params.compilationHash}`,
  );
  return content;
};
