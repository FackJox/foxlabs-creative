import { defineConfig } from "cypress";
import { Plugin } from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Setup code coverage
      Plugin(on, config);
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      // Setup code coverage for component tests
      Plugin(on, config);
      return config;
    },
  },
});
