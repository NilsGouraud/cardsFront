import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        launchOptions.args.push('--disable-web-security');
        launchOptions.args.push('--disable-features=CrossOriginOpenerPolicy');
        return launchOptions;
      });
    },
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
