var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/js/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
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