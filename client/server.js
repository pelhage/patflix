var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.config.prod')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const path = require('path')
webpackConfig.entry.main.unshift(
  'webpack-hot-middleware/client?reload=true&timeout=1000'
)
//Add HMR plugin
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
const compiler = webpack(webpackConfig)

//Enable "webpack-dev-middleware"
app.use(
  webpackDevMiddleware(compiler, {
    writeToDisk: true,
    publicPath: webpackConfig.output.publicPath,
  })
)

//Enable "webpack-hot-middleware"
app.use(webpackHotMiddleware(compiler))

// for parsing application/json
app.use(bodyParser.json())

// Set Up View Engine + Static Directory
app.use('/dist', express.static('dist'))
app.use('/media', express.static('dist/media'))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.listen(3000)
