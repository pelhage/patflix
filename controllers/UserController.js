var User = require('../models/user');

module.exports = {

  // log in user
  login: function(passport) {
    return passport.authenticate('local-login', {
      successRedirect: '/upload',
      failureRedirect: '/login',
      failureFlash: true
    });
  },

  // render login page
  showLogin: function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  },

  // sign up user
  signup: function(passport) {
    return passport.authenticate('local-signup', {
      successRedirect: '/upload',
      failureRedirect: '/signup',
      failureFlash: true
    });
  },

  // render signup page
  showSignup: function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  },

  // log out user
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  showAll: function(req, res) {
    User.find({}, function(err, users) {
      var userMap = {};

      users.forEach(function(user) {
        userMap[user._id] = user;
      });
      res.send(userMap);  
    });
  }

};