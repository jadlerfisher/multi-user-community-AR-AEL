function init() {
    document.querySelector("a-scene").removeChild(document.getElementsByClassName("a-enter-vr")[0]);
}

//1) Remove: +, Add: Edit, Undo, Delete, Finish, Also: Display Sphere
//Handles Summon Button Press
function summonButtonPress() {
    removeSummmon();
    createOptions();
    display();
    init();
}

//Removes the Summon Button
function removeSummmon() {
    document.querySelector("center").removeChild(document.getElementsByClassName("buttonSummon")[0]);
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
function display() {
    var scene = document.querySelector("a-scene");
    var body = document.querySelector("center");

    var sphere = document.createElement("a-sphere");
    sphere.id = "sphere";
    sphere.class = "sphere";
    sphere.setAttribute('position', "0 1.25 -5");
    sphere.setAttribute('radius', 1);
    sphere.setAttribute('color', "#0000FF");
    scene.appendChild(sphere);
    //creates model
    /*var model = document.createElement("a-entity");
    scene.appendChild(model);
    model.id = 'sphere';
    model.setAttribute("obj-model", "obj: #pokemon-obj; mtl: #pokemon-mtl");
    model.setAttribute('position', '0 1.25 -5');
    model.setAttribute("rotation", "-90 0 0");*/
}

//2)Remove Edit, Undo, Delete, Finish
function finishButtonPress1() {
    removeButtons();
}

function removeButtons() {
    var center = document.querySelector("center");
    var buttonTable = document.getElementById("buttonTable");
    if (buttonTable != null) {
        center.removeChild(buttonTable);
    }
    center.removeChild(document.getElementsByClassName("finishButton")[0]);
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
  document.querySelector("a-scene").removeChild(document.getElementById("sphere"));
}

//4)Undo
//Undo most recent edit
function undo() {
  console.log("Undo!");
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

  button.setAttribute("onClick", "moveSphere('" + axis + "', '" + direction + "')");
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
function moveSphere(axis, direction) {
  var s = document.getElementById("sphere");
  var scene = document.querySelector("a-scene");

  //create variables of current coordinate position of the sphere
  var _x = s.getAttribute('position').x;
  var _y = s.getAttribute('position').y;
  var _z = s.getAttribute('position').z;
  // change the coordinate position of the sphere based on input 'axis' in the direction of input 'direction'
  switch (axis) {
    case "x":
      s.setAttribute('position', { x: direction === 'up' ? _x + 1 : _x - 1, y: _y, z: _z });
      break;
    case "y":
      s.setAttribute('position', { x: _x, y: direction === 'up' ? _y + 1 : _y - 1, z: _z });
      break;
    case "z":
      s.setAttribute('position', { x: _x, y: _y, z: direction === 'up' ? _z + 1 : _z - 1 });
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
    button.setAttribute("onClick", "rotateSphere(-5)");
    button.setAttribute("class", "button");
    button.innerText = "<-";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    var button = document.createElement("button");
    button.setAttribute("onClick", "rotateSphere(5)");
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
function rotateSphere(degrees) {
    var s = document.getElementById("sphere");
    var scene = document.querySelector("a-scene");

    //create variables of current coordinate position of the sphere
    var _y = s.getAttribute('rotation').y;
    var _x = s.getAttribute('rotation').x;
    var _z = s.getAttribute('rotation').z;
    s.setAttribute('rotation', { x: _x, y: _y + degrees, z: _z });
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
    button.setAttribute("onClick", "resizeSphere(0.1)");
    button.setAttribute("class", "button");
    button.innerText = "+";
    var cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);

    var button = document.createElement("button");
    button.setAttribute("onClick", "resizeSphere(-0.1)");
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
function resizeSphere(change) {
    var s = document.getElementById("sphere");
    var scene = document.querySelector("a-scene");
    var type = s.getAttribute("id");

    if (type == "box") {
        s.setAttribute('width', parseFloat(s.getAttribute('width')) + change);
        s.setAttribute('height', parseFloat(s.getAttribute('height')) + change);
        s.setAttribute('depth', parseFloat(s.getAttribute('depth')) + change);
    } else if (type == "circle"  || type == "dodecahedron"  || type == "octahedron" || type == "sphere" || type == "tetrahedron") {
        s.setAttribute('radius', parseFloat(s.getAttribute('radius')) + change);
    } else if (type == "cone") {
        s.setAttribute('radiusBottom', parseFloat(s.getAttribute('radiusBottom')) + change);
        s.setAttribute('radiusTop', parseFloat(s.getAttribute('radiusTop')) + change);
        s.setAttribute('height', parseFloat(s.getAttribute('height')) + change);
    } else if (type == "cylinder") {
        s.setAttribute('radius', parseFloat(s.getAttribute('radius')) + change);
        s.setAttribute('height', parseFloat(s.getAttribute('height')) + change);
    } else if (type == "plane") {
        s.setAttribute('width', parseFloat(s.getAttribute('width')) + change);
        s.setAttribute('height', parseFloat(s.getAttribute('height')) + change);
    } else if (type == "ring") {
        s.setAttribute('raidusInner', parseFloat(s.getAttribute('radiusInner')) + change);
        s.setAttribute('radiusOuter', parseFloat(s.getAttribute('radiusOuter')) + change);
    } else if (type == "torus" || type == "torusKnot") {
        s.setAttribute('radius', parseFloat(s.getAttribute('radius')) + change);
        s.setAttribute('radiusTubular', parseFloat(s.getAttribute('radiusTubular')) + change);
    } else if (type == "triangle") {
        s.setAttribute('VertexA', {x: s.getAttribute('VertexA').x * (change * 2), y: s.getAttribute('VertexA').y * (change * 2), z: s.getAttribute('VertexA').z});
        s.setAttribute('VertexB', {x: s.getAttribute('VertexB').x * (change * 2), y: s.getAttribute('VertexB').y * (change * 2), z: s.getAttribute('VertexB').z});
        s.setAttribute('VertexC', {x: s.getAttribute('VertexC').x * (change * 2), y: s.getAttribute('VertexC').y * (change * 2), z: s.getAttribute('VertexC').z});
    }
}
