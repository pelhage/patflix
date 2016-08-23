var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
    app: APP_DIR + '/js/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: '/js/main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [APP_DIR],
        loader: 'file',
        query: {
          name: '/media/[name].[ext]'
        }
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
