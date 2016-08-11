const libraryController = require('./controllers/LibraryController');
const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthenticationController');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // parse application/json
  app.use(bodyParser.json());
  // Allow cross origin requests
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Accept, authorization, Content-Type");
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

  /**
   * LIBRARY
   */
  // Create
  app.post('/library', requireAuth, libraryController.create);
  // Get a user library
  app.get('/library/:id', libraryController.render);
  // Delete a user library
  app.delete('/library/:id', requireAuth, libraryController.remove);
  // Get all libraries
  app.get('/libraries', requireAuth, libraryController.showAll);

};
