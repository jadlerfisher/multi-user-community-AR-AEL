/** Initial Function that creates the Edit, Undo, and Delete Buttons, along with a finish Button**/
function createOptions() {
  //Options
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var body = document.querySelector("center");

  //Finish Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "finish()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "finishButton");
  button.innerText = "Finish";
  body.appendChild(button);

  //Edit Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "createEditButtons()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton editButton");
  button.innerText = "Edit";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Undo Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "undo()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton undoButton");
  button.innerText = "Undo";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  //Delete Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "disappear()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "optionButton deleteButton");
  button.innerText = "Delete";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  table.appendChild(row);

  table.setAttribute("id", "optionsTable");
  body.appendChild(table);


  //make '+' button disappear
  body.removeChild(document.getElementsByClassName("buttonSummon")[0]);

  display();
}

/**
 * Displays the object on the screen and gets rid of the "+ button" on the top of the screen
*/
function display() {
    var scene = document.querySelector("a-scene");
    var body = document.querySelector("center");

    //creates model
    var model = document.createElement("a-entity");
    scene.appendChild(model);
    model.id = 'sphere';
    model.setAttribute("obj-model", "obj: #pokemon-obj; mtl: #pokemon-mtl");
    model.setAttribute('position', '0 1.25 -5');
    model.setAttribute("rotation", "-90 0 0");
}

//Undo most recent edit
function undo() {
  console.log("Undo!");
}

//Delete object
function disappear() {
  document.querySelector("a-scene").removeChild(document.getElementById("sphere"));
  document.querySelector("center").removeChild(document.getElementById("optionsTable"));
  document.querySelector("center").removeChild(document.getElementsByClassName("finishButton")[0]);
  var center = document.querySelector("center");
  var button = document.createElement("button");
  button.setAttribute("onclick", "createOptions()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "buttonSummon");
  button.innerText = "+";
  center.appendChild(button);
}

//Creates Buttons to edit current object: location, rotation, size, color
function createEditButtons() {
  document.querySelector("center").removeChild(document.getElementsByClassName("finishButton")[0]);

  var table = document.createElement("table");
  var row = document.createElement("tr");
  var row2 = document.createElement("tr");
  var body = document.querySelector("center");

  //Finish Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "finishEditing()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "finishEditButton");
  button.innerText = "Finish";
  body.appendChild(button);

  var button = document.createElement("button");
  button.setAttribute("onclick", "createMoveButtons()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "moveButton");
  button.innerText = "Move";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);

  var button = document.createElement("button");
  button.setAttribute("onclick", "createRotateButtons()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "rotateButton");
  button.innerText = "Rotate";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row.appendChild(cell);
  table.appendChild(row);

  var button = document.createElement("button");
  button.setAttribute("onclick", "createSizeButtons()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "sizeButton");
  button.innerText = "Size";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  var button = document.createElement("button");
  button.setAttribute("onclick", "createColorPicker()");
  button.setAttribute("type", "button");
  button.setAttribute("id", "colorButton");
  button.innerText = "Color";
  var cell = document.createElement("td");
  cell.appendChild(button);
  row2.appendChild(cell);

  table.appendChild(row2);

  table.setAttribute("id", "buttonTable");
  body.appendChild(table);

  body.removeChild(document.getElementById("optionsTable"));
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
  document.querySelector("center").removeChild(document.getElementById("buttonTable"));
  document.querySelector("center").removeChild(document.getElementsByClassName("finishEditButton")[0]);

  var table = document.createElement("table");
  var row = document.createElement("tr");
  var row2 = document.createElement("tr");
  var body = document.querySelector("center");
  var axis = ["x", "y", "z"];

  //Finish Button
  var button = document.createElement("button");
  button.setAttribute("onclick", "finishMove()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "finishMoveButton");
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

function finish() {
  document.querySelector("center").removeChild(document.getElementsByClassName("finishButton")[0]);
  document.querySelector("center").removeChild(document.getElementById("optionsTable"));
}