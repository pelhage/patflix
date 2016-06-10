var libraryController = require('./controllers/LibraryController');
var userController = require('./controllers/UserController');

var bodyParser = require('body-parser');

module.exports = function(app, passport) {
  app.use(bodyParser.json());
  
  // app.get('/', function(req, res) {
  //   res.render('index');
  // });
  
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
  // Create + Save a New Library
  app.post('/l', libraryController.create);
  // Get a user library
  app.get('/l/:id', libraryController.render);
  // Get all libraries
  app.get('/libraries', libraryController.showAll);  

  app.get('/', isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('profile', {
      user: req.user,
    });
  });

  app.get('/test', function(req, res) {
    res.render('upload');
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