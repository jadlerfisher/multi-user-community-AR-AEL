var arScene = document.querySelector('ar-scene');
var hudElem = document.getElementById('ui');
var frame = document.querySelector('#frame');
var hudElem2 = hudElem.cloneNode(true);
hudElem.id = hudElem.id+"original";
/* For now, have arScene append HUD at all times
 * For future, arScene only appends when vuforia target is hit
 */

console.log('This is happening');
arScene.appendChild(hudElem2);