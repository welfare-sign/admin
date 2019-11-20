const path = require('path')
module.exports = {
    devServer: {
        proxy: 'http://api.fuliqian.com/'
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'scss',
        patterns: [path.resolve(__dirname, './styles/index.scss')]
      }
    }
}
