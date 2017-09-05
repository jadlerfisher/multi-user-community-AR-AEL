/**
 * Removes the object, coordinate buttons, and '- button' from the screen
*/
function disappear() {
  document.querySelector("a-scene").removeChild(document.getElementById("sphere"));
  document.querySelector("center").removeChild(document.getElementById("buttonTable"));
  document.querySelector("center").removeChild(document.getElementsByClassName("buttonSummon")[0]);
  var center = document.querySelector("center");
  var button = document.createElement("button");
  button.setAttribute("onclick", "display()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "buttonSummon");
  button.innerText = "+";
  center.appendChild(button);
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


    //make '+' button disappear
    body.removeChild(document.getElementsByClassName("buttonSummon")[0]);
    var disappearButton = document.createElement("button");
    disappearButton.setAttribute("onclick", "disappear()");
    disappearButton.setAttribute("type", "button");
    disappearButton.setAttribute("class", "buttonSummon buttonDisappear");
    disappearButton.innerText = "-";
    body.appendChild(disappearButton);

    //creates editing tools
    createEditingTools();
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
function createEditingTools() {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var row2 = document.createElement("tr");
  var body = document.querySelector("center");
  var axis = ["x", "y", "z"];

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
