document.querySelector("#scene").addEventListener('touchstart', function (evt) {
	var arScene = document.querySelector('#scene');
	var player = document.querySelector('#player');
	console.log('The screen was touched');
	var obj = selectedItem;
	console.log(obj.id);
	// obj.setAttribute('visible',false);
	var obj2 = obj.cloneNode('true');
	// obj2.id = obj2.id + '-temp';

}, false);

document.querySelector("#scene").addEventListener('touchend', function (evt) {
	console.log('The touch was removed');
	var arScene = document.querySelector('#scene');
	var obj = selectedItem;
	console.log(obj.id);
	obj.setAttribute('visible',true);
}, false);

document.querySelector("#frame").addEventListener('mouseenter', function(evt){
	console.log(evt.detail.intersection);
})


document.querySelector('ar-frame').addEventListener('referenceframe-statuschanged', function(evt) {
	if (evt.detail.found) {
		document.getElementById('ui').classList.remove('hide-center');

	} else {
		document.getElementById('ui').classList.add('hide-center');
	}
});