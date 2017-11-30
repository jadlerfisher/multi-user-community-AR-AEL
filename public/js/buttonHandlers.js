function moveButtonPress() {
  stateChange('stateC1');
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var position = [item.getAttribute("position").x, item.getAttribute("position").y, item.getAttribute("position").z];
  changes.push(["move", position]);
  console.log('Entity is being moved.');
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

function sizeButtonPress() {
  stateChange('stateC3');
  var objectId = getObjectId();
  var item = NAF.entities.getEntity(objectId);
  var sizeInfo = [item.getAttribute("scale").x, item.getAttribute("scale").y, item.getAttribute("scale").z];
  console.log(sizeInfo);
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
function submitFilepathButtonPress() {
    var filePath = document.getElementById("fileInputField").value;
    var modelName = document.getElementById("modelNameField").value;
    //console.log(text);
    createNewModel(filePath, modelName);
    removeButtons();
    createOptions();
}

//User has chosen to remove an object from the scene

function editModelPress(){
  var oldObj = selectedItem;
  selectedItem.classList.add('selected');
  console.log('You have decided to edit: '+ selectedItem.id);
  stateChange('stateC');
}

function removeButtonPress() {
  console.log(selectedItem.getAttribute('id') + " was removed from scene.");
  NAF.entities.removeEntity(selectedItem.getAttribute('id').substr(4));
}


//Resets the gravity button fon press
function gravityOffButtonPress() {
  onGravity();
}

//Resets the gravity button upon press
function gravityOnButtonPress() {
  var scene = document.querySelector("a-scene");
  createGravity();
  gravityAll();
}
