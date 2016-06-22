var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = require('../app');

module.exports = {

  // log in user
  login: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
      'auth.email': email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found' });

      } else if (user) {

        if (!user.validPassword(password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password'});

        } else {
          var token = jwt.sign(user, app.get('authSecret'), {
            expiresIn: 60
          });

          res.json({
            success: true,
            message: 'Authentication successful',
            token: token
          });
        }
      }
    });

  },

  // sign up user
  signup: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(422).send({ error: 'You must provide email and password' });
    }

    User.findOne({
      'auth.email': email
    }, function(err, user) {
      if (err) throw err;

      if (user) {
        res.status(422).send({ success: false, message: 'Signup failed. User already exists' });

      } else {

        var newUser = new User();
        newUser.auth.email = email;
        newUser.auth.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err) throw err;
          console.log('User saved successfully');
          res.json({ success: true });
        });
      }
    });

  },

  // render signup page
  showSignup: function(req, res) {
    res.render('signup');
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
