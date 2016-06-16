var libraryController = require('./controllers/LibraryController');
var userController = require('./controllers/UserController');

var bodyParser = require('body-parser');

module.exports = function(app, passport) {
  app.use(bodyParser.json());
  
  /**
   * SIGNUP
   */
  // Show Signup Page
  app.get('/signup', userController.showSignup);
  // Signup User
  app.post('/signup', userController.signup(passport));

  /**
   * LOGIN
   */
  // Show Login Page
  app.get('/login', userController.showLogin);
  // Login User
  app.post('/login', userController.login(passport));

  /**
   * LOGOUT
   */
  // Logout User
  app.get('/logout', userController.logout);

  /**
   * LIBRARY
   */
  app.post('/test', isLoggedIn, libraryController.test);
  
  app.post('/l', libraryController.create);
  // Get a user library
  app.get('/l/:id', libraryController.render);
  // Get all libraries
  app.get('/libraries', libraryController.showAll);  

  app.get('/', isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('library', {
      user: req.user,
    });
  });

  app.post('/testAuth', function(req, res) {
    console.log('TESTAUTH BODY: ', req.body);
    console.log('TESTAUTH SESSION: ', req.session);
    console.log('TESTAUTH USER', req.user);
  });

  /**
   * DASHBOARD AREA
   * (where user uploads libraries)
   */
  // Create + Save a New Library
  app.get('/dashboard', isLoggedIn, function(req, res) {
    console.log('TEST DASHBOARD SESSION:', req.session);
    res.render('dashboard', {
      user: req.user
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');  
  }
  // console.log('is there a user?', req.user);
}