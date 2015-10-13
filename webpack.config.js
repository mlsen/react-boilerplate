var webpack = require('webpack');

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {

  devtool: isProduction ? '' : 'source-map',

  entry: [
    path.resolve(ROOT_PATH, 'app/src/index')
  ],

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: isProduction ? [] : ['eslint'],
      include: path.resolve(ROOT_PATH, 'app')
    }],
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

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: isProduction ? path.resolve(ROOT_PATH, 'app/dist') : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Listlogs'
    })
  ]

};
