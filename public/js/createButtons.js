//Removes the Summon Button
function removeSummmon() {
    // hideCursor();
    document.querySelector("center").removeChild(document.getElementsByClassName("buttonSummon")[0]);
}

//Removes All Buttons from Screen
function removeButtons() {
    var center = document.querySelector("center");
    var buttonTable = document.getElementById("buttonTable");
    buttonTable.classList.add('hide');
    if (buttonTable != null) {
        center.removeChild(buttonTable);
    }
    var finishButton = document.getElementsByClassName("finishButton");
    if (finishButton.length > 0){
      center.removeChild(finishButton[0]);
    }
}

//Creates the + (Add Object) button
function createSummonButton() {
    revealCursor();
    var center = document.querySelector("center");
    var button = document.createElement("button");
    button.setAttribute("onclick", "summonButtonPress()");
    button.setAttribute("type", "button");
    button.setAttribute("class", "buttonSummon");
    button.innerText = "+";
    center.appendChild(button);
}

// /**
//  * Creates a button for user control
//  * @param {String} number - which finishButtonPress to use
//  * @return {Object} button - a button object created
// */
// function createFinishButton(number) {
//   var button = document.createElement("button");

//   button.setAttribute("onClick", "finishButtonPress" + number + "()");
//   button.setAttribute("class", "finishButton");
//   button.setAttribute("type", "button");
//   button.innerText = "Finish"

//   return button;
// }

/**
 * Creates a button for user control
 * @param {String} funct - function that button should call
 * @param {String} text - innerText of Button
 * @return {Object} button - a button object created
*/
function createOptionsButton(funct, text) {
  var button = document.createElement("button");
  button.setAttribute("onClick", funct);
  button.setAttribute("class", "optionButton");
  button.setAttribute("type", "button");
  button.innerText = text;

  return button;
}

/**
 * Creates a button for user control
 * @param {String} funct - function that button should call
 * @param {String} text - innerText of Button
 * @return {Object} button - a button object created
*/
function createAnnotationButton(funct, text) {
  var button = document.createElement("button");
  button.setAttribute("onClick", funct);
  button.setAttribute("class", "annotationButton");
  button.setAttribute("type", "button");
  button.innerText = text;

  return button;
}


//Takes in an array of Button Functions and Button Text
//Array Should be formated as such:
// [["funct1,"funct2"],["funct3", "funct4"]]
// [["1", "2"], ["3", "4"]]
//This will create 2 rows of buttons, each row with 2 buttons each
function createButtonTable(buttonFuncts, buttonText) {
    var table = document.createElement("table");
    var body = document.querySelector("center");

    for (i = 0; i < buttonFuncts.length; i++) {
        var row = document.createElement("tr");
        for (j = 0; j < buttonFuncts[i].length; j++) {
            var cell = document.createElement("td");
            cell.appendChild(createOptionsButton(buttonFuncts[i][j], buttonText[i][j]));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    table.setAttribute("id", "buttonTable");
    body.appendChild(table);
}

// //Create Add Buttons, Buttons that ask whether you want a shape or model
// function createAddButtons() {
//     var bF = [["modelButtonPress1()", "shapeButtonPress1()"]];
//     var bT = [["Models", "Shapes"]];
//     createButtonTable(bF, bT);
// }

// //Adds Model Buttons, Button that asks which model you want
// function createModelButtons() {
//     var bF = [["modelButtonPress(0)", "addNewModelButtonPress()"]];
//     var bT = [["Pokeball", "Add New Model"]];
//     createButtonTable(bF, bT);
// }

// //Adds Shape Buttons, Button that asks which shape you want
// function createShapeButtons() {
//     var bF = [["shapeButtonPress(0)", "shapeButtonPress(1)", "shapeButtonPress(2)"],
//             ["shapeButtonPress(3)", "shapeButtonPress(4)", "shapeButtonPress(5)"],
//             ["shapeButtonPress(6)", "shapeButtonPress(7)", "shapeButtonPress(8)"]];
//     var bT = [["Box", "Sphere", "Circle"], ["Cone", "Plane", "Ring"], ["Torus", "Torus Knot", "Triangle"]];
//     createButtonTable(bF, bT);
// }

// //Add Edit, Undo, Delete, Finish, and Gravity
// function createOptions() {
//     var bF = [["editButtonPress()", "undoButtonPress()"],["gravityButtonPress()", "deleteButtonPress()"]];
//     var bT = [["Edit", "Undo"],["Gravity", "Delete"]];
//     createButtonTable(bF, bT);

//     //Finish Button
//     var body = document.querySelector("center");
//     body.appendChild(createFinishButton(1));
// }


// //Creates Buttons to edit current object: location, rotation, size, color
// function createEditButtons() {
//     var bF = [["moveButtonPress()", "rotateButtonPress()"], ["sizeButtonPress()", "colorButtonPress()"]];
//     var bT = [["Move", "Rotate"], ["Resize", "Color"]];
//     createButtonTable(bF, bT);

//     //Finish Button
//     var body = document.querySelector("center");
//     body.appendChild(createFinishButton(2));
// }

/**
 * Creates the editing tools such as x, y, z buttons for user interface
*/
// function createMoveButtons() {
//     var bF = [["moveSphere('x', 'up', false)", "moveSphere('y', 'up', false)", "moveSphere('z', 'up', false)"],
//             ["moveSphere('x', 'down', false)", "moveSphere('y', 'down', false)", "moveSphere('z', 'down', false)"]];
//     var bT = [["+X", "+Y", "+Z"], ["-X", "-Y", "-Z"]];
//     createButtonTable(bF, bT);

//     var item = document.getElementById("item");
//     var position = [item.getAttribute("position").x, item.getAttribute("position").y, item.getAttribute("position").z];
//     changes.push(["move", position]);

//     //Finish Button
//     var body = document.querySelector("center");
//     body.appendChild(createFinishButton(3));
// }

//Creates Buttons <- and -> for rotation
// function createRotateButtons() {
//     var bF = [["rotateSphere(-5, false)", "rotateSphere(5, false)"]];
//     var bT = [["<-", "->"]];
//     createButtonTable(bF, bT);
//     var origRotate = document.getElementById("item").getAttribute("rotation").y;
//     console.log(origRotate);
//     changes.push(["rotate", origRotate]);

//     //Finish Button
//     var body = document.querySelector("center");
//     body.appendChild(createFinishButton(4));
// }


//Creates JsColor color Picker
function createColorButtons() {
    var body = document.querySelector("center");

    //Creates JsColor field
    var input = document.createElement('INPUT')
    var picker = new jscolor(input)

    //Changes object color as user changes color field
    if (!(document.getElementById("item").getAttribute('class') === "model")) {
        var origColor = document.getElementById("item").getAttribute('color');
        changes.push(["color", origColor]);
    } else {
        var origColor = document.getElementById("item").getAttribute("material").color;
        console.log(origColor);
        changes.push(["color", origColor]);
    }

    //Changes text in field input to appropriate string
    picker.fromString(origColor);
    input.setAttribute("id", "buttonTable");
    input.setAttribute("class", "colorPicker");
    body.appendChild(input);

    //Finish Button
    var body = document.querySelector("center");
    body.appendChild(createFinishButton(5));
}

// //Creates + and - buttons for size changing
// function createSizeButtons() {
//     var bF = [["resizeSphere(0.1)", "resizeSphere(-0.1)"]];
//     var bT = [["+", "-"]];
//     createButtonTable(bF, bT);
//     var item = document.getElementById("item");
//     var type = item.getAttribute("class");

//     //Grabs current size information from shape
//     if (type === "model") {
//         var sizeInfo = [[item.getAttribute("scale").x, item.getAttribute("scale").y, item.getAttribute("scale").z]];
//     } else {
//         var sizeInfo = [item.getAttribute("width"), item.getAttribute("height"), item.getAttribute("depth"), item.getAttribute("radius"),
//         item.getAttribute("radiusBottom"), item.getAttribute("radiusTop"), item.getAttribute("radiusInner"), item.getAttribute("radiusOuter"),
//         item.getAttribute("radiusTubular"), item.getAttribute("VertexA"), item.getAttribute("VertexB"), item.getAttribute("VertexC")];
//     }
//     changes.push(["size", sizeInfo]);
//     var str = "";
//     for (var i = 0; i < sizeInfo.length - 3; i++) {
//         str = str + changes[changes.length - 1][1][i] + " ";
//     }

//     //Finish Button
//     var body = document.querySelector("center");
//     body.appendChild(createFinishButton(6));
// }

// //Allows user to add their own model using a url
// function createNewModelInput() {
//     var body = document.querySelector("center");
//     var table = document.createElement("table");
//     var row = document.createElement("tr");
//     var row2 = document.createElement("tr");

//     var cell = document.createElement("td");
//     var input = document.createElement("input");
//     input.setAttribute("type", "text");
//     input.setAttribute("name", "filePath");
//     input.setAttribute("value", "");
//     input.setAttribute("id", "fileInputField");
//     cell.appendChild(input);
//     row.appendChild(cell);

//     var cell = document.createElement("td");
//     var button = document.createElement("button");
//     button.setAttribute("id", "optionButton");
//     button.setAttribute("onClick", "submitFilepathButtonPress()");
//     button.innerText = "Submit";
//     cell.appendChild(button);
//     row.appendChild(cell);
//     table.appendChild(row);
//     table.setAttribute("id", "buttonTable");
//     body.appendChild(table);
// }

function createNewModelInput() {
    var body = document.querySelector("center");
    var table = document.createElement("table");
    var row = document.createElement("tr");
    var row2 = document.createElement("tr");

    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "filePath");
    input.setAttribute("value", "File Path");
    input.setAttribute("onfocus", "if (this.value=='File Path') this.value='';");
    input.setAttribute("id", "fileInputField");
    cell.appendChild(input);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("name", "modelName");
    input1.setAttribute("value", "Model Name");
    input1.setAttribute("onfocus", "if (this.value=='Model Name') this.value='';");
    input1.setAttribute("id", "modelNameField");
    cell.appendChild(input1);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("id", "optionButton");
    button.setAttribute("onClick", "submitFilepathButtonPress()");
    button.innerText = "Submit";
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);
    table.setAttribute("id", "buttonTable");
    body.appendChild(table);
}


function createRemoveButton() {
    bF = [["removeButtonPress()"]];
    bT = [["Remove Object"]];
    createButtonTable(bF, bT);

    // initially hide remove button until user selects it with cursor
    hideButtons(document.getElementsByClassName('optionButton'));
}

// //Goes through the items[] array and adds a button for each item id
// function addRemoveButtons() {
//     console.log("remove");
//     var bF = [];
//     var bT = [];
//     j = 0;
//     var currF = [];
//     var currT = [];
//     for(var i = items.length - 1; i >= 0; i--) {
//         console.log(itemNum);
//         currF.push("removeItem(" + items[i] + ")");
//         currT.push("Item " + items[i]);
//         j++;
//         if (j == 3) {
//             j = 0;
//             bF.push(currF);
//             bT.push(currT);
//             currF = [];
//             currT = [];
//         }
//     }
//     if (j != 0) {
//         bF.push(currF);
//         bT.push(currT);
//     }
//     createButtonTable(bF,bT);
//     var button = document.createElement("button");

//     button.setAttribute("onClick", "backButtonPress()");
//     button.setAttribute("class", "finishButton");
//     button.setAttribute("type", "button");
//     button.innerText = "Back";

//     var body = document.querySelector("center");
//     body.appendChild(button);
// }



function createGravity() {
  var center = document.querySelector("center");
  var button = document.createElement("button");
  button.setAttribute("onclick", "gravityOffButtonPress()");
  button.setAttribute("type", "button" );
  button.setAttribute("class", "buttonGravity");
  button.innerText = "Gravity";
  center.appendChild(button);

}

function removeGravityButtons() {
  document.querySelector("center").removeChild(document.getElementsByName("buttonGravity"));
}

function onGravity() {
  var center = document.querySelector("center");
  var button = document.createElement("button");
  button.setAttribute("onclick", "gravityOnButtonPress()");
  button.setAttribute("type", "button" );
  button.setAttribute("class", "buttonGravity");
  button.setAttribute("style", "background-color: red");
  button.innerText = "Gravity";
  center.appendChild(button);

}
