require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals')
// const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : '',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:5001',
    'webpack/hot/only-dev-server',
    './src/client',
  ],
  target: 'web',
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BUILD_TARGET: JSON.stringify('client'),
      },
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 5001,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: 'http://localhost:5001',
    filename: 'client.js',
  },
}
