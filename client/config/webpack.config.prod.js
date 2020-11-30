var path = require('path')
var webpack = require('webpack')
var url = require('url')
var paths = require('./paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var homepagePath = require(paths.appPackageJson).homepage
var publicPath = homepagePath ? url.parse(homepagePath).pathname : '/'

if (!publicPath.endsWith('/')) {
  // Prevents incorrect paths in file-loader
  publicPath += '/'
}

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: paths.appBuild,
    port: 3000,
    host: `localhost`,
  },
  entry: {
    main: [path.join(paths.appSrc, 'index')],
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // publicPath: publicPath,
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [paths.appSrc, paths.appNodeModules],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        include: [paths.appSass],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    // new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
  ],
}
