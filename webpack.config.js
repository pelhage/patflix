var path = require('path');
var webpack = require('webpack');

// Path to all packaged files
var buildPath = path.resolve(__dirname, 'dist');
// Path to css source files
var cssPath = path.resolve(__dirname, 'src', 'sass');
// Path to source directory
var srcPath = path.resolve(__dirname, 'src');
// Path to app's index file
var appPath = path.resolve(__dirname, 'src', 'js', 'index.js');

var config = {
  devtool: 'eval',

  entry: [
    appPath,
    'webpack-hot-middleware/client?reload=true'
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath,
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
        include: [srcPath]
      },
      {
        test: /style.scss/,
        include: cssPath,
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
