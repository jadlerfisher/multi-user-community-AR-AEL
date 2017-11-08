//list of lists with class String, function, imagesource, and name for each item
var galleryList = [["gallery pokeball gaming", "displayModel(0)", "assets/images/pokeball.png", "pokeball"]];

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
var currentFilter = "gallery";
//What sections there are and what order they show up in the dropdown menu
var categories = ['All', 'Shapes', 'Gaming', 'Animals', 'Food'];

function addButtonPress() {
    currentFilter = "gallery";
    createAddItemsBox();

    // var body = document.getElementById("ui");
    // body.removeChild(document.getElementById("addButton"));
}

//Creates the Add Item Box
function createAddItemsBox() {
//     var body = document.getElementById("ui");
//     // interpretList(itemSearchBoxStructure);
//         var center1 = document.createElement("center");
//         center1.setAttribute("id", "uiElem");

//         var div1 = document.createElement("div");
//         div1.setAttribute("class", "boxAndButtons");

//             var div2 = document.createElement("div");
//             div2.setAttribute("class", "objectAddBox");

//                 var center = document.createElement("center");

//                     var div3 = document.createElement("div");
//                     div3.setAttribute("class", "searchbar");

//                         var div4 = document.createElement("div");
//                         div4.setAttribute("class", "dropdown");

//                             var button = document.createElement("button");
//                             button.setAttribute("class", "dropbtn");
//                             button.innerText = "All";

//                             var div5 = document.createElement("div");
//                             div5.setAttribute("id", "myDropdown");
//                             div5.setAttribute("class", "dropdown-content");
                                var dd = document.getElementById('myDropdown');
                                for (i = 0; i < categories.length; i++) {
                                    currentCategory = categories[i];
                                    var a = document.createElement("a");
                                    a.setAttribute("onclick", "filter('" + currentCategory + "')");
                                    a.innerText = currentCategory;
                                    dd.appendChild(a);
                                }
//                         div4.appendChild(button);
//                         div4.appendChild(div5);

//                         var div6 = document.createElement("div");
//                         div6.setAttribute("class", "box");

//                             var div7 = document.createElement("div");
//                             div7.setAttribute("class", "container-4");

//                                 var input = document.createElement("input");
//                                 input.setAttribute("onkeypress", "checkKey(event)");
//                                 input.setAttribute("type", "search");
//                                 input.setAttribute("class", "search");
//                                 input.setAttribute("id", "search");
//                                 input.setAttribute("placeholder", "Search...");

//                                 var button2 = document.createElement("button");
//                                 button2.setAttribute("onclick", "searchButtonPress()");
//                                 button2.setAttribute("class", "icon");

//                                     var icon = document.createElement("i");
//                                     icon.setAttribute("class", "fa fa-search");

//                                 button2.appendChild(icon);

//                             div7.appendChild(input);
//                             div7.appendChild(button2);

//                         div6.appendChild(div7);

//                     div3.appendChild(div4);
//                     div3.appendChild(div6);


//                     var div8 = document.createElement("div");
//                     div8.setAttribute("class", "objects");

//                 center.appendChild(div3);
//                 center.appendChild(div8);


//             div2.appendChild(center);

//             var button3 = document.createElement("button");
//             button3.setAttribute("class", "uploadButton");
//             button3.setAttribute("onclick", "uploadItemButtonPress()");
//             button3.innerText = "Upload";

//             var button4 = document.createElement("button");
//             button4.setAttribute("class", "cancelButton");
//             button4.setAttribute("onclick", "cancelAddButtonPress()");
//             button4.innerText = "Cancel";

//         div1.appendChild(div2);
//         div1.appendChild(button3);
//         div1.appendChild(button4);

//     center1.appendChild(div1);
//     body.appendChild(center1);
    document.getElementById('uiElem').classList.remove('hide-center');
    displayAllItems();
}

//Removes the add item box
function removeAddItemsBox() {
    document.getElementById("ui").removeChild(document.getElementById("uiElem"));
}

//Displays a single item in Add item box
function createGalleryItem(classString, thisFunction, imageSource, name) {

    var scene = document.getElementsByClassName("objects")[0];

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
    scene.appendChild(div1);
}

//Displays all the items in the add item box
function displayAllItems() {
    for (i = 0; i < galleryList.length; i++) {
        galleryDetails = galleryList[i];
        createGalleryItem(galleryDetails[0], galleryDetails[1], galleryDetails[2], galleryDetails[3]);
    }
}

//Cancels adding an item
function cancelAddButtonPress() {
    removeAddItemsBox();
    createSummonButton();
}

//Uploads custom model
function uploadItemButonPress() {
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
    removeAddItemsBox();
    console.log(i);
    createModel(i);
    createEditingOptionBox();
}

//Create the main editing box
function createEditingOptionBox() {
    var center = document.getElementsByClassName("editBoxCenter")[0];

    var div1 = document.createElement("div");
    div1.setAttribute("class", "editingBox");

    var div2 = document.createElement("div");
    div2.setAttribute("class", "editOptionsBox");

    var button = document.createElement("button");
    button.setAttribute("class", "editOptionsButton");
    button.setAttribute("onclick", "moveButtonPress()");
    button.innerText = "Move";
    div2.appendChild(button);

    button = document.createElement("button");
    button.setAttribute("class", "editOptionsButton");
    button.setAttribute("onclick", "rotateButtonPress()");
    button.innerText = "Rotate";
    div2.appendChild(button);

    button = document.createElement("button");
    button.setAttribute("class", "editOptionsButton");
    button.setAttribute("onclick", "resizeButtonPress()");
    button.innerText = "Resize"
    div2.appendChild(button);

    button = document.createElement("button");
    button.setAttribute("class", "editOptionsButton");
    button.setAttribute("onclick", "colorButtonPress()");
    button.innerText = "Color"
    div2.appendChild(button);

    div1.appendChild(div2);

    div2 = document.createElement("div");
    div2.setAttribute("class", "finalOptionsButtonBox");

    button = document.createElement("button");
    button.setAttribute("class", "finalOptionsButton");
    button.setAttribute("onclick", "undoButtonPress()");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-undo");
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);
    div2.appendChild(button);

    button = document.createElement("button");
    button.setAttribute("class", "finalOptionsButton");
    button.setAttribute("onclick", "deleteButtonPress()");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-trash");
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);
    div2.appendChild(button);

    button = document.createElement("button");
    button.setAttribute("class", "finishButton");
    button.setAttribute("onclick", "finishButtonPress()");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-check");
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);
    div2.appendChild(button);

    div1.appendChild(div2);

    center.appendChild(div1);
}

function moveButtonPress() {
    removeEditingOptionsBox();
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
    createSummonButton();
    removeEditingOptionsBox();
    var item = document.getElementById("item");
    itemNum++;
    item.setAttribute("id", itemNum);
    items.push(itemNum);
    createRemoveButton();
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
                button.setAttribute("onclick", "move('x', 'down', false)");
                     var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-left");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('y', 'up', false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-up");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('z', 'up', false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-plus");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('x', 'up', false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-right");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('y', 'down', false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-arrow-down");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                button = document.createElement("button");
                button.setAttribute("class", "moveButtons");
                button.setAttribute("onclick", "move('z', 'down', false)");
                    var icon = document.createElement("i");
                    icon.setAttribute("class", "fa fa-minus");
                    icon.setAttribute("aria-hidden", "true");
                    button.appendChild(icon);
                div2.appendChild(button);

                var item = document.getElementById("item");
                var position = [item.getAttribute("position").x, item.getAttribute("position").y, item.getAttribute("position").z];
                changes.push(["move", position]);

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

//Remove an editing box
function removeEditingOptionsBox() {
    document.getElementsByClassName("editBoxCenter")[0].removeChild(document.getElementsByClassName("editingBox")[0]);
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

// function move(axis, direction) {
//     console.log("MOVE: " + axis + " " + direction);
// }

// function rotate(axis, direction) {
//     console.log("Rotate: " + axis + " " + direction);
// }

// function resize(direction) {
//     console.log("Resize: " + direction);
// }
