var express = require('express');

var router = express.Router();
var User = require('../models/users')
var cryptoUtil = require('../lib/cryptoUtil');

/* GET user page. */
router.get('/', function(req, res, next) {
  res.render('users/index', { title: 'Express' });
});

/* POST register page. */
router.post('/', function(req, res, next) {
  cryptoUtil.cryptoPassword(req.body.password, function(err, salt, hash) {
    new User({
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      hashedPassword: hash
    }).save(function(err) {
      if (err) return next(err);
      res.render('users/index', { title: 'Express' });
    });
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('users/register', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Express' });
});


/* POST login page. */
router.post('/login', function(req, res, next) {
  User.find({email: req.body.email},function(err, user){
    if(err) return next(err);
    cryptoUtil.compare(req.body.password, user[0].hashedPassword, function(err, ret){
      if(err) {
        return next(err);
      } else if (ret) {
        res.render('users/index', { title: 'Express' });
      } else {
        return next(new Error('incorrect password'));
      }
    });
  });
});


module.exports = router;
