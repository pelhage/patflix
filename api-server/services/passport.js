const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;


// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  console.log('Going to try this.');
  User.findOne({ 'auth.email': email}, function(err, user) {
    if (err) { console.log('err. msg', err); return done(err, false); }
    if (!user) { console.log('!user. msg', err); return done(null, false) }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { console.log('compare fail. msg', err); return done(err); }
      if (!isMatch) { console.log('compare mismatch', err); return done(null, false); }

      return done(null, user);
    });
  });
});


// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
// Create JWT Strategy
// payload is decoded jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if user ID in payload exists in our database
  // If it does, call `done` with that, otherwise
  // call done without user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user)
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
