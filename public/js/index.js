var buttonExists = true; //The VR button exists
var shapes = ["a-box", "a-sphere", "a-circle", "a-cone", "a-plane", "a-ring", "a-torus", "a-torus-knot", "a-triangle"]; //All the possible shapes
var shapeNames = ["box", "sphere", "circle", "cone", "plane", "ring", "torus", "torusKnot", "triangle"]; //The shape class names
// var itemNum = 0; //The id of the most recently created object
var models = ["#pokemon-model", "#box-model", "#ellipsoid-model", "#icosahedron-model", "#monkey_head-model", "#rectangular_prism-model",
              "#short_triangular_prism-model", "#sphere-model", "#square_pyramid-model", "#torus-model", "#torus2-model", "#torus3-model",
              "#torus4-model", "#triangle_pyramid-model", "#triangular_prism-model"]; //The various object models
var materials = ["mtl: #pokemon-mtl"];
var changes = []; //Changes that have been made in editing an object
var items = []; //List of all the ids of objects in the scene
var userColor;
var selectedItem = null; // current item that is selected
var currentObj = 0;
var colorMode = "color";
var defaultAnno = "N/A";

//Removes the VR button
function init() {
    userColor = randomColor();
    //document.querySelector("ar-scene").removeChild(document.getElementsByClassName("a-enter-vr")[0]);
    buttonExists = false;

    // fill in the gallery for adding models / entities

    var galleryList = [["gallery pokeball gaming", "displayModel(0)", "assets/images/pokeball.png", "pokeball"],
                      ["gallery box shapes cube", "displayModel(1)", "assets/images/cube.png", "box"],
                      ["gallery ellipsoid shapes oval", "displayModel(2)", "assets/images/ellipsoid.PNG", "ellipsoid-obj"],
                      ["gallery icosahedron shapes", "displayModel(3)", "assets/images/icosahedron.PNG", "icosahedron-obj"],
                      ["gallery monkey_head animals", "displayModel(4)", "assets/images/monkey_head.PNG", "monkey_head-obj"],
                      ["gallery rectangular_prism shapes cube", "displayModel(5)", "assets/images/rectangular_prism.PNG", "rectangular_prism-obj"],
                      ["gallery short_triangular_prism shapes", "displayModel(6)", "assets/images/short_triangular_prism.PNG", "short_triangular_prism-obj"],
                      ["gallery sphere shapes circle", "displayModel(7)", "assets/images/sphere.png", "sphere-obj"],
                      ["gallery square_pyramid shapes", "displayModel(8)", "assets/images/square_pyramid.PNG", "square_pyramid-obj"],
                      ["gallery torus shapes donut", "displayModel(9)", "assets/images/torus.png", "torus-obj"],
                      ["gallery torus2 shapes donut", "displayModel(10)", "assets/images/torus2.PNG", "torus2-obj"],
                      ["gallery torus3 shapes donut", "displayModel(11)", "assets/images/torus3.PNG", "torus3-obj"],
                      ["gallery torus4 shapes donut", "displayModel(12)", "assets/images/torus4.PNG", "torus4-obj"],
                      ["gallery triangle_pyramid shapes", "displayModel(13)", "assets/images/triangle_pyramid.PNG", "triangle_pyramid-obj"],
                      ["gallery triangular_prism shapes", "displayModel(14)", "assets/images/triangular_prism.PNG", "triangular_prism-obj"]];
    var categories = ['All', 'Shapes', 'Gaming', 'Animals'];
    var modelSources = [["pokemon-mtl", "https://raw.githubusercontent.com/argonjs/understanding-argon-twine/master/docs/models/pokemon-go/pokemon-go.mtl", "pokemon-obj", "https://raw.githubusercontent.com/argonjs/understanding-argon-twine/master/docs/models/pokemon-go/pokemon-go.obj", "pokemon-model"],
                        ["google-glass-mtl", "https://raw.githubusercontent.com/argonjs/understanding-argon-twine/master/docs/models/google-glass/google-glass.mtl", "google-glass-obj", "https://raw.githubusercontent.com/argonjs/understanding-argon-twine/master/docs/models/google-glass/google-glass.obj", "google-glass-model"]];
    //makeModelAssets(modelSources);
    fillDropDown(categories);
    for (i = 0; i < galleryList.length; i++) {
        galleryDetails = galleryList[i];
        createGalleryItem(galleryDetails[0], galleryDetails[1], galleryDetails[2], galleryDetails[3]);
    }

}

function makeModelAssets(modelSources) {
  var assets = document.querySelector("a-assets");

  for (i = 0; i < modelSources.length; i++) {
    var currentData = modelSources[i];
    var assetItem = document.createElement("a-asset-item");
    assetItem.setAttribute("id", currentData[0]);
    assetItem.setAttribute("src", currentData[1]);
    assets.appendChild(assetItem);

    assetItem = document.createElement("a-asset-item");
    assetItem.setAttribute("id", currentData[2]);
    assetItem.setAttribute("src", currentData[3]);
    assets.appendChild(assetItem);

    assetItem = document.createElement("script");
    assetItem.setAttribute("id", currentData[4]);
    assetItem.setAttribute("type", "text/html");

    var entity = document.createElement("a-entity");
    entity.setAttribute("class", "model");
    entity.setAttribute("obj-model", "obj: #" + currentData[2]);
    entity.setAttribute("position", "");
    entity.setAttribute("rotation", "");
    entity.setAttribute("scale", "");
    entity.setAttribute("material", "");
    entity.setAttribute("annotation", "");
    //entity.setAttribute("dynamic-body", "mass: 0");

    assetItem.appendChild(entity);
    assets.appendChild(assetItem);
  }

}

function chooseMaterial() {
  // var item = document.getElementById("item");
  // var obj = models[currentObj] + "; " + materials[currentObj];
  // item.setAttribute("obj-model", obj);

  colorMode = "material";
  removeEditingOptionsBox();
  createEditBox("color");
}
function chooseColor() {
  var item = document.getElementById("item");
  var obj = models[currentObj];
  item.setAttribute("obj-model", obj);
  console.log("changed");
  var material = item.getAttribute("material");
  console.log(material);

  colorMode = "color";
  removeEditingOptionsBox();
  createEditBox("color");
}

//Displays a Model
function createModel(i) {


  var objPos;

  if(isArgon){ // if user is in Argon
    objPos = {
      x: 0, y: 0, z: 0 // place model directly in middle of target
    };
  }

  else{

    /* CODE FOR DESKTOP */
    var player = document.querySelector("#player");
    var playerPos = new THREE.Vector3().copy(player.getAttribute('position'));
    var playerDir = new THREE.Vector3().copy(player.object3D.getWorldDirection());  

    var objPos = {
      x: playerPos.x - playerDir.x,
      y: playerPos.y - playerDir.y,
      z: playerPos.z - playerDir.z,

    };
  }
  var components = {
    position: objPos,
    rotation: '0 0 0',
    scale: '0.1 0.1 0.1',
    material: 'color: #FFF',
    annotation: ''
    //dynamic_body: 'mass: 0'

    //dynamic-body: 'mass: 0'
  };
  var currentUid = window.localStorage["uid"];
  console.log(i);
  console.log(models[i]);

  var networkId = NAF.entities.createEntityId();

  createModelWithComponents(currentUid, networkId, models[i], components);
}

function createModelWithComponents(uid, objectId, templateId, components) {
  var currentUid = window.localStorage["uid"];
  // Create network entity
  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: templateId,
    components: components
  };

  // Create local entity
  var entity = document.createElement('a-entity');
  entity.setAttribute('id', 'naf-' + entityData.networkId);
  if (NAF.options.useLerp) {
    entity.setAttribute('lerp', '');
  }

  var template = entityData.template;
  NAF.entities.setTemplate(entity, template);

  var components = NAF.entities.getComponents(template);
  NAF.entities.initPosition(entity, entityData.components);

  entity.setAttribute('position', entityData.components.position);
  entity.setAttribute('rotation', entityData.components.rotation);
  entity.setAttribute('scale', entityData.components.scale);
  entity.setAttribute('material', entityData.components.material);
  entity.setAttribute('annotation', entityData.components.annotation);
  //entity.setAttribute('dynamic-body', entityData.components.dynamicBody);

  NAF.entities.setNetworkData(entity, entityData, components);

  entity.initNafData = entityData;

  var scene = document.querySelector('#scene');
  scene.appendChild(entity);
  NAF.entities.entities[entityData.networkId] = entity;

  // Allow the creator to edit an object
  if (currentUid === uid) {
    entity.addEventListener('mouseenter', function(evt){
      setOpacity(this, 0.85);
      console.log('Mouse entered: ' + this.getAttribute('id'));
      revealButtons(document.getElementsByClassName('optionButton'));
      selectedItem = this;
    });

    entity.addEventListener('mouseleave', function(evt){
      setOpacity(this,1);
      console.log('Mouse left: ' + this.getAttribute('id'));
      hideButtons(document.getElementsByClassName('optionButton'));
      selectedItem = null;
    });
  }
   entity.addEventListener('mouseenter', function(evt){
      console.log('Mouse entered: ' + this.getAttribute('id'));
      var box = document.getElementById('annoBoxi');
      var oldAnno = document.getElementById('newAnno');
      if (oldAnno != null) {
        box.removeChild(oldAnno);
      }
      var txt = this.getAttribute('annotation');
      var newContent = document.createTextNode(txt);
      console.log(txt);
      if (txt === "undefined" || txt === "") {
        console.log('Mouse left: ' + this.getAttribute('id'));
      } else {
        setOpacity(this, 0.85);
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newAnno");
        newDiv.appendChild(newContent);
        box.appendChild(newDiv);
        revealAnnotation(document.getElementsByClassName('annotationObj'));
        selectedItem = this;
      }
    });

    entity.addEventListener('mouseleave', function(evt){
      setOpacity(this,1);
      console.log('Mouse left: ' + this.getAttribute('id'));
      var box = document.getElementById('annoBoxi');
      var oldAnno = document.getElementById('newAnno');
      if (oldAnno != null) {
        box.removeChild(oldAnno);
      }
      hideAnnotation(document.getElementsByClassName('annotationObj'));
      selectedItem = null;
    });

  // Set the current entity
  selectedItem = entity;

}

function setOpacity(object, value){
  var model = object.getElementsByClassName('model')[0];
  model.setAttribute('material','opacity',value);
}
function addAnnotationPress() {
  // Display the current annotation
  document.getElementById('userInput').value = selectedItem.getAttribute('annotation');
  stateChange('stateD');
}

//Delete object
function disappear() {
    // document.querySelector("a-scene").removeChild(document.getElementById("item"));
    var objectId = getObjectId();
    var object = NAF.entities.getEntity(objectId);
    object.setAttribute("dynamicbody", "mass: 5");
    //setTimeout(function(){
    console.log(objectId+ " was removed from scene.");
    NAF.entities.removeEntity(objectId);
    //NAF.entities.removeEntity(objectId);}, 5000);
  }

// Get the first object's id for now.
// TODO: need to pick an object from user selection

function getObjectId() {
  return selectedItem !== undefined ? selectedItem.id.replace('naf-', '') : null;
}

/**
 * moves the position of the entity in the direction
 * @param {String} axis - 'x' or 'y'
 * @param {String} value - +1 or -1
*/
function move(axis, value) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  var _xP = document.getElementById('player').getAttribute('position').x;
  var _yP = document.getElementById('player').getAttribute('position').y;
  var _zP = document.getElementById('player').getAttribute('position').z;
  var _xO = object.getAttribute('position').x;
  var _yO = object.getAttribute('position').y;
  var _zO = object.getAttribute('position').z;

  if (axis === "z") {
    value = (value/4) * -1;
    var _x = _xP + ((_xO - _xP) * (1 + value));
    var _y = _yO;
    var _z = _zP + ((_zO - _zP) * (1 + value));
    object.setAttribute('position', {x: _x, y: _y, z: _z});
  } else if (axis === "x") {
    var _y = _yO;
    var _x = _xO;
    var _z = _zO;
    //Circle = (_xO - _xP)^2 + (_yO - _yP)^2 = r^2
    var r = Math.sqrt(Math.pow((_xO - _xP), 2) + Math.pow((_zO - _zP), 2));
    var a = Math.atan2(_zO - _zP, _xO - _xP);
    a += (value * Math.PI)/12;
    _x = (_xP + r * Math.cos(a));
    _z = (_zP + r * Math.sin(a));
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

/**
 * rotates the entity
 * @param {String} axis - 'x' or 'y'
 * @param {int} degrees turned
*/
function rotate(axis, degrees) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  var _xP = document.getElementById('player').getAttribute('position').x;
  var _yP = document.getElementById('player').getAttribute('position').y;
  var _zP = document.getElementById('player').getAttribute('position').z;
  var _xO = object.getAttribute('position').x;
  var _yO = object.getAttribute('position').y;
  var _zO = object.getAttribute('position').z;

  var _xPR = document.getElementById('player').getAttribute('rotation').x;
  var _yPR = document.getElementById('player').getAttribute('rotation').y;
  var _zPR = document.getElementById('player').getAttribute('rotation').z;
  var _xOR = object.getAttribute('rotation').x;
  var _yOR = object.getAttribute('rotation').y;
  var _zOR = object.getAttribute('rotation').z;
  console.log(_xO + " " + _yO + " " + _zO);
  console.log(axis);

  if (axis === "z") {
    // var _y = _yOR;
    // var _x = _xOR;
    // var _z = _zOR;

    // var r = Math.sqrt(Math.pow((_xO - _xP), 2) + Math.pow((_zO - _zP), 2));
    // var a = Math.atan2(_zO - _zP, _xO - _xP);
    // var x_amount = Math.cos(a);
    // var z_amount = Math.sin(a);
    // _x = _x + (degrees*x_amount);
    // _z = _z + (degrees*z_amount);
    var _y = _yOR;
    var _x = _xOR;
    var _z = _zOR +  degrees;
  } else if (axis === "x") {
    //  var _y = _yOR;
    // var _x = _xOR;
    // var _z = _zOR;

    // var r = Math.sqrt(Math.pow((_xO - _xP), 2) + Math.pow((_zO - _zP), 2));
    // var a = Math.atan2(_zO - _zP, _xO - _xP);
    // var x_amount = Math.sin(a);
    // var z_amount = Math.cos(a);
    // _x = _x + (degrees*x_amount);
    // _z = _z + (degrees*z_amount);

    var _y = _yOR;
    var _x = _xOR + degrees;
    var _z = _zOR;
  } else {
    // Update position
    var _y = _yOR + degrees;
    var _x = _xOR;
    var _z = _zOR;
  }
  object.setAttribute('rotation', {x: _x, y: _y, z: _z});

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: { rotation: object.getAttribute('rotation') }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

/**
 * rotates the entity
 * @param {int} amount resized
*/
function scale(amount) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  var _x = object.getAttribute('scale').x;
  var _y = object.getAttribute('scale').y;
  var _z = object.getAttribute('scale').z;
  if (_x + amount <= 0 || _y + amount <= 0 || _z + amount <= 0) {
    amount = 0;
  }
  object.setAttribute('scale', {x: _x + amount, y: _y + amount, z: _z + amount});

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: { scale: object.getAttribute('scale') }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);

}

/**
 * Changes the shape's color
 * This function gets called every time a user picks a color from color palette
 * @param {String} jscolor an object of jscolor
 */
// function update(jscolor) {
//   var objectId = getObjectId();
//   var object = NAF.entities.getEntity(objectId);
//   var newColor = jscolor.toHEXString();
//   object.setAttribute('material','color', newColor);

//   var entityData = {
//     networkId: objectId,
//     owner: NAF.clientId,
//     template: "#pokemon-model",
//     components: {
//       material: 'color: ' + object.getAttribute('material').color
//     }
//   };

//   NAF.entities.updateEntity(NAF.clientId, null, entityData);
// }

//Set shape color when undo is called
function setColor(col) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);
  var model = object.getElementsByClassName('model')[0];
  model.setAttribute('material','color', col);

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: {
      material: 'color: ' + model.getAttribute('material').color
    }
  };

  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

//Set shape position when undo is called
function setPosition(_x, _y, _z) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template:object.getAttribute("template").src,
    components: { position: {x: _x, y: _y, z: _z} }
  };

  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

//Set shape size when undo is called
function setSize(_x,_y,_z) {
  console.log(_x + " " + _y + " " + _z);
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  object.setAttribute('scale', {x: _x, y: _y, z: _z});

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: { scale: object.getAttribute('scale') }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

//Set shape Rotation when undo is called
function setRotation(rotationInfo) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);
  var _x = rotationInfo[0];
  var _z = rotationInfo[2];
  var _y = rotationInfo[1];

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: { rotation: {x: _x, y: _y, z: _z} }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

//Creates a new model based on inputed URL from user
function createNewModel(text) {
  var assets = document.querySelector("a-assets");
  var asset = document.createElement("a-asset-item");
  asset.setAttribute("id", "newModel");
  asset.setAttribute("src", text);
  assets.appendChild(asset);

  var sc = document.createElement("script");
  sc.setAttribute("id", "newModel");
  sc.setAttribute("type", "text/html");

  var entity = document.createElement("a-entity");
  entity.setAttribute("class", "model");
  entity.setAttribute("obj-model", "obj: #newModel");
  entity.setAttribute("position", "");
  entity.setAttribute("rotation", "");
  entity.setAttribute("scale", "");
  entity.setAttribute("material", "");
  entity.setAttribute("annotation", "");

  sc.appendChild(entity);
  assets.appendChild(sc);

  var model_len = models.length;
  //models.push("#" + text);
  models.push("#newModel");

  createModel(model_len);
}

//Removes item based on its id #
function removeItem(i) {
  var scene = document.querySelector("#frame");
  scene.removeChild(document.getElementById(i));
  var index = items.indexOf(i);
  items.splice(index, 1);
  removeButtons();
  createSummonButton();
  createRemoveButton();
}
//Change color for each user
function randomColor() {
 var r = Math.floor(Math.random() * 256);
 var g = Math.floor(Math.random() * 256);
 var b = Math.floor(Math.random() * 256);
 var newCol = "rgb(" + r + ", " + g + ", " + b + ")";
 return newCol;
}

function removeItems(i) {
  var scene = document.querySelector("#frame");
  scene.removeChild(document.getElementById(i));
  var index = items.indexOf(i);
  items.splice(index, 1);
 }

function removeAll() {
  var scene = document.querySelector("#frame");
  console.log('length is', items.length);


  var numOfItems = items.length;

  // for (var i = 0; i < items.length; i++) {
    for (var i = 0; i < numOfItems; i++) {
    console.log('removed item', items[i]);
    console.log('removed number', i);
    // removeItems(items[i]);
    removeItems(i);
  }
  items = [];
  itemNum = 0; // reset item numbering
}

function gravityAll() {
  var scene = document.querySelector("#frame");
  for (var i = 0; i < items.length; i++) {
    var item = document.getElementById(items[i])
    item.setAttribute("dynamic-body", "mass: 5");
    console.log('gravity number', i);
  }

  setTimeout(removeAll, 5000);

}

function hideCursor() {
  var camera = document.getElementById('player');
  camera.removeChild(document.getElementById('cursor'));
}

function revealCursor(){
  var camera = document.getElementById('player');
  var cursor = document.createElement('a-entity');
  cursor.setAttribute('cursor','true')
  cursor.setAttribute('id', "cursor");
  cursor.setAttribute('geometry','primitive: ring; radiusInner: 0.01; radiusOuter: 0.016');
  cursor.setAttribute('material', "color: #EEE");
  cursor.setAttribute('position', "0 0 -0.1");
  cursor.setAttribute('scale', "0.1 0.1 0.1");

  camera.appendChild(cursor);
}


// Hide buttons
function hideButtons(btnList){
  for(var i = 0; i < btnList.length; i++){
    if(!btnList[i].classList.contains('hide-button')){
      btnList[i].classList.add("hide-button");
    }
  }
}

// Hide annotation
function hideAnnotation(annList){
  for(var i = 0; i < annList.length; i++){
    if(!annList[i].classList.contains('hide-annotation')){
      annList[i].classList.add("hide-annotation");
    }
  }
}

// Reveal Buttons
function revealButtons(btnList){
  for(var i = 0; i < btnList.length; i++){
    if(btnList[i].classList.contains('hide-button')){
      btnList[i].classList.remove("hide-button");
    }
  }
}

// Reveal Annotation
function revealAnnotation(annList){
  for(var i = 0; i < annList.length; i++){
    if(annList[i].classList.contains('hide-annotation')){
      annList[i].classList.remove("hide-annotation");
    }
  }
}

function hideElements(eList){
  for(var i = 0; i < eList.length; i++){
        eList[i].classList.add("hide-element");
  }
}

function revealElements(eList){
  for(var i = 0; i < eList.length; i++){
        eList[i].classList.remove("hide-element");
  }
}

function hideTable(table){
 table.classList.add("hide-table");
}

function revealTable(table){
  table.classList.remove("hide-table");
}

function hideCenter(center){
  center.classList.add("hide-center");
}

function revealCenter(center){
  center.classList.remove("hide-center");
}


function multiplyMatrix(a,b) {
    //Separating Rows of First Matrix
    var row1A = a[0];
    var row2A = a[1];
    var row3A = a[2];
    var row4A = a[3];

    //Separating Rows of Second Matrix
    var row1B = b[0];
    var row2B = b[1];
    var row3B = b[2];
    var row4B = b[3];

    //Finding first Row of new Matrix
    var spot1 = (row1A[0]*row1B[0]) + (row1A[1]*row2B[0]) + (row1A[2]*row3B[0]) + (row1A[3]*row4B[0]);
    var spot2 = (row1A[0]*row1B[1]) + (row1A[1]*row2B[1]) + (row1A[2]*row3B[1]) + (row1A[3]*row4B[1]);
    var spot3 = (row1A[0]*row1B[2]) + (row1A[1]*row2B[2]) + (row1A[2]*row3B[2]) + (row1A[3]*row4B[2]);
    var spot4 = (row1A[0]*row1B[3]) + (row1A[1]*row2B[3]) + (row1A[2]*row3B[3]) + (row1A[3]*row4B[3]);
    var row1C = [spot1, spot2, spot3, spot4];

    //Finding second Row of new Matrix
    spot1 = (row2A[0]*row1B[0]) + (row2A[1]*row2B[0]) + (row2A[2]*row3B[0]) + (row2A[3]*row4B[0]);
    spot2 = (row2A[0]*row1B[1]) + (row2A[1]*row2B[1]) + (row2A[2]*row3B[1]) + (row2A[3]*row4B[1]);
    spot3 = (row2A[0]*row1B[2]) + (row2A[1]*row2B[2]) + (row2A[2]*row3B[2]) + (row2A[3]*row4B[2]);
    spot4 = (row2A[0]*row1B[3]) + (row2A[1]*row2B[3]) + (row2A[2]*row3B[3]) + (row2A[3]*row4B[3]);
    var row2C = [spot1, spot2, spot3, spot4];

    //Finding third Row of new Matrix
    spot1 = (row3A[0]*row1B[0]) + (row3A[1]*row2B[0]) + (row3A[2]*row3B[0]) + (row3A[3]*row4B[0]);
    spot2 = (row3A[0]*row1B[1]) + (row3A[1]*row2B[1]) + (row3A[2]*row3B[1]) + (row3A[3]*row4B[1]);
    spot3 = (row3A[0]*row1B[2]) + (row3A[1]*row2B[2]) + (row3A[2]*row3B[2]) + (row3A[3]*row4B[2]);
    spot4 = (row3A[0]*row1B[3]) + (row3A[1]*row2B[3]) + (row3A[2]*row3B[3]) + (row3A[3]*row4B[3]);
    var row3C = [spot1, spot2, spot3, spot4];

    //Finding fourth Row of new Matrix
    spot1 = (row4A[0]*row1B[0]) + (row4A[1]*row2B[0]) + (row4A[2]*row3B[0]) + (row4A[3]*row4B[0]);
    spot2 = (row4A[0]*row1B[1]) + (row4A[1]*row2B[1]) + (row4A[2]*row3B[1]) + (row4A[3]*row4B[1]);
    spot3 = (row4A[0]*row1B[2]) + (row4A[1]*row2B[2]) + (row4A[2]*row3B[2]) + (row4A[3]*row4B[2]);
    spot4 = (row4A[0]*row1B[3]) + (row4A[1]*row2B[3]) + (row4A[2]*row3B[3]) + (row4A[3]*row4B[3]);
    var row4C = [spot1, spot2, spot3, spot4];


    return [row1C,row2C,row3C,row4C];
  }

function move1(axis, value) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);
  var _y = _yO + 2;
  var _x = _xO;
  var _z = _zO;
  object.setAttribute('position', {x: _x, y: _y, z: _z});
  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: object.getAttribute("template").src,
    components: { position: object.getAttribute('position') }
  };

  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}
