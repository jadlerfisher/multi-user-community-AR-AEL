//1) Remove: +, Add: Model, Shape
// Press + button, allows users to choose model or shape to add
function addEntity() {
    hideCursor();
    stateChange('stateB');
    console.log('Something is happening');

    // // Hide addEntity button
    // var btns = document.getElementsByClassName("buttonSummon");
    // hideButtons(btns);

    // // Hide table (with remove button in it)
    // var buttonTable = document.getElementById("buttonTable");
    // hideTable(buttonTable);

    // // removeSummmon();
    // // removeButtons();
    // // createAddButtons();

    // // Reveal the uiElem
    // addButtonPress("gallery");

}

// //Remove: Shape Buttons Add: Finish, Edit, Undo, Delete
// //Creates a shape based on which button in pressed
// function shapeButtonPress(i) {
//   removeButtons();
//   createOptions();
//   display(i);
// }

// //User chose to add a model, will display model options
// function modelButtonPress1() {
//   removeButtons();
//   createModelButtons();
// }

// //User chose to add a shape, will display shape options
// function shapeButtonPress1() {
//   removeButtons();
//   createShapeButtons();
// }

// //Creates a model based on which button is pressed
// function modelButtonPress(i) {
//   removeButtons();
//   createOptions();
//   displayModel(i);
// }

// //2)Remove Edit, Undo, Delete, Finish
// //Final finish, user is done with shape
// function finishButtonPress1() {
//     removeButtons();
//     var item = document.getElementById("item");
//     itemNum++;
//     item.setAttribute("id", itemNum);
//     items.push(itemNum);
//     createSummonButton();
//     createRemoveButton();
// }

//3) Add: +, Remove: Edit, Undo, Delete, Finish, Also: Delete Sphere
// function deleteButtonPress() {
//     removeButtons();
//     createSummonButton();
//     createRemoveButton();
//     disappear();
// }

// //4)Undo
// //Undo most recent edit
// function undoButtonPress() {
//   console.log("Undo!");
//   if (changes.length > 0) {
//     var lastMove = changes.pop(changes.length - 1);
//     console.log(lastMove[0]);
//     if (lastMove[0] === "move") {
//       setPosition(lastMove[1][0], lastMove[1][1], lastMove[1][2]);
//     } else if (lastMove[0] === "rotate") {
//       setRotation(lastMove[1]);
//     } else if (lastMove[0] === "size") {
//         var str = "";
//         for (var i = 0; i < lastMove[1].length - 3; i++) {
//             str = str + lastMove[1][i] + " ";
//         }
//         console.log(str);
//       setSize(lastMove[1]);
//     } else if (lastMove[0] === "color") {
//         setColor(lastMove[1]);
//     }
//   }
// }

//User has chosen to add their own model
// function addNewModelButtonPress() {
//     removeButtons();
//     createNewModelInput();
// }

// //5) Add: Move, Rotate, Size, Color, Finish, Remove: Edit, Delete, Undo, Finish
// //User has chosen to edit their shape
// function editButtonPress() {
//     removeButtons();
//     createEditButtons();
// }

// //6)Add: Edit, Undo, Delete, Finish, Remove: Move, Rotate, Size, Color, Finish
// //User is done editing their shape
// function finishButtonPress2() {
//     removeButtons();
//     createOptions();
// }

function moveButtonPress() {
  stateChange('stateC1');
  var item = document.getElementById("item");
  var position = [item.getAttribute("position").x, item.getAttribute("position").y, item.getAttribute("position").z];
  changes.push(["move", position]);
}


// //8)Remove +/- X, Y, Z, Finish, Add: Move, Rotate, Size, Color, Finish
// //User is done moving their shape
// function finishButtonPress3() {
//     removeButtons();
//     createEditButtons();
// }

function rotateButtonPress() {
  stateChange('stateC2');
  var origRotate = document.getElementById("item").getAttribute("rotation").y;
  console.log(origRotate);
  changes.push(["rotate", origRotate]);
}


// //10)Add Move, Rotate, Size, Color, Finish, Remove: <-, ->, Finish
// //User is done rotating shape
// function finishButtonPress4() {
//     removeButtons();
//     createEditButtons();
// }

function colorButtonPress() {
  stateChange('stateC4');
  var div = document.getElementsByClassName("editOptionsBox")[4];
  //Creates JsColor field
  var input = document.createElement('INPUT')
  var picker = new jscolor(input)

  //Gets item's color
  var origColor = document.getElementById("item").getAttribute("material").color;
  changes.push(["color", origColor]);

  //Changes text in field input to appropriate string
  picker.fromString(origColor);
  input.setAttribute("class", "colorPicker");
  div.appendChild(input);
}


// //12) Remove COlor Picker, FInish, Add: Move, Rotate, Size, Color, Finish
// //User is done changing shape color
// function finishButtonPress5() {
//     removeButtons();
//     createEditButtons();
// }

function sizeButtonPress() {
  stateChange('stateC3');
  var item = document.getElementById("item");
  var sizeInfo = [[item.getAttribute("scale").x, item.getAttribute("scale").y, item.getAttribute("scale").z]];
  changes.push(["size", sizeInfo]);
}


// //User is done changing size
// function finishButtonPress6() {
//   removeButtons();
//   createEditButtons();
// }

// //User is submitting URL to load new model
// function submitFilepathButtonPress() {
//     var text = document.getElementById("fileInputField").value;
//     console.log(text);
//     createNewModel(text);
//     removeButtons();
//     createOptions();
// }

//User has chosen to remove an object from the scene
function removeButtonPress() {
    //removeButtons();
    document.querySelector("a-scene").removeChild(selectedItem);
    //addRemoveButtons();
}

//User has chosen to now not remove an object from the scene
// function backButtonPress() {
//     removeButtons();
//     createSummonButton();
//     createRemoveButton();
// }

//Resets the gravity button upon press
function gravityOffButtonPress() {
  onGravity();
}

//Resets the gravity button upon press
function gravityOnButtonPress() {
  var scene = document.querySelector("a-scene");
  createGravity();
  gravityAll();
}
