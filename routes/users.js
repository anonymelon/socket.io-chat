var express = require('express');

var router = express.Router();
var User = require('../models/users')

/* GET user page. */
router.get('/', function(req, res) {
  res.render('users/index', { title: 'Express' });
});

/* POST register page. */
router.post('/', function(req, res) {
  console.log(req.body, '=================');
  new User({
    name: req.body.name,
    password: req.body.password
  }).save(function (err) {
    console.log(err, '==========');
  });
  res.render('users/index', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function(req, res) {
  res.render('users/register', { title: 'Express' });
});


module.exports = router;
