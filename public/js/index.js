var buttonExists = true; //The VR button exists
var shapes = ["a-box", "a-sphere", "a-circle", "a-cone", "a-plane", "a-ring", "a-torus", "a-torus-knot", "a-triangle"]; //All the possible shapes
var shapeNames = ["box", "sphere", "circle", "cone", "plane", "ring", "torus", "torusKnot", "triangle"]; //The shape class names
var itemNum = 0; //The id of the most recently created object
var models = ["obj: #pokemon-obj", "obj: #cup-obj"]; //The various object models
var changes = []; //Changes that have been made in editing an object
var items = []; //List of all the ids of objects in the scene

//Removes the VR button
function init() {
    document.querySelector("a-scene").removeChild(document.getElementsByClassName("a-enter-vr")[0]);
    buttonExists = false;
}


//Displays a Model
function displayModel(i) {
  var scene = document.querySelector("a-scene");
  //creates model
  var model = document.createElement("a-entity");
  model.setAttribute("id", "item");
  model.setAttribute("class", "model");
  model.setAttribute("obj-model", models[i]);
  model.setAttribute('position', '0 1.25 -5');
  model.setAttribute("rotation", "0 0 0");
  model.setAttribute("scale", "1 1 1");
  model.setAttribute("material", "color: #0000FF");
  scene.appendChild(model);
}

/**
 * Displays the object on the screen
*/
function display(i) {
    var scene = document.querySelector("a-scene");
    var body = document.querySelector("center");

    var item = document.createElement(shapes[i]);
    item.setAttribute('id', "item");
    item.setAttribute('class', shapeNames[i]);
    item.setAttribute('position', "0 1.25 -5");
    item.setAttribute('height', 1);
    item.setAttribute('width', 1);
    item.setAttribute('depth', 1);
    item.setAttribute('radius', 1);
    item.setAttribute('radiusTop', 1);
    item.setAttribute('radiusBottom', 2);
    item.setAttribute('radiusInner', 1);
    item.setAttribute('radiusOuter', 2);
    item.setAttribute('radiusTubular', 0.5);
    item.setAttribute('VertexA', "0 0 -5");
    item.setAttribute('VertexB', "1 1 -6");
    item.setAttribute('VertexC', "-1 2 -5.5")
    item.setAttribute('color', "#0000FF");
    scene.appendChild(item);
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
function moveSphere(axis, direction, undoing) {
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
function rotateSphere(degrees, undoing) {
    var s = document.getElementById("item");
    var scene = document.querySelector("a-scene");

    //create variables of current coordinate position of the sphere
    var _y = s.getAttribute('rotation').y;
    var _x = s.getAttribute('rotation').x;
    var _z = s.getAttribute('rotation').z;
    s.setAttribute('rotation', { x: _x, y: _y + degrees, z: _z });
}

/**
 * resizes the entity
 * @param {int} amount changed
 */
function resizeSphere(change, undoing) {
    var s = document.getElementById("item");
    var scene = document.querySelector("a-scene");
    var type = s.getAttribute("class");
    if (type === "box") {
      var w = parseFloat(s.getAttribute('width'));
      var w_change = w + change;
      var h = parseFloat(s.getAttribute("height"));
      var h_change = h + change;
      var d = parseFloat(s.getAttribute('depth'));
      var d_change = d + change;
      if (!(w_change <= 0) && !(h_change <= 0) && !(d_change <= 0)) {
        s.setAttribute('width', w_change);
        s.setAttribute('height', h_change);
        s.setAttribute('depth', d_change);
      }
    } else if (type === "circle"  || type === "dodecahedron"  || type === "octahedron" || type === "sphere" || type === "tetrahedron") {
      var r = parseFloat(s.getAttribute('radius'));
      var r_change = r + change;
      if (!(r_change <= 0)) {
        s.setAttribute('radius', r_change);
      }
    } else if (type === "cone") {
      var rB_change = parseFloat(s.getAttribute('radiusBottom')) + change;
      var rT_change = parseFloat(s.getAttribute('radiusTop')) + change;
      var h_change = parseFloat(s.getAttribute('height')) + change;
      if (!(rB_change <= 0) && !(rT_change <= 0) && !(h_change <= 0)) {
        s.setAttribute('radiusBottom', rB_change);
        s.setAttribute('radiusTop', rT_change);
        s.setAttribute('height', h_change);
      }
    } else if (type === "cylinder") {
      var r = parseFloat(s.getAttribute('radius'));
      var r_change = r + change;
      var h = parseFloat(s.getAttribute('height'));
      var h_change = h + change;
      if (!(r_change <= 0) && !(h_change)) {
        s.setAttribute('radius', r_change);
        s.setAttribute('height', h_change);
      }
    } else if (type === "plane") {
      var w = parseFloat(s.getAttribute('width'));
      var w_change = w + change;
      var h = parseFloat(s.getAttribute('height'));
      var h_change = h + change;
      if (!(w_change <= 0) && !(h_change <= 0)) {
        s.setAttribute('width', w_change);
        s.setAttribute('height', h_change);
      }
    } else if (type === "ring") {
      var rI = parseFloat(s.getAttribute('radiusInner'));
      var rI_change = rI + change;
      var rO = parseFloat(s.getAttribute('radiusOuter'));
      var rO_change = rO + change;
      if (!(rI_change <= 0) && !(rO_change <= 0)) {
        s.setAttribute('raidusInner', rI_change);
        s.setAttribute('radiusOuter', rO_change);
      }
    } else if (type === "torus" || type === "torusKnot") {
      var r = parseFloat(s.getAttribute('radius'));
      var r_change = r + change;
      var rT = parseFloat(s.getAttribute('radiusTubular'));
      var rT_change = rT + change;
      if (!(r_change <= 0) && !(rT_change <= 0)) {
        s.setAttribute('radius', r_change);
        s.setAttribute('radiusTubular', rT_change);
      }
    } else if (type === "triangle") {
      var _x = parseFloat(s.getAttribute('VertexA').x);
      var _y = parseFloat(s.getAttribute("VertexA").y);
      var _z = parseFloat(s.getAttribute("VertexA").z);
      if (change > 0) {
        _x = _x * 1.1;
        _y = _y * 1.1;
        _z = _z * 1.1;
      } else {
        _x = _x / 1.1;
        _y = _y / 1.1;
        _z = _z / 1.1;
      }
      s.setAttribute('VertexA', {x:_x, y: _y, z: _z});
      _x = parseFloat(s.getAttribute('VertexB').x);
      _y = parseFloat(s.getAttribute("VertexB").y);
      _z = parseFloat(s.getAttribute("VertexB").z);
      if (change > 0) {
        _x = _x * 1.1;
        _y = _y * 1.1;
        _z = _z * 1.1;
      } else {
        _x = _x / 1.1;
        _y = _y / 1.1;
        _z = _z / 1.1;
      }
      s.setAttribute('VertexB', {x:_x, y: _y, z: _z});
      _x = parseFloat(s.getAttribute('VertexC').x);
      _y = parseFloat(s.getAttribute("VertexC").y);
      _z = parseFloat(s.getAttribute("VertexC").z);
      if (change > 0) {
        _x = _x * 1.1;
        _y = _y * 1.1;
        _z = _z * 1.1;
      } else {
        _x = _x / 1.1;
        _y = _y / 1.1;
        _z = _z / 1.1;
      }
      s.setAttribute('VertexC', {x:_x, y: _y, z: _z});
    } else if (type === "model") {
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
}

//Changes the shape's color
function update(jscolor) {
    // 'jscolor' instance can be used as a string
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
    var sX = sizeInfo[0][0];
    var sY = sizeInfo[0][1];
    var sZ = sizeInfo[0][2];
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
  removeButtons();
  createSummonButton();
  createRemoveButton();
}
