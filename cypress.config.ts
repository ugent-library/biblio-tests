import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'or6diq',
  video: false,
  defaultCommandTimeout: 2000,
  viewportWidth: 1200,
  blockHosts: ['*google-analytics.com', '*hotjar.com'],
  retries: 2,

  e2e: {
    setupNodeEvents() {},
    baseUrl: 'https://bibliotest.ugent.be',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    experimentalRunAllSpecs: true,
  },
})
