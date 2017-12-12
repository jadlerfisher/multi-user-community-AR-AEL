module.exports = {
	saveObject: saveObject,
	removeObject: removeObject,
	getObjects: getObjects,
	updateAnnotation: updateAnnotation,
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
		annotation: components.annotation,
  });
}

function updateAnnotation(objectId, annotation, callback) {
  // Save object in Firebase
  firebase.database().ref('objects/' + objectId).update({
		annotation: annotation,
  });
}

function removeObject(objectId, callback) {
  // Remove object in Firebase
  firebase.database().ref('objects/' + objectId).set(null);
}

function getObjects() {
	return firebase.database().ref('/objects').once('value');
}
