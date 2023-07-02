const { defineConfig } = require("cypress");

module.exports = defineConfig({
   videoCompression: 15,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
