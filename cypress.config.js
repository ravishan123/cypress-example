const { defineConfig } = require("cypress");

module.exports = defineConfig({
  videoCompression: 15,
  projectId: "9zgi3f",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
