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

function displayModel(i) {
    stateChange('stateC');
    createModel(i);
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

