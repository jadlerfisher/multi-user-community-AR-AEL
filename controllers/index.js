var express = require('express');
var router = express.Router();
var authController = require('./authController');

router.get('/', function(req, res) {
  res.render('index', {
    hasLoggedIn: authController.hasLoggedIn(),
    email: authController.getUser() ? authController.getUser().email : null,
  });
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

//Logout a user
router.post('/logout', function(req, res) {
	authController.logout(
    function(error) {
    	if (error) {
    		return res.status(500).send(error.message);
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
  if (authController.hasLoggedIn()) {
    res.render('maps');
  } else {
    res.render('login');
  }
});

router.get('/ar-view', function(req, res) {
  if (authController.hasLoggedIn()) {
    res.render('ar-view');
  } else {
    res.render('login');
  }
});

module.exports = router;
