import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // Setup code coverage - commented out until properly installed
      // Plugin(on, config);
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      // Setup code coverage for component tests - commented out until properly installed
      // Plugin(on, config);
      return config;
    },
  },
});
