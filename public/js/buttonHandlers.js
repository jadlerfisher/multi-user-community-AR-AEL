function moveButtonPress() {
  stateChange('stateC1');
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var position = [item.getAttribute("position").x, item.getAttribute("position").y, item.getAttribute("position").z];
  changes.push(["move", position]);
  console.log('Entity is being moved.');
}
//1) Remove: +, Add: Model, Shape
// Press + button, allows users to choose model or shape to add
function addButtonPress() {
  //removeAdd();
  //removeButtons();
  //createAddButtons();
  createAddButtonMenu();
  // if (buttonExists) {
  //   init();
  // }
}

function rotateButtonPress() {
  stateChange('stateC2');
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var origRotate = [item.getAttribute("rotation").x,item.getAttribute("rotation").y,item.getAttribute("rotation").z];
  // console.log(origRotate);
  changes.push(["rotate", origRotate]);
  console.log('Entity is being rotated.');
}

function colorButtonPress() {
  stateChange('stateC4');
  var div = document.getElementsByClassName("editOptionsBox")[4];
  //Creates JsColor field

  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var origColor = item.getAttribute('material').color;
  console.log(origColor);
  changes.push(["color", origColor]);
  //Changes text in field input to appropriate string

  console.log('Entity is being recolored.');
}

function cancelEditingAttribute() {
  stateChange('stateC');
  undoButtonPress();
  console.log('Canceled editing.');
}

function deleteButtonPress() {
    disappear();

    console.log('Entity is being deleted.');
    stateChange('stateA');
}

//4)Undo
//Undo most recent edit
function undoButtonPress() {
  console.log("Undo!");
  if (changes.length > 0) {
    var lastMove = changes.pop(changes.length - 1);
    console.log(lastMove[0]);
    if (lastMove[0] === "move") {
      setPosition(lastMove[1][0], lastMove[1][1], lastMove[1][2]);
    } else if (lastMove[0] === "rotate") {
      setRotation(lastMove[1]);
    } else if (lastMove[0] === "size") {
        var str = "";
        for (var i = 0; i < lastMove[1].length - 3; i++) {
            str = str + lastMove[1][i] + " ";
        }
        console.log(str);
      setSize(lastMove[1]);
    } else if (lastMove[0] === "color") {
        setColor(lastMove[1]);
    }
  }
}

//User has chosen to add their own model
function addNewModelButtonPress() {
    removeButtons();
    createNewModelInput();
}

//5) Add: Move, Rotate, Size, Color, Finish, Remove: Edit, Delete, Undo, Finish
//User has chosen to edit their shape
function editButtonPress() {
    //removeButtons();
    createEditButtonMenu();
}

//6)Add: Edit, Undo, Delete, Finish, Remove: Move, Rotate, Size, Color, Finish
//User is done editing their shape
function finishButtonPress2() {
    removeButtons();
    createOptions();
}

//7) Add +/- X, Y, Z, and Finish, Remove: Move, Rotate, Size, Color, Finish
//User has chosen to move their shape
function moveButtonPress() {
    removeButtons();
    createMoveButtons();
}


//8)Remove +/- X, Y, Z, Finish, Add: Move, Rotate, Size, Color, Finish
//User is done moving their shape
function finishButtonPress3() {
    removeButtons();
    createEditButtonMenu();
}

//9) Add Rotate CounterClockwise, Clockwise, Finish, Remove: Move, Rotate, Size, Color, Finish
//User has chosen to rotate shape
function rotateButtonPress() {
    removeButtons();
    createRotateButtons();
}


//10)Add Move, Rotate, Size, Color, Finish, Remove: <-, ->, Finish
//User is done rotating shape
function finishButtonPress4() {
    removeButtons();
    createEditButtonMenu();
}

//11)Add Color Picker, Finish, Remove: Move, Rotate, Size, Color, Finish
//User has chosen to change the shape color
function colorButtonPress() {
    removeButtons();
    createColorButtons();
}


//12) Remove COlor Picker, FInish, Add: Move, Rotate, Size, Color, Finish
//User is done changing shape color
function finishButtonPress5() {
    removeButtons();
    createEditButtonMenu();
}

//User has chosen to change shape size
function sizeButtonPress() {
  stateChange('stateC3');
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var sizeInfo = [[item.getAttribute("scale").x, item.getAttribute("scale").y, item.getAttribute("scale").z]];
  changes.push(["size", sizeInfo]);
  console.log('Entity is being resized');
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


//User is done changing size
function finishButtonPress6() {
  removeButtons();
  createEditButtonMenu();
}

function editModelPress(){
  var oldObj = selectedItem;
  selectedItem.classList.add('selected');
  console.log('You have decided to edit: '+ selectedItem.id);
  stateChange('stateC');
}

function removeButtonPress() {
  // TODO: Need to pick an object that user selected and remove it
  // document.querySelector("#scene").removeChild(selectedItem);
  console.log(selectedItem.getAttribute('id') + " was removed from scene.");
  NAF.entities.removeEntity(selectedItem.getAttribute('id').substr(4));
}

//Resets the gravity button upon press
function gravityOffButtonPress() {
  onGravity();
}

//Resets the gravity button upon press
function gravityOnButtonPress() {
  var scene = document.querySelector("#scene");
  createGravity();
  gravityAll();
}
//User has chosen to now not remove an object from the scene
function backButtonPress() {
    removeButtons();
    createSummonButton();
    createRemoveButton();
}
