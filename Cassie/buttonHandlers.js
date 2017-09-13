//1) Remove: +, Add: Model, Shape
function summonButtonPress() {
    removeSummmon();
    createAddButtons();
    if (buttonExists) {
      init();
    }
}

//Remove: Shape Buttons Add: Finish, Edit, Undo, Delete
function shapeButtonPress(i) {
  removeButtons();
  createOptions();
  display(i);
}

function modelButtonPress1() {
  removeButtons();
  createModelButtons();
}

function shapeButtonPress1() {
  removeButtons();
  createShapeButtons();
}

function modelButtonPress(i) {
  removeButtons();
  createOptions();
  displayModel(i);
}

//2)Remove Edit, Undo, Delete, Finish
function finishButtonPress1() {
    removeButtons();
    var item = document.getElementById("item");
    item.setAttribute("id", itemNum);
    itemNum++;
    createSummonButton();
}

//3) Add: +, Remove: Edit, Undo, Delete, Finish, Also: Delete Sphere
function deleteButtonPress() {
    removeButtons();
    createSummonButton();
    disappear();
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

function addNewModelButtonPress() {
    console.log("Not implemented yet");
}

//5) Add: Move, Rotate, Size, Color, Finish, Remove: Edit, Delete, Undo, Finish
function editButtonPress() {
    removeButtons();
    createEditButtons();
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


//14) Remove: +, -, Finish, Add: Move, Rotate, Color, Size, Finish
function finishButtonPress6() {
  removeButtons();
  createEditButtons();
}