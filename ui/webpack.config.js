require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./src/index', 'webpack/hot/poll?1000'],
  output: { path: path.resolve(__dirname, 'public/'), filename: 'server.js' },

  target: 'node',
  watch: true,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new StartServerPlugin('server.js'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : ''
}
