module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/upload', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user,
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Save a New Library
  app.post('/l', function(req, res) {
    var lib = req.body.library;
    var pwd = req.body.password;
    libs.insert({library: lib}, function(err, result) {
      res.send(hashids.encodeHex(result.ops[0]._id));
    });
  });
  
  // Get a user library
  app.get('/l/:id', function(req, res) {
    var libID = hashids.decodeHex(req.params.id);
    libs.findOne({'_id': new ObjectID(libID)}, function(err, doc) {
      res.send(doc);
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}