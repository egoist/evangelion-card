const path = require('path')
const OfflinePlugin = require('offline-plugin')
const pkg = require('./package')

module.exports = options => ({
  entry: 'src/index.js',
  html: {
    title: pkg.productName,
    description: pkg.descrption,
    template: path.join(__dirname, 'index.ejs')
  },
  extendWebpack(config) {
    // Enable pwa support in production mode
    if (options.mode === 'production') {
      config.plugin('offline')
        .use(OfflinePlugin, [{
          ServiceWorker: {
            events: true
          },
          AppCache: {
            events: true
          }
        }])
    }
  }
})
