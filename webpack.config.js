var webpack = require('webpack');
var prodConfig   = require('./webpack.prod.config');
Object.assign = require('object-assign');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(prodConfig, {

  devtool: 'inline-source-map',

  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './client'
  ],

  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },

  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  }

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Redux Boilerplate'
    })
  ]

};
