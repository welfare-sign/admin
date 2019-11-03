const path = require('path')
module.exports = {
    devServer: {
        proxy: 'http://47.100.29.191:18080/'
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'scss',
        patterns: [path.resolve(__dirname, './styles/index.scss')]
      }
    }
}
