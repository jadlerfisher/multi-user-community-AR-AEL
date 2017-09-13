var buttonExists = true;
var shapes = ["a-box", "a-sphere", "a-circle", "a-cone", "a-plane", "a-ring", "a-torus", "a-torus-knot", "a-triangle"];
var shapeNames = ["box", "sphere", "circle", "cone", "plane", "ring", "torus", "torusKnot", "triangle"];
var itemNum = 0;
var models = ["obj: #pokemon-obj"];
var changes = [];

function init() {
    document.querySelector("a-scene").removeChild(document.getElementsByClassName("a-enter-vr")[0]);
    buttonExists = false;
}

function displayModel(i) {
  var scene = document.querySelector("a-scene");
  //creates model
  var model = document.createElement("a-entity");
  model.setAttribute("id", "item");
  model.setAttribute("class", "model");
  model.setAttribute("obj-model", models[i]);
  model.setAttribute('position', '0 1.25 -5');
  model.setAttribute("rotation", "-90 0 0");
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
      s.setAttribute('position', { x: direction === 'up' ? _x + 1 : _x - 1, y: _y, z: _z });
      if (!undoing) {
        if (direction === 'up') {
          changes.push(["move", "x", "down"]);
        } else {
          changes.push(["move", "x", "up"]);
        }
      }
      break;
    case "y":
      s.setAttribute('position', { x: _x, y: direction === 'up' ? _y + 1 : _y - 1, z: _z });
      if (!undoing) {
        if (direction === 'up') {
          changes.push(["move", "y", "down"]);
        } else {
          changes.push(["move", "y", "up"]);
        }
      }
      break;
    case "z":
      s.setAttribute('position', { x: _x, y: _y, z: direction === 'up' ? _z + 1 : _z - 1 });
      if (!undoing) {
        if (direction === 'up') {
          changes.push(["move", "z", "down"]);
        } else {
          changes.push(["move", "z", "up"]);
        }
      }
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

    if (!undoing) {
      changes.push(["rotate", degrees * -1]);
    }
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
    if (!undoing) {
      changes.push(["size", change * -1]);
    }
}

function update(jscolor) {
    // 'jscolor' instance can be used as a string
    var item = document.getElementById("item");
    if (item.getAttribute('class') === 'model') {
      //var objModel = item.getAttribute("obj-model").obj;
      //item.setAttribute("obj-model", "obj: objModel");
      item.setAttribute("material", "color: #" + jscolor);
    } else {
      item.setAttribute("color", '#' + jscolor);
    }
}
function setColor(col) {
    // 'jscolor' instance can be used as a string
    var item = document.getElementById("item");
    if (item.getAttribute("class") === "model") {
      item.setAttribute("material", "color: " + col);
    } else {
      item.setAttribute("color", col);
    }
}