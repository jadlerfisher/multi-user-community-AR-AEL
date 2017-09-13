var buttonExists = true;
var shapes = ["a-box", "a-sphere", "a-circle", "a-cone", "a-plane", "a-ring", "a-torus", "a-torus-knot", "a-triangle"];
var shapeNames = ["box", "sphere", "circle", "cone", "plane", "ring", "torus", "torusKnot", "triangle"];
var itemNum = 0;
var models = ["obj: #pokemon-obj; mtl: #pokemon-mtl"];
var changes = [];

function init() {
    document.querySelector("a-scene").removeChild(document.getElementsByClassName("a-enter-vr")[0]);
    buttonExists = false;
}

//1) Remove: +, Add: Edit, Undo, Delete, Finish, Also: Display Sphere
//Handles Summon Button Press
function summonButtonPress() {
    removeSummmon();
    createAddButtons();
    if (buttonExists) {
      init();
    }
}

function shapeButtonPress(i) {
  removeButtons();
  createOptions();
  display(i);
}

//Removes the Summon Button
function removeSummmon() {
    document.querySelector("center").removeChild(document.getElementsByClassName("buttonSummon")[0]);
}
//Create Add Buttons
function createAddButtons() {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var body = document.querySelector("center");

  //Models Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "modelButtonPress1()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Models";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Shapes Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress1()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Shapes";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  table.appendChild(row);
  table.setAttribute("id", "buttonTable");
  body.appendChild(table);
}

function modelButtonPress1() {
  removeButtons();
  createModelButtons();
}

function shapeButtonPress1() {
  removeButtons();
  createShapeButtons();
}

//Adds Model Buttons
function createModelButtons() {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var body = document.querySelector("center");

  //Models Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "modelButtonPress(0)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Pokeball";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Shapes Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "addNewModelButtonPress()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Add New Model";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  table.appendChild(row);
  table.setAttribute("id", "buttonTable");
  body.appendChild(table);
}

function modelButtonPress(i) {
  removeButtons();
  createOptions();
  displayModel(i);
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
  scene.appendChild(model);
}

//Adds Shape Buttons
function createShapeButtons() {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var row2 = document.createElement("tr");
  var row3 = document.createElement("tr");
  var body = document.querySelector("center");

  //Box Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(0)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Box";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Sphere Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(1)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Sphere";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Circle Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(2)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Circle";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Cone Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(3)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Cone";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  //Plane Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(4)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Plane";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  //Model Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(5)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Model";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  //Torus Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(6)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Torus";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row3.appendChild(cell);

  //Torus Knot Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(7)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Torus Knot";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row3.appendChild(cell);

  //Triangle Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "shapeButtonPress(8)");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton");
  button.innerText = "Triangle";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row3.appendChild(cell);

  table.appendChild(row);
  table.appendChild(row2);
  table.appendChild(row3);
  table.setAttribute("id", "buttonTable");
  body.appendChild(table);
}

//Add Edit, Undo, Delete, Finish
function createOptions() {
    //Options
    var table = document.createElement("table");
    var row = document.createElement("tr");
    var body = document.querySelector("center");

    //Finish Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "finishButtonPress1()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "finishButton");
    button.innerText = "Finish";
    body.appendChild(button);

    //Edit Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "editButtonPress()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "optionButton editButton");
    button.innerText = "Edit";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    //Undo Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "undoButtonPress()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "optionButton undoButton");
    button.innerText = "Undo";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    //Delete Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "deleteButtonPress()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "optionButton deleteButton");
    button.innerText = "Delete";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    table.appendChild(row);
    table.setAttribute("id", "buttonTable");
    body.appendChild(table);
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

//2)Remove Edit, Undo, Delete, Finish
function finishButtonPress1() {
    removeButtons();
    var item = document.getElementById("item");
    item.setAttribute("id", itemNum);
    itemNum++;
    createSummonButton();
}
 
function removeButtons() {
    var center = document.querySelector("center");
    var buttonTable = document.getElementById("buttonTable");
    if (buttonTable != null) {
        center.removeChild(buttonTable);
    }
    var finishButton = document.getElementsByClassName("finishButton");
    if (finishButton.length > 0){
      center.removeChild(finishButton[0]);
    }
}

//3) Add: +, Remove: Edit, Undo, Delete, Finish, Also: Delete Sphere
function deleteButtonPress() {
    removeButtons();
    createSummonButton();
    disappear();
}

//Creates the + button
function createSummonButton() {
    var center = document.querySelector("center");
    var button = document.createElement("button");
    button.setAttribute("onclick", "summonButtonPress()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "buttonSummon");
    button.innerText = "+";
    center.appendChild(button);
}

//Delete object
function disappear() {
  document.querySelector("a-scene").removeChild(document.getElementById("item"));
}

//4)Undo
//Undo most recent edit
function undoButtonPress() {
  console.log("Undo!");
  if (changes.length > 0) {
    var lastMove = changes.pop(changes.length - 1);
    if (lastMove[0] === "move") {
      moveSphere(lastMove[1], lastMove[2], true);
    } else if (lastMove[0] === "rotate") {
      rotateSphere(lastMove[1], true);
    } else if (lastMove[0] === "size") {
      resizeSphere(lastMove[1], true);
    }
  }
}

//5) Add: Move, Rotate, Size, Color, Finish, Remove: Edit, Delete, Undo, Finish
function editButtonPress() {
    removeButtons();
    createEditButtons();
}

//Creates Buttons to edit current object: location, rotation, size, color
function createEditButtons() {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var row2 = document.createElement("tr");
  var body = document.querySelector("center");

  //Finish Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "finishButtonPress2()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "finishButton");
  button.innerText = "Finish";
  body.appendChild(button);

  var button = document.createElement("button");
  button.setAttribute("onclick", "moveButtonPress()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "moveButton");
  button.innerText = "Move";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  var button = document.createElement("button");
  button.setAttribute("onclick", "rotateButtonPress()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "rotateButton");
  button.innerText = "Rotate";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);
  table.appendChild(row);

  var button = document.createElement("button");
  button.setAttribute("onclick", "sizeButtonPress()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "sizeButton");
  button.innerText = "Size";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  var button = document.createElement("button");
  button.setAttribute("onclick", "colorButtonPress()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "colorButton");
  button.innerText = "Color";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  table.appendChild(row2);

  table.setAttribute("id", "buttonTable");
  body.appendChild(table);
}

//6)Add: Edit, Undo, Delete, Finish, Remove: Move, Rotate, Size, Color, Finish
function finishButtonPress2() {
    removeButtons();
    createOptions();
}

//7) Add +/- X, Y, Z, and Finish, Remove: Move, Rotate, Size, Color, Finish
function moveButtonPress() {
    removeButtons();
    createMoveButtons();
}

/**
 * Creates a button for user control
 * @param {String} axis - 'x' or 'y'
 * @param {String} direction - 'up' or 'down'
 * @return {Object} button - a button object created
*/
function createButton(axis, direction) {
  var button = document.createElement("button");

  button.setAttribute("onClick", "moveSphere('" + axis + "', '" + direction + "', false)");
  button.setAttribute("class", "button");
  button.innerText = direction == 'up' ? axis.toUpperCase() + "+" : axis.toUpperCase() + "-";

  return button;
}

/**
 * Creates the editing tools such as x, y, z buttons for user interface
*/
function createMoveButtons() {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var row2 = document.createElement("tr");
  var body = document.querySelector("center");
  var axis = ["x", "y", "z"];

  //Finish Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "finishButtonPress3()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "finishButton");
  button.innerText = "Finish";
  body.appendChild(button);

  // Create "up" buttons in the first row
  for (var i in axis) {
    var button = createButton(axis[i], "up");
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }

  // Create "down" buttons in the second row
  for (var i in axis) {
    var button = createButton(axis[i], "down");
    var cell = document.createElement("td");
    cell.appendChild(button);
    row2.appendChild(cell);
  }

  // Append the first, second rows to the table
  table.appendChild(row);
  table.appendChild(row2);

  table.setAttribute("id", "buttonTable");
  body.appendChild(table);
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

//8)Remove +/- X, Y, Z, Finish, Add: Move, Rotate, Size, Color, Finish
function finishButtonPress3() {
    removeButtons();
    createEditButtons();
}

//9) Add Rotate CounterClockwise, Clockwise, Finish, Remove: Move, Rotate, Size, Color, Finish
function rotateButtonPress() {
    removeButtons();
    createRotateButtons();
}

function createRotateButtons() {
    var table = document.createElement("table");
    var row = document.createElement("tr");
    var body = document.querySelector("center");

    //Finish Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "finishButtonPress4()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "finishButton");
    button.innerText = "Finish";
    body.appendChild(button);

    var button = document.createElement("button");
    button.setAttribute("onClick", "rotateSphere(-5, false)");
    button.setAttribute("class", "button");
    button.innerText = "<-";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    var button = document.createElement("button");
    button.setAttribute("onClick", "rotateSphere(5, false)");
    button.setAttribute("class", "button");
    button.innerText = "->";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);

    table.setAttribute("id", "buttonTable");
    body.appendChild(table);
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

//10)Add Move, Rotate, Size, Color, Finish, Remove: <-, ->, Finish
function finishButtonPress4() {
    removeButtons();
    createEditButtons();
}

//11)Add Color Picker, Finish, Remove: Move, Rotate, Size, Color, Finish
function colorButtonPress() {
    removeButtons();
    createColorButtons();
}

function createColorButtons() {
    var body = document.querySelector("center");

    //Finish Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "finishButtonPress5()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "finishButton");
    button.innerText = "Finish";
    body.appendChild(button);   
}

//12) Remove COlor Picker, FInish, Add: Move, Rotate, Size, Color, Finish
function finishButtonPress5() {
    removeButtons();
    createEditButtons();
}

//13) Remove: Move, Rotate, Size, COlor, Finish, Add: +, -, Finish
function sizeButtonPress() {
    removeButtons();
    createSizeButtons();
}

function createSizeButtons() {
    var table = document.createElement("table");
    var row = document.createElement("tr");
    var body = document.querySelector("center");

    //Finish Button
    var button = document.createElement("button");
    button.setAttribute("onclick", "finishButtonPress6()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "finishButton");
    button.innerText = "Finish";
    body.appendChild(button);

    var button = document.createElement("button");
    button.setAttribute("onClick", "resizeSphere(.1)");
    button.setAttribute("class", "button");
    button.innerText = "+";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    var button = document.createElement("button");
    button.setAttribute("onClick", "resizeSphere(-.1)");
    button.setAttribute("class", "button");
    button.innerText = "-";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);

    table.setAttribute("id", "buttonTable");
    body.appendChild(table);
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

//14) Remove: +, -, Finish, Add: Move, Rotate, Color, Size, Finish
function finishButtonPress6() {
  removeButtons();
  createEditButtons();
}