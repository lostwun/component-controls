import { config } from '../../rollup-config';

export default config({
  input: [
    './src/index.ts',
    './src/live_store.ts',
    './src/static_store.ts',
    './src/webpack/loader.ts',
    './src/webpack/plugin.ts',
  ],
});
