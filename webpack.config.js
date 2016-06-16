var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
    app: APP_DIR + '/js/app.jsx',
    dashboard: APP_DIR + '/js/dashboard.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
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