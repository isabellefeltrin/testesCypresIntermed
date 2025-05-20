const { defineConfig } = require('cypress')



module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    supportFile: 'cypress/support/e2e.js'
  },
  fixturesFolder: false,
  video: false,
})

