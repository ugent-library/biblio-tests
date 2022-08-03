const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'or6diq',
  video: false,
  defaultCommandTimeout: 2000,
  viewportWidth: 1200,
  blockHosts: ['*google-analytics.com', '*hotjar.com'],
  env: {},
  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://biblio.ugent.be',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})