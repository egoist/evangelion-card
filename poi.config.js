const path = require('path')
const OfflinePlugin = require('offline-plugin')
const pkg = require('./package')

module.exports = options => ({
  entry: 'src/index.js',
  html: {
    title: pkg.productName,
    description: pkg.description,
    template: path.join(__dirname, 'index.ejs')
  },
  homepage: '/evangelion-card/',
  presets: [
    require('poi-preset-offline')()
  ]
})
