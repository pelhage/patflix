var libraryController = require('./controllers/LibraryController');
var userController = require('./controllers/UserController');

var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

module.exports = function(app) {

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });

  app.get('/', function(req, res) {
    res.json({ 'message': 'Hello, working now' });
  });

  /**
   * SIGNUP
   */
  // Show Signup Page
  app.get('/signup', userController.showSignup);
  // Signup User
  app.post('/signup', userController.signup);

  app.get('/isauth', isAuthenticated, function(req, res) {
    console.log('decoded req', req.decoded);
    res.json({ 'message': 'You were able to authenticate!'});
  });
  /**
   * LOGIN
   */
  // Show Login Page
  // app.get('/login', userController.showLogin);
  // Login User
  app.post('/login', userController.login);

  app.get('/dummyData', function(req, res) {
    res.json({
      'data': 'isDummy',
      'hello': 'world',
      'testing': 'this route'
    });
  })
  /**
   * LOGOUT
   */
  // Logout User
  app.get('/logout', userController.logout);

  /**
   * LIBRARY
   */
  app.post('/test', libraryController.test);

  app.post('/l', libraryController.create);
  // Get a user library
  app.get('/l/:id', libraryController.render);
  // Get all libraries
  app.get('/libraries', libraryController.showAll);

  /**
   * DASHBOARD AREA
   * (where user uploads libraries)
   */
  // Create + Save a New Library
  app.get('/dashboard', isAuthenticated, function(req, res) {
    res.render('dashboard', {
      user: {
        userId: req.decoded._doc._id,
        libraries: req.decoded._doc.libraries
      }
    });
  });
  function isAuthenticated(req, res, next) {
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
      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  }

};
