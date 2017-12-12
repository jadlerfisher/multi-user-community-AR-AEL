document.querySelector("ar-scene").addEventListener('touchstart', function (evt) {
	var arScene = document.querySelector('ar-scene');
	var player = document.querySelector('#player');
	console.log('The screen was touched');
	var obj = selectedItem;
	console.log(obj.id);

}, false);

document.querySelector("ar-scene").addEventListener('touchend', function (evt) {
	console.log('The touch was removed');
	var arScene = document.querySelector('ar-scene');
	var obj = selectedItem;
	console.log(obj.id);
	obj.setAttribute('visible',true);
}, false);

document.querySelector('ar-frame').addEventListener('referenceframe-statuschanged', function(evt) {
	if (evt.detail.found) {
		document.getElementById('ui').classList.remove('hide-center');

	} else {
		document.getElementById('ui').classList.add('hide-center');
	}
});

/**
 * moves the position of the entity in the direction
 * @param {String} axis - 'x' or 'y'
 * @param {String} value - +1 or -1
*/
function armove(axis, value) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  var _xO = object.getAttribute('position').x;
  var _yO = object.getAttribute('position').y;
  var _zO = object.getAttribute('position').z;

 if (axis === "z") {
    var _x = _xO;
    var _y = _yO;
    var _z = _zO + value/10.0;
  } else if (axis === "x") {
    var _y = _yO;
    var _x = _xO + value/10.0;
    var _z = _zO;
  } else {
    // Update position
    var _y = _yO + (value/10.0);
    var _x = _xO;
    var _z = _zO;
  }

  object.setAttribute('position', {x: _x, y: _y, z: _z});
  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: { position: object.getAttribute('position') }
  };

  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}