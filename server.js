var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// /* do webpack stuff */
// var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config')
// var compiler = webpack(config)
//
// app.use(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
//   historyApiFallback: true
// }))
//
// app.use(webpackHotMiddleware(compiler))
// /* end do webpack stuff */


// for parsing application/json
app.use(bodyParser.json());


// Set Up View Engine + Static Directory
app.set('view engine', 'pug');
app.use('/dist', express.static('dist'));

app.get('*', function(req, res) {
  res.render('index');
});

app.listen(3000);
