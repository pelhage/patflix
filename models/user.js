var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = Schema({
  auth: {
    email: { type: String, unique: true, lowercase: true },
    password: String
  },
  libraries: [{ type: Schema.Types.ObjectId, ref: 'Library' }]
});

userSchema.pre('save', function(next) {
  const user = this;
  // Generate salt (randomly generated chars)
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err) }
    // create hashed password using salt
    bcrypt.hash(user.auth.password, salt, null, function(err, hash) {
      if (err) { return next(err) }

      user.auth.password = hash; // password contains salt + hashed password
      next();
    })
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  console.log('about to compare password');
  const user = this;
  bcrypt.compare(candidatePassword, user.auth.password, function(err, isMatch) {
    if (err) { console.log('Error: ', err);return callback(err); }

    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', userSchema);

// TODO: Consider making the hashing and validation part of 'pre'
