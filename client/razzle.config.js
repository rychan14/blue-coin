'use strict'

module.exports = {
  modify(config, { target, dev }, webpack) {
    if (config.devServer) {
      config.devServer.watchOptions.poll = 1000
      config.devServer.watchOptions.aggregateTimeout = 300
    }

    return config
  },
}
