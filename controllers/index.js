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
    	} else {
            return res.status(200).send();
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

//Redirect to landing page when log out
router.get('/maps', function(req, res) {
  if (authController.hasLoggedIn()) {
    res.render('maps', {
      hasLoggedIn: authController.hasLoggedIn(),
      email: authController.getUser() ? authController.getUser().email : null,
    });
  } else {
    res.render('index', {
      hasLoggedIn: authController.hasLoggedIn(),
      email: authController.getUser() ? authController.getUser().email : null,
    });
  }
});

router.post('/save-base64', function(req, res) {
  // Store base64 in session
  req.session.base64 = req.body.base64;
  return res.status(200).send({message: 'Successfully stored base64'});
})

router.get('/ar-view', function(req, res) {
  if (authController.hasLoggedIn()) {
    res.render('ar-view', {
      base64: req.session.base64
    });
  } else {
    res.render('login');
  }
});

module.exports = router;
