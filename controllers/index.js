var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/maps', function(req, res) {
  res.render('maps');
});

router.get('/ar-view', function(req, res) {
  res.render('ar-view');
});

module.exports = router;
