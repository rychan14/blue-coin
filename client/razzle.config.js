'use strict'
const path = require('path')

module.exports = {
  modify(config, { target, dev }, webpack) {
    config.resolve.modules = [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]

    if (config.devServer && process.env.ENV === 'docker') {
      config.devServer.watchOptions.poll = 1000
      config.devServer.watchOptions.aggregateTimeout = 300
    }

    return config
  },
}
