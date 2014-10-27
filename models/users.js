var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name: String,
  email: String,
  hashedPassword: String,
  salt: String
});

UserSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('User', UserSchema);
