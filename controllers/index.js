var express = require('express');
var router = express.Router();
var authController = require('./authController');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

//Login a user
router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

	authController.login(email, password,
    function(error, uid) {
    	if (error) {
    		return res.status(500).send(error.message);
    	} else {
    		return res.status(200).send({uid : uid});
      }
    }
  );
});

router.get('/register', function(req, res) {
  res.render('register');
});

//Create new user
router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

	authController.register(email, password,
    function(error, uid) {
    	if (error) {
    		return res.status(500).send(error.message);
    	} else {
    		return res.status(200).send({uid : uid});
      }
    }
  );
});

router.get('/maps', function(req, res) {
  res.render('maps');
});

router.get('/ar-view', function(req, res) {
  res.render('ar-view');
});

module.exports = router;
