const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    env: {
      viewportWidthBreakpoint: 768
    }
  },
})
