
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  // used to serialize the user for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {

      User.findOne({ 'local.email': email }, function(err, user) {
        // Return any errors
        if (err) {
          return done(err);
        }
        // Check to see if email already exists
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken'));
        } else {
          // if no user exists, create new one
          var newUser = new User();
          // set user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          // Save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });

    });

  }));

  passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    User.findOne({ 'local.email': email }, function(err, user) {

      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'That email is not used'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong password'));
      }

      return done(null, user);
    });
  
  }));

};