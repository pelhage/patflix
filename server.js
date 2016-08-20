var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// for parsing application/json
app.use(bodyParser.json());


// Set Up View Engine + Static Directory
app.set('view engine', 'pug');
app.use('/dist', express.static('dist'));

app.get('*', function(req, res) {
  res.render('index');
});

app.listen(80);
