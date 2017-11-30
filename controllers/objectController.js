module.exports = {
	saveObject: saveObject,
	getObjects: getObjects,
}

var firebase = require('firebase');

function saveObject(creatorUid, objectId, templateId, components, callback) {
  // Save object in Firebase
  firebase.database().ref('objects/' + objectId).set({
		creatorUid: creatorUid,
		templateId: templateId,
    // Object components
		position: components.position,
		rotation: components.rotation,
		scale: components.scale,
		material: components.material,
  });
}

function getObjects() {
	return firebase.database().ref('/objects').once('value');
}
