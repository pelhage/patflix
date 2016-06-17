var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = Schema({
  auth: {
    email: String,
    password: String
  },
  libraries: [{ type: Schema.Types.ObjectId, ref: 'Library' }]
});

// Generate Hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.auth.password);
};


module.exports = mongoose.model('User', userSchema);
