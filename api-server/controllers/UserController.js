var User = require('../models/user');
const jwt = require('jwt-simple'); // used to create, sign, and verify tokens
const config = require('../config');
var app = require('../../app');

// Takes User model
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.login = function(req, res, next) {
  console.log('No good');
  res.send({ token: tokenForUser(req.user) })
};

// sign up user
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({
    'auth.email': email
  }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    // All is good, create new user
    var newUser = new User();
    newUser.auth.email = email;
    newUser.auth.password = password;
    newUser.libraries = {};
    newUser.save(function(err) {
      if (err) { return next(err); }
      console.log('User saved successfully');
      res.json({ token: tokenForUser(newUser) });
    });
  });

};

// log out user
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.showAll = function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
};
