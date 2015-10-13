var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outDirectory = 'dist';

module.exports = {

  entry: [
    './client'
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, outDirectory),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'React Redux Boilerplate',
    //   template: './templates/index.html',
    //   inject: 'body'
    // })
  ]
};
