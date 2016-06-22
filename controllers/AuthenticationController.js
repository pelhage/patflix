const jwt = require('jsonwebtoken');
var app = require('../app');

module.exports = function isAuthenticated(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    console.log('Found a token');
    // verifies secret and checks exp
    jwt.verify(token, app.get('authSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if no token, return error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
}
