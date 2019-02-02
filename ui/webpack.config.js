require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: { main: './src/server.js' },
  output: { path: path.resolve(__dirname, 'public/'), filename: 'server.js' },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  target: 'node',
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
    })
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : ''
}
