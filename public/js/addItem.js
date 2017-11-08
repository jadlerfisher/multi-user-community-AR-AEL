//list of lists with class String, function, imagesource, and name for each item
// var galleryList = [["gallery pokeball gaming", "displayModel(0)", "assets/images/pokeball.png", "pokeball"]];

/*["gallery sphere shapes", "displayModel(0)", "assets/images/sphere.png", "sphere"],
                ["gallery cube shapes", "displayModel(1)", "assets/images/cube.png", "cube"],
                ["gallery torus shapes", "displayModel(2)", "assets/images/torus.png", "torus"],["gallery cat animals", "displayModel(4)", "assets/images/cat.png", "pokeball"],
                ["gallery dog animals", "displayModel(5)", "assets/images/dog.png", "pokeball"],
                ["gallery hamburger food", "displayModel(6)", "assets/images/hamburger.png", "pokeball"],
                ["gallery ice_cream food", "displayModel(7)", "assets/images/ice cream.png", "pokeball"],
                ["gallery lemon food", "displayModel(8)", "assets/images/lemon.jpg", "pokeball"],
                ["gallery space_invader gaming", "displayModel(9)", "assets/images/space invader.png", "pokeball"],
                ["gallery squirrel animals", "displayModel(10)", "assets/images/squirrel.jpg", "pokeball"],
                ["gallery whale animals", "displayModel(11)", "assets/images/whale.png", "pokeball"],
                ["gallery mario gaming", "displayModel(12)", "assets/images/mario.png", "pokeball"]*/

//What the current section is (default or All is "gallery")
// var currentFilter = "gallery";
//What sections there are and what order they show up in the dropdown menu
// var categories = ['All', 'Shapes', 'Gaming', 'Animals', 'Food'];

function addButtonPress(currentFilter) {
    // reveal the UI for element selecting
    document.getElementById('uiElem').classList.remove('hide-center');
}

function fillDropDown(categories){
    var dd = document.getElementById('myDropdown');
    for (i = 0; i < categories.length; i++) {
        currentCategory = categories[i];
        var a = document.createElement("a");
        a.setAttribute("onclick", "filter('" + currentCategory + "')");
        a.innerText = currentCategory;
        dd.appendChild(a);
    }
}


//Displays a single item in Add item box
function createGalleryItem(classString, thisFunction, imageSource, name) {

    var objs = document.getElementsByClassName("objects")[0];

    var div1 = document.createElement("div");
    div1.setAttribute("class", classString);
    div1.setAttribute("onClick", thisFunction);
    div1.setAttribute("style", "display: inline");

    var a = document.createElement("a");
    a.setAttribute("target", "_blank");

    var image = document.createElement("img");
    image.setAttribute("src", imageSource);
    image.setAttribute("alt", name);
    image.setAttribute("width", "300");
    image.setAttribute("height", "300");

    a.appendChild(image);
    div1.appendChild(a);
    objs.appendChild(div1);
}


//Cancels adding an item
function cancelAddButtonPress() {
    stateChange('stateA');
    // removeAddItemsBox();
    hideCenter(document.getElementById('uiElem'));
    revealButtons(document.getElementsByClassName('buttonSummon'));
    revealCursor();
    // createSummonButton();
}

//Uploads custom model
function uploadItemButtonPress() {
    console.log("UPLOAD");
}

//Check Key, for hitting enter to search
function checkKey(event) {
    var key = event.keyCode;
    if (key == 13) {
        searchButtonPress();
    }
}

function searchButtonPress() {
    var value = document.getElementById('search').value;
    if (!(value === "")) {
        search(value.toLowerCase());
    }
}

//Search for a specific item
function search(searchTerm) {
    if (!(search === "")) {
        var items = document.getElementsByClassName(currentFilter);
        for (i = 0; i < items.length; i++) {
            var currentItem = items[i];
            var className = currentItem.getAttribute("class");
            var classList = className.split(' ');
            for (j = 1; j< classList.length; j++) {
                var currentClass = classList[j];
                currentClass = currentClass.replace('_',' ');
                var value = currentClass.indexOf(searchTerm);
                if (value !== -1) {
                    console.log("MATCH");
                    currentItem.setAttribute("style","display: inline");
                    j = classList.length;
                } else {
                    currentItem.setAttribute("style","display: none");
                }
            }
        }
    }
}

//filter items by category
function filter(category) {
    var button = document.getElementsByClassName("dropbtn")[0];
    button.innerText = category;
    category = category.toLowerCase();
    if (category === "all") {
        var items = document.getElementsByClassName("gallery");
        currentFilter = "gallery";
        for (i = 0; i < items.length; i++) {
            var currentItem = items[i];
            currentItem.setAttribute("style","display: inline");
        }
    } else {
        currentFilter = category;
        var items = document.getElementsByClassName("gallery");
        for (i = 0; i < items.length; i++) {
            var currentItem = items[i];
            currentItem.setAttribute("style","display: none");
        }
        var items2 = document.getElementsByClassName(category);
        for (i = 0; i < items2.length; i++) {
            var currentItem = items2[i];
            currentItem.setAttribute("style","display: inline");
        }
    }
}
// var itemSearchBoxStructure = ["center", ["id", "uiElem"],
//                                 ["child", ["div", ["class", "boxAndButtons"],
//                                     ["child", ["div", ["class", "objectAddBox"],
//                                         ["child", ["center",
//                                             ["child", ["div", ["class", "searchbar"],
//                                                 ["child", ["div", ["class", "dropdown"],
//                                                     ["child", ["button", ["class", "dropbtn"], ["innerText", "All"]]],
//                                                     ["child", ["div", ["id", "myDropdown"], ["class", "dropdown-content"],
//                                                         ["child", ["a", ["onclick", "filter(All)"], ["innerText", "All"]]],
//                                                         ["child", ["a", ["onclick", "filter(Shapes)"], ["innerText", "Shapes"]]],
//                                                         ["child", ["a", ["onclick", "filter(Gaming)"], ["innerText", "Gaming"]]],
//                                                         ["child", ["a", ["onclick", "filter(Animals)"], ["innerText", "Animals"]]],
//                                                         ["child", ["a", ["onclick", "filter(Food)"], ["innerText", "Food"]]],
//                                                     ]]
//                                                 ]],
//                                                 ["child", ["div", ["class", "box"],
//                                                     ["child", ["div", ["class", "container-4"],
//                                                         ["child", ["input", ["onkeypress", "checkKey(event)"], ["type", "search"], ["class", "search"], ["id", "search"], ["placeholder", "Search..."]]],
//                                                         ["child", ["button", ["class", "icon"], ["onclick", "searchButtonPress()"],
//                                                             ["child", ["i", ["class", "fa fa-search"]]]
//                                                         ]]
//                                                     ]]
//                                                 ]]
//                                             ]],
//                                             ["child", ["div", ["class", "objects"]]]
//                                         ]]
//                                     ]],
//                                     ["child", ["button", ["class", "uploadButton"], ["innerText", "Upload"]]],
//                                     ["child", ["button", ["class", "cancelButton"], ["innerText", "Cancel"], ["onclick", "cancelAddButtonPress()"]]]
//                                 ]]
//                             ];

// function interpretList(struct) {
//     var body = document.getElementById("ui");
//     var items = interpretItem(struct);
//     body.appendChild(items);
// }

// function interpretItem(currentStruct) {
//     var currentItem = document.createElement(currentStruct[0]);
//     //console.log(currentItem);
//     for (j = 1; j < currentStruct.length; j++) {
//         var currentAttribute = currentStruct[j][0];
//         //console.log(currentAttribute);
//         if (currentAttribute === "innerText") {
//             currentItem.innerText = currentStruct[j][1];
//         } else if (currentAttribute === "child") {
//             k = j;
//             currentItem.appendChild(interpretItem(currentStruct[j][1]));
//             j = k;
//         } else {
//             currentItem.setAttribute(currentStruct[j][0], currentStruct[j][1]);
//         }
//     }
//     return currentItem;
// }



//Editing Box Stuff

function displayModel(i) {
    // removeAddItemsBox();
    // document.getElementById('uiElem').classList.add('hide-center');
    // console.log(i);
    stateChange('stateC');
    createModel(i);

    // reveal editing options for model
    // revealCenter(document.getElementById('editBoxCenter'));
}

function moveButtonPress() {
    // removeEditingOptionsBox();
    hideCenter(document.getElementById('editOptionsBox'));
    createEditBox("move");
}

function rotateButtonPress() {
    removeEditingOptionsBox();
    createEditBox("rotate");
}

function resizeButtonPress() {
    removeEditingOptionsBox();
    createEditBox("resize");
}

function colorButtonPress() {
    removeEditingOptionsBox();
    createEditBox("color");
}

function finishButtonPress() {
    // createSummonButton();
    revealButtons(document.getElementsByClassName('buttonSummon'));
    revealTable(document.getElementById("buttonTable"));
    hideCenter(document.getElementById('editBoxCenter'));
    revealCursor();
    // removeEditingOptionsBox();
    // var item = document.getElementById("item");
    // itemNum++;
    // item.setAttribute("id", itemNum);
    // items.push(itemNum);
    // createRemoveButton();
}

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

function deleteButtonPress() {
    createSummonButton();
    removeEditingOptionsBox();
    createRemoveButton();
    disappear();
    createRemoveButton();
}

//Create one of the smaller edit boxes
function createEditBox(type) {
    var center = document.getElementsByClassName("editBoxCenter")[0];

        var div1 = document.createElement("div");
        div1.setAttribute("class", "editingBox");

            var div2 = document.createElement("div");
            div2.setAttribute("class", "editOptionsBox");

            if (type === "move") {

                var button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('x', '-1')");
                     var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-left");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('y', '+1')");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-up");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('z', '+1')");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-plus");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('x', '+1')");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-right");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('y', '-1')");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-down");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('z', '-1')");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-minus");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                // var position = [object.getAttribute("position").x, object.getAttribute("position").y, object.getAttribute("position").z];
                // changes.push(["move", object.getAttribute('position')]);

            } else if (type === "rotate") {
                var button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "rotate('y', -5, false)");
                     var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-left");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "rotate('x', -5, false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-up");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "rotate('z', -5, false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-rotate-left");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "rotate('y', 5, false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-right");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "rotate('x', 5, false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-down");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "rotate('z', 5, false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-rotate-right");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);
                var origRotate = document.getElementById("item").getAttribute("rotation").y;
                console.log(origRotate);
                changes.push(["rotate", origRotate]);

            } else if (type === "resize") {
                button = document.createElement("button");
                button.setAttribute("class", "resizeButton");
                button.setAttribute("onclick", "resize(0.1)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-plus");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "resizeButton");
                button.setAttribute("onclick", "resize(-0.1)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-minus");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);
                var item = document.getElementById("item");
                var sizeInfo = [[item.getAttribute("scale").x, item.getAttribute("scale").y, item.getAttribute("scale").z]];
                changes.push(["size", sizeInfo]);

            } else if (type === "color") {
                if (colorMode === "color") {
                        //Creates JsColor field
                        var input = document.createElement('INPUT')
                        var picker = new jscolor(input)

                        //Changes object color as user changes color field
                        if (!(document.getElementById("item").getAttribute('class') === "model")) {
                        var origColor = document.getElementById("item").getAttribute('color');
                        changes.push(["color", origColor]);
                        } else {
                        var origColor = document.getElementById("item").getAttribute("material").color;
                        changes.push(["color", origColor]);
                        }

                        //Changes text in field input to appropriate string
                        picker.fromString(origColor);
                        input.setAttribute("class", "colorPicker");
                        div2.appendChild(input);
                        button = document.createElement("button");
                        button.setAttribute("class", "resizeButton");
                        button.setAttribute("onclick", "chooseMaterial()");
                        button.innerText = "Material";
                        div2.appendChild(button);
                } else {
                        button = document.createElement("button");
                        button.setAttribute("class", "resizeButton");
                        button.setAttribute("onclick", "chooseColor()");
                        button.innerText = "Color";
                        div2.appendChild(button);
                }
            }

            div1.appendChild(div2);

            div2 = document.createElement("div");
            div2.setAttribute("class", "finalOptionsButtonBox");

                button = document.createElement("button");
                button.setAttribute("class", "completeButton");
                button.setAttribute("onclick", "finishEditingAttribute()");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-check");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "cancelEditButton");
                button.setAttribute("onclick", "cancelEditingAttribute()");
                    icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-times");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

        div1.appendChild(div2);

    center.appendChild(div1);
}


function finishEditingAttribute() {
    removeEditingOptionsBox();
    createEditingOptionBox();
}

function cancelEditingAttribute() {
        removeEditingOptionsBox();
        createEditingOptionBox();
        undoButtonPress();
}

/*
  Moves an object and synchronizes network
  @params axis: 'x', 'y', 'z' and value: '+1', '-1'
*/
function move(axis, value) {
  // Get the first object's id for now.
  // TODO: need to pick an object from user selection
  var itemId = Object.keys(NAF.entities.entities)[2];
  var object = NAF.entities.getEntity(itemId);
  var val = parseInt(value);

  // Update position
  object.getAttribute('position')[axis] += val;

  var entityData = {
    networkId: itemId,
    owner: NAF.clientId,
    template: "#pokemon-model",
    components: { position: object.getAttribute('position') }
  };
  NAF.entities.updateEntity(NAF.clientId, null, entityData);
}

// function rotate(axis, direction) {
//     console.log("Rotate: " + axis + " " + direction);
// }

// function resize(direction) {
//     console.log("Resize: " + direction);
// }