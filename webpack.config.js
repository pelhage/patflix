var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  devtool: 'eval',

  entry: [
    './src/js/index.js',
    'webpack-hot-middleware/client?reload=true'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /style.scss/,
        include: APP_DIR + '/sass/',
        loaders: [
            'style',
            'css',
            'autoprefixer?browsers=last 3 versions',
            'sass?outputStyle=expanded'
        ]
      },

    ]
  }
};

module.exports = config;
