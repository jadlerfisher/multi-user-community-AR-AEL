// Define custom schema for syncing avatar color, set by random-color
NAF.schemas.add({
template: '#avatar-template',
components: [
  'position',
  'rotation',
  {
    selector: '.head',
    component: 'material',
    property: 'color'
  }
]
});
// Define model schema for syncing model objects
NAF.schemas.add({
template: '#pokemon-model',
components: [
  'position',
  'rotation',
  'scale',
  {
    selector: '.model',
    component: 'material',
    property: 'color'
  }
]
});

function randomPointOnCircle(radius, angleRad) {
  x = Math.cos(angleRad)*radius;
  y = Math.sin(angleRad)*radius;
  return {x: x, y: y};
}

// Called by Networked-Aframe when connected to server
function onConnect(e) {
  // Get random angle
  var angleRad = Math.random()*Math.PI*2;

  // Get position around a circle
  var position = randomPointOnCircle(3, angleRad);
  var positionStr = position.x + ' 1.3 ' + position.y;

  // Get rotation towards center of circle
  var angleDeg = angleRad * 180 / Math.PI;
  var angleToCenter = -1 * angleDeg + 90;
  var rotationStr = '0 ' + angleToCenter + ' 0';

  // Create avatar with this position and rotation
  NAF.entities.createAvatar('#avatar-template', positionStr, rotationStr);
  NAF.connection.isConnected();
}

AFRAME.registerSystem('main', {
  schema: {},  // System schema. Parses into `this.data`.
  init: function () {
    // Called on scene initialization.

    //do stuff here after scene initializes

    var self = this;

    function checkConnected() {
      return new Promise(function (resolve, reject) {
        (function waitForConnection(){
          console.log('Waiting for connection...');
          if (NAF.connection.isConnected()) return resolve();
          setTimeout(waitForConnection, 500);
        })();
      });
    }

    checkConnected(function(){
      console.log('Connected to server. Can begin') ;
      self.beginNetwork();
    },function(e){
      console.log('An error ocurred',e);
    });

    var scene = document.querySelector('a-scene');
    // Attach scene events
  },

  beginNetwork: function() {
      console.log('Beginning network functionality...');
  }
});
