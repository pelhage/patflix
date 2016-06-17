var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = require('../app');

module.exports = {

  // log in user
  login: function(req, res) {

    User.findOne({ 
      'auth.email': req.body.email 
    }, function(err, user) {
      if (err) throw err;
      
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found' });
      
      } else if (user) {
        
        if (!user.validPassword(req.body.password)) {
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
    
    User.findOne({
      'auth.email': req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (user) {
        res.json({ success: false, message: 'Signup failed. User already exists' });
      
      } else {
      
        var newUser = new User();
        newUser.auth.email = req.body.email;
        newUser.auth.password = newUser.generateHash(req.body.password);

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