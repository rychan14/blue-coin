require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

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
        test: /\.js?$/,
        include: [
          path.join(__dirname, 'src', 'client'),
          path.join(__dirname, 'src', 'components'),
          path.join(__dirname, 'src', 'App'),
        ],
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
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: 'http://localhost:5001',
    filename: 'client.js',
  },
}
