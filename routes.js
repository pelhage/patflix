const libraryController = require('./controllers/LibraryController');
const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthenticationController');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Allow cross origin requests
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });

  app.get('/', requireAuth, function(req, res) {
    res.json({ 'message': 'Hello, working now' });
  });
  /**
   * LOGIN & SIGNUP
   */
  // Signup User
  app.post('/signup', userController.signup);
  // Login User
  app.post('/login', requireLogin, userController.login);
  // Logout User
  app.get('/logout', userController.logout);
  // Check to see if user is auth'd
  app.get('/isauth', authController, function(req, res) {
    console.log('decoded req', req.decoded);
    res.json({ 'message': 'You were able to authenticate!'});
  });


  /**
   * LIBRARY
   */
  app.post('/test', libraryController.test);
  // Create
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
  app.get('/dashboard', authController, function(req, res) {
    res.render('dashboard', {
      user: {
        userId: req.decoded._doc._id,
        libraries: req.decoded._doc.libraries
      }
    });
  });

  /**
   * DUMMY ROUTES FOR TESTING
   */
  app.get('/dummyData', function(req, res) {
    res.json({
      'data': 'isDummy',
      'hello': 'world',
      'testing': 'this route'
    });
  });
};
