require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: ['./src/index'],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'server.js',
  },
  target: 'node',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
  ],
}
