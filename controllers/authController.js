module.exports = {
	register: register,
  isLoggedIn: isLoggedIn,
	login: login,
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

function isLoggedIn() {
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
