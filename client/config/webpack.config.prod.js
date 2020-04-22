var path = require('path')
var webpack = require('webpack')
var url = require('url')
var paths = require('./paths')

var homepagePath = require(paths.appPackageJson).homepage
var publicPath = homepagePath ? url.parse(homepagePath).pathname : '/'
if (!publicPath.endsWith('/')) {
  // Prevents incorrect paths in file-loader
  publicPath += '/'
}

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [
    path.join(paths.appSrc, 'index')
  ],
  output: {
    path: paths.appBuild,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },  
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [paths.appSrc, paths.appNodeModules],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]'
            }
          },
        ],
      },

    ]
  },
  // plugins: [
  //   new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
  // ]
};
