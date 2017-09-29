module.exports = {
	register: register,
  hasLoggedIn: hasLoggedIn,
	login: login,
  logout: logout,
  getUser: getUser,
}

var firebase = require('firebase');
var app = firebase.initializeApp({
  apiKey: "AIzaSyC4qXiPBa87X524p_t3QJpsQJ7goHfJEqg",
  authDomain: "gt-ael.firebaseapp.com",
  databaseURL: "https://gt-ael.firebaseio.com",
  projectId: "gt-ael",
  storageBucket: "gt-ael.appspot.com",
  messagingSenderId: "1058241759354"
});

function hasLoggedIn() {
  return getUser() !== null;
}

function getUser() {
  return firebase.auth().currentUser;
}

function register(email, password, callback) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
    callback(null, getUser().uid);
  }).catch(function(error) {
    callback(error);
  });
}

function login(email, password, callback) {
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    callback(null, getUser().uid);
  }).catch(function(error) {
    callback(error);
  })
}

function logout(callback) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    callback(null);
  }, function(error) {
    callback(error);
  });
}
