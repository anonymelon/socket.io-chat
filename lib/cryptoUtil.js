var bcrypt = require('bcrypt');

module.exports = {
  cryptoPassword: function(password, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if(err) return err;
          cb(err, salt, hash);
        });
    });
  },

  compare: function(password, hashedPassword, cb){
    bcrypt.compare(password, hashedPassword, function(err, res) {
        cb(err, res);
    });
  }
}
