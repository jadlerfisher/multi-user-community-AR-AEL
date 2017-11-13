var buttonExists = true; //The VR button exists
var shapes = ["a-box", "a-sphere", "a-circle", "a-cone", "a-plane", "a-ring", "a-torus", "a-torus-knot", "a-triangle"]; //All the possible shapes
var shapeNames = ["box", "sphere", "circle", "cone", "plane", "ring", "torus", "torusKnot", "triangle"]; //The shape class names
// var itemNum = 0; //The id of the most recently created object
var models = ["#pokemon-model"]; //The various object models
var materials = ["mtl: #pokemon-mtl"];
var changes = []; //Changes that have been made in editing an object
var items = []; //List of all the ids of objects in the scene
var userColor;
var selectedItem; // current item that is selected
var currentObj = 0;
var colorMode = "color";

//Removes the VR button
function init() {
    userColor = randomColor();
    //document.querySelector("ar-scene").removeChild(document.getElementsByClassName("a-enter-vr")[0]);
    buttonExists = false;

    // fill in the gallery for adding models / entities

    var galleryList = [["gallery pokeball gaming", "displayModel(0)", "assets/images/pokeball.png", "pokeball"]];
    var categories = ['All', 'Shapes', 'Gaming', 'Animals', 'Food', 'New Category'];
    fillDropDown(categories);
    for (i = 0; i < galleryList.length; i++) {
        galleryDetails = galleryList[i];
        createGalleryItem(galleryDetails[0], galleryDetails[1], galleryDetails[2], galleryDetails[3]);
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
  var pos = {
    x: 0, y: 0, z: 0
  }

  // Create network entity
  var networkId = NAF.entities.createEntityId();
  NAF.log.write('Created network entity', networkId);
  var entityData = {
    networkId: networkId,
    owner: NAF.clientId,
    template: models[i],
    components: {
      position: '0 0 0',
      rotation: '0 0 0',
      scale: '1 1 1',
    }
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

  NAF.entities.setNetworkData(entity, entityData, components);

  entity.initNafData = entityData;

  var scene = document.querySelector('a-scene');
  scene.appendChild(entity);
  NAF.entities.entities[entityData.networkId] = entity;

  entity.addEventListener('mouseenter', function(evt){
    this.setAttribute('material','opacity','0.85');
    console.log('Mouse entered: ' + this.getAttribute('id'));
    revealButtons(document.getElementsByClassName('optionButton'));
    selectedItem = this;
  });

  entity.addEventListener('mouseleave', function(evt){
    this.setAttribute('material','opacity','1.0');
    console.log('Mouse left: ' + this.getAttribute('id'));
    hideButtons(document.getElementsByClassName('optionButton'));
    selectedItem = [];
  });

  items.push(entity.getAttribute('id'));
  console.log('Make sure entity id leaves "items" array when removing');
}

//Delete object
function disappear() {
  document.querySelector("a-scene").removeChild(document.getElementById("item"));
}

// Get the first object's id for now.
// TODO: need to pick an object from user selection
function getObjectId() {
  var objectId = document.getElementsByClassName('model')[0].parentNode.id.replace('naf-', '');
  return objectId;
}

/**
 * moves the position of the entity in the direction
 * @param {String} axis - 'x' or 'y'
 * @param {String} value - +1 or -1
*/
function move(axis, value, undoing) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  // Update position
  object.getAttribute('position')[axis] += value;

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: "#pokemon-model",
    components: { position: object.getAttribute('position') }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

/**
 * rotates the entity
 * @param {String} axis - 'x' or 'y'
 * @param {int} degrees turned
*/
function rotate(axis, degrees, undoing) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  // Update rotation
  object.getAttribute('rotation')[axis] += degrees;

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: "#pokemon-model",
    components: { rotation: object.getAttribute('rotation') }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

/**
 * resizes the entity
 * @param {int} value changed
 */
function resize(value, undoing) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

    // Update scale
    object.getAttribute('scale').x += value;
    object.getAttribute('scale').y += value;
    object.getAttribute('scale').z += value;

    var entityData = {
      networkId: objectId,
      owner: NAF.clientId,
      template: "#pokemon-model",
      components: { scale: object.getAttribute('scale') }
    };

    if (object.getAttribute('scale').x > 0) {
      NAF.entities.updateEntity(NAF.clientId, null, entityData);
  }
}

/**
 * Changes the shape's color
 * This function gets called every time a user picks a color from color palette
 * @param {String} jscolor an object of jscolor
 */
function update(jscolor) {
  var objectId = getObjectId();
  var object = NAF.entities.getEntity(objectId);

  var entityData = {
    networkId: objectId,
    owner: NAF.clientId,
    template: "#pokemon-model",
    components: {
      material: 'color: ' + jscolor.toHEXString(),
    }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

//Set shape color when undo is called
function setColor(col) {
    // 'jscolor' instance can be used as a string
    var objectId = getObjectId();
    var item = NAF.entities.getEntity(objectId);
    if (item.getAttribute("class") === "model") {
      item.setAttribute("material", "color: " + col);
    } else {
      item.setAttribute("color", col);
    }
}

//Set shape position when undo is called
function setPosition(_x,_y,_z) {
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  item.setAttribute("position", {x: _x, y: _y, z: _z});
}

//Set shape size when undo is called
function setSize(sizeInfo) {
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var sX_change = sizeInfo[0][0];
  var sY_change = sizeInfo[0][1];
  var sZ_change = sizeInfo[0][2];
  s.setAttribute("scale", {x: sX_change, y: sY_change, z: sZ_change});
}

//Set shape Rotation when undo is called
function setRotation(rotationInfo) {
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var _x = rotationInfo[0];
  var _z = rotationInfo[2];
  var _y = rotationInfo[1];
  item.setAttribute("rotation", {x: _x, y: _y, z: _z});
}

//Creates a new model based on inputed URL from user
function createNewModel(text) {
  var assets = document.querySelector("a-assets");
  var asset = document.createElement("a-asset-item");
  asset.setAttribute("id", "new-obj");
  asset.setAttribute("src", text);
  assets.appendChild(asset);

  var scene = document.querySelector("a-scene");
  //creates model
  var model = document.createElement("a-entity");
  model.setAttribute("id", "item");
  model.setAttribute("class", "model");
  model.setAttribute("obj-model", "obj: #new-obj");
  model.setAttribute('position', '0 1.25 -5');
  model.setAttribute("rotation", "0 0 0");
  model.setAttribute("scale", "1 1 1");
  model.setAttribute("material", "color: #0000FF");
  scene.appendChild(model);
}

//Removes item based on its id #
function removeItem(i) {
  var scene = document.querySelector("a-scene");
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
  var scene = document.querySelector("a-scene");
  scene.removeChild(document.getElementById(i));
  var index = items.indexOf(i);
  items.splice(index, 1);
 }

function removeAll() {
  var scene = document.querySelector("a-scene");
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
  var scene = document.querySelector("a-scene");
  for (var i = 0; i < items.length; i++) {
    var item = document.getElementById(items[i])
    item.setAttribute("dynamic-body", "mass: 5");
    console.log('gravity number', i);
  }

  setTimeout(removeAll, 5000);

}

function hideCursor(){
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
  cursor.setAttribute('position', "0 0 -1");

  camera.appendChild(cursor);
}


// Hide buttons
function hideButtons(btnList){
  for(var i = 0; i < btnList.length; i++){
        btnList[i].classList.add("hide-button");
  }
}

// Reveal Buttons
function revealButtons(btnList){
  for(var i = 0; i < btnList.length; i++){
        btnList[i].classList.remove("hide-button");
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
