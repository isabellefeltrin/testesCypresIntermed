const { defineConfig } = require('cypress')



module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    // supportFile: 'cypress/support/e2e.js'
     env: {
      hideCredentials: true,
      requestMode: true,
      // snapshotOnly: true,
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false, 
  video: false, //desligando a funcionalidade de geração de vídeos
})

