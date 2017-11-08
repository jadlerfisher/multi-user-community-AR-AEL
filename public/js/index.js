var buttonExists = true; //The VR button exists
var shapes = ["a-box", "a-sphere", "a-circle", "a-cone", "a-plane", "a-ring", "a-torus", "a-torus-knot", "a-triangle"]; //All the possible shapes
var shapeNames = ["box", "sphere", "circle", "cone", "plane", "ring", "torus", "torusKnot", "triangle"]; //The shape class names
var itemNum = 0; //The id of the most recently created object
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
}

function chooseMaterial() {
  var item = document.getElementById("item");
  var obj = models[currentObj] + "; " + materials[currentObj];
  item.setAttribute("obj-model", obj);

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
      material: "color: #fff"
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

}

//Delete object
function disappear() {
  document.querySelector("a-scene").removeChild(document.getElementById("item"));
}

/**
 * moves the position of the entity in the direction if input 'direction'
 * @param {String} axis - 'x' or 'y'
 * @param {String} direction - 'up' or 'down'
*/
function move(axis, direction, undoing) {
  var s = document.getElementById("item");
  var scene = document.querySelector("a-scene");

  //create variables of current coordinate position of the sphere
  var _x = s.getAttribute('position').x;
  var _y = s.getAttribute('position').y;
  var _z = s.getAttribute('position').z;
  // change the coordinate position of the sphere based on input 'axis' in the direction of input 'direction'
  switch (axis) {
    case "x":
      s.setAttribute('position', { x: direction === 'up' ? _x + 0.2 : _x - 0.2, y: _y, z: _z });
      break;
    case "y":
      s.setAttribute('position', { x: _x, y: direction === 'up' ? _y + 0.2 : _y - 0.2, z: _z });
      break;
    case "z":
      s.setAttribute('position', { x: _x, y: _y, z: direction === 'up' ? _z + 0.2 : _z - 0.2 });
      break;
  }
}

/**
 * rotates the entity
 * @param {int} degrees turned
*/
function rotate(axis, degrees, undoing) {
   var s = document.getElementById("item");
  var scene = document.querySelector("a-scene");

  //create variables of current coordinate position of the sphere
  var _x = s.getAttribute('rotation').x;
  var _y = s.getAttribute('rotation').y;
  var _z = s.getAttribute('rotation').z;
  // change the coordinate position of the sphere based on input 'axis' in the direction of input 'direction'
  switch (axis) {
    case "x":
      s.setAttribute('rotation', { x: _x  + degrees, y: _y, z: _z });
      break;
    case "y":
      s.setAttribute('rotation', { x: _x, y: _y + degrees, z: _z });
      break;
    case "z":
      s.setAttribute('rotation', { x: _x, y: _y, z: _z + degrees});
      break;
  }
}

/**
 * resizes the entity
 * @param {int} amount changed
 */
function resize(change, undoing) {
    var s = document.getElementById("item");
    var scene = document.querySelector("a-scene");
    var sX = parseFloat(s.getAttribute("scale").x);
    var sY = parseFloat(s.getAttribute("scale").y);
    var sZ = parseFloat(s.getAttribute("scale").z);
    var sX_change = sX + change;
    var sY_change = sY + change;
    var sZ_change = sZ + change;
    if (!(sX_change <= 0) && !(sY_change <= 0) && !(sZ_change <= 0)) {
      s.setAttribute("scale", {x: sX_change, y: sY_change, z: sZ_change});
  }
}

//Changes the shape's color
function update(jscolor) {
    // 'jscolor' instance can be used as a string
    console.log(jscolor);
    var item = document.getElementById("item");
    if (item.getAttribute('class') === 'model') {
      //var objModel = item.getAttribute("obj-model").obj;
      //item.setAttribute("obj-model", "obj: objModel");
      item.setAttribute("material", "color: #" + jscolor);
      console.log(jsColor);
    } else {
      item.setAttribute("color", '#' + jscolor);
      console.log(jsColor);
    }
}

//Set shape color when undo is called
function setColor(col) {
    // 'jscolor' instance can be used as a string
    var item = document.getElementById("item");
    if (item.getAttribute("class") === "model") {
      item.setAttribute("material", "color: " + col);
    } else {
      item.setAttribute("color", col);
    }
}

//Set shape position when undo is called
function setPosition(_x,_y,_z) {
  var item = document.getElementById("item");
  item.setAttribute("position", {x: _x, y: _y, z: _z});
}

//Set shape size when undo is called
function setSize(sizeInfo) {
  var s = document.getElementById("item");
  var type = s.getAttribute("class");
  if (type === "model") {
    var sX_change = sizeInfo[0][0];
    var sY_change = sizeInfo[0][1];
    var sZ_change = sizeInfo[0][2];
    s.setAttribute("scale", {x: sX_change, y: sY_change, z: sZ_change});
  } else {
    var w_change = sizeInfo[0];
    var h_change = sizeInfo[1];
    var d_change = sizeInfo[2];
    console.log(w_change + " " + h_change + " " + d_change);
    // var r_change = sizeInfo[3];
    // var rB_change = sizeInfo[4];
    // var rT_change = sizeInfo[5];
    // var rI_change = sizeInfo[6];
    // var rO_change = sizeInfo[7];
    // var rT_change = sizeInfo[8];
    // var vertexA_change = sizeInfo[9];
    // var VertexB_change = sizeInfo[10];
    // var VertexC_change = sizeInfo[11];
    s.setAttribute('width', w_change);
    s.setAttribute('height', h_change);
    s.setAttribute('depth', d_change);
    // s.setAttribute('radius', r_change);
    // s.setAttribute('radiusBottom', rB_change);
    // s.setAttribute('radiusTop', rT_change);
    // s.setAttribute('raidusInner', rI_change);
    // s.setAttribute('radiusOuter', rO_change);
    // s.setAttribute('radiusTubular', rT_change);
    // s.setAttribute('VertexA', vertexA_change);
    // s.setAttribute('VertexB', VertexB_change);
    // s.setAttribute('VertexC', VertexC_change);
  }
}

//Set shape Rotation when undo is called
function setRotation(theta) {
  console.log("Set Rotation " + theta);
  var item = document.getElementById("item");
  var _x = item.getAttribute("rotation").x;
  var _z = item.getAttribute("rotation").z;
  item.setAttribute("rotation", {x: _x, y: theta, z: _z});
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
