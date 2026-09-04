import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "or6diq",
  defaultBrowser: "chrome",
  video: false,
  defaultCommandTimeout: 2000,
  viewportWidth: 1200,
  blockHosts: [
    "*google-analytics.com",
    "*hotjar.com",
    "*piwik.pro",
  ],
  retries: 2,

  e2e: {
    baseUrl: "https://bibliotest.ugent.be",
    experimentalRunAllSpecs: true,
  },
});
