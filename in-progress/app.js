//list of lists with class String, function, imagesource, and name for each item
var galleryList = [["gallery sphere shapes", "displayModel(0)", "sphere.png", "sphere"],
                ["gallery cube shapes", "displayModel(1)", "cube.png", "cube"],
                ["gallery torus shapes", "displayModel(2)", "torus.png", "torus"],
                ["gallery pokeball gaming", "displayModel(3)", "pokeball.png", "pokeball"],
                ["gallery cat animals", "displayModel(4)", "cat.png", "pokeball"],
                ["gallery dog animals", "displayModel(5)", "dog.png", "pokeball"],
                ["gallery hamburger food", "displayModel(6)", "hamburger.png", "pokeball"],
                ["gallery ice_cream food", "displayModel(7)", "ice cream.png", "pokeball"],
                ["gallery lemon food", "displayModel(8)", "lemon.jpg", "pokeball"],
                ["gallery space_invader gaming", "displayModel(9)", "space invader.png", "pokeball"],
                ["gallery squirrel animals", "displayModel(10)", "squirrel.jpg", "pokeball"],
                ["gallery whale animals", "displayModel(11)", "whale.png", "pokeball"],
                ["gallery mario gaming", "displayModel(12)", "mario.png", "pokeball"]];

var currentFilter = "gallery";

var categories = ['All', 'Shapes', 'Gaming', 'Animals', 'Food'];

function removeAddItemsBox() {
    document.querySelector("body").removeChild(document.getElementById("uiElem"));
}

function createAddItemsBox() {
    var body = document.querySelector("body");
    body.removeChild(document.getElementById("addButton"))
        var center1 = document.createElement("center");
        center1.setAttribute("id", "uiElem");

        var div1 = document.createElement("div");
        div1.setAttribute("class", "boxAndButtons");

            var div2 = document.createElement("div");
            div2.setAttribute("class", "objectAddBox");

                var center = document.createElement("center");

                    var div3 = document.createElement("div");
                    div3.setAttribute("class", "searchbar");

                        var div4 = document.createElement("div");
                        div4.setAttribute("class", "dropdown");

                            var button = document.createElement("button");
                            button.setAttribute("class", "dropbtn");
                            button.innerText = "All";

                            var div5 = document.createElement("div");
                            div5.setAttribute("id", "myDropdown");
                            div5.setAttribute("class", "dropdown-content");

                                for (i = 0; i < categories.length; i++) {
                                    currentCategory = categories[i];
                                    var a = document.createElement("a");
                                    a.setAttribute("onclick", "filter('" + currentCategory + "')");
                                    a.innerText = currentCategory;
                                    div5.appendChild(a);
                                }
                        div4.appendChild(button);
                        div4.appendChild(div5);

                        var div6 = document.createElement("div");
                        div6.setAttribute("class", "box");

                            var div7 = document.createElement("div");
                            div7.setAttribute("class", "container-4");

                                var input = document.createElement("input");
                                input.setAttribute("onkeypress", "checkKey(event)");
                                input.setAttribute("type", "search");
                                input.setAttribute("class", "search");
                                input.setAttribute("id", "search");
                                input.setAttribute("placeholder", "Search...");

                                var button2 = document.createElement("button");
                                button2.setAttribute("onclick", "searchButtonPress()");
                                button2.setAttribute("class", "icon");

                                    var icon = document.createElement("i");
                                    icon.setAttribute("class", "fa fa-search");

                                button2.appendChild(icon);

                            div7.appendChild(input);
                            div7.appendChild(button2);

                        div6.appendChild(div7);

                    div3.appendChild(div4);
                    div3.appendChild(div6);


                    var div8 = document.createElement("div");
                    div8.setAttribute("class", "objects");

                center.appendChild(div3);
                center.appendChild(div8);


            div2.appendChild(center);

            var button3 = document.createElement("button");
            button3.setAttribute("class", "uploadButton");
            button3.innerText = "Upload";

            var button4 = document.createElement("button");
            button4.setAttribute("class", "cancelButton");
            button4.setAttribute("onclick", "cancelAddButtonPress()");
            button4.innerText = "Cancel";

        div1.appendChild(div2);
        div1.appendChild(button3);
        div1.appendChild(button4);

    center1.appendChild(div1);
    body.appendChild(center1);

    displayAllItems();
}

function cancelAddButtonPress() {
    removeAddItemsBox();
    createAddButton();
}
function createAddButton() {
    var button = document.createElement("button");
    button.setAttribute("id", "addButton");
    button.setAttribute("onclick", "addButtonPress()");
    button.innerText = "Add";

    document.querySelector("body").appendChild(button);
}
function addButtonPress() {
    currentFilter = "gallery";
    createAddItemsBox();
}

function displayModel(i) {
    removeAddItemsBox();
    createAddButton();
    console.log(i);
}
function checkKey(event) {
    var key = event.keyCode;
    if (key == 13) {
        searchButtonPress();
    }
}

function myFunct() {
    console.log("CLICKED");
}
function searchButtonPress() {
    var value = document.getElementById('search').value;
    if (!(value === "")) {
        search(value.toLowerCase());
    }
}

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

function createGalleryItem(classString, thisFunction, imageSource, name) {
    var scene = document.getElementsByClassName("Objects")[0];

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

function displayAllItems() {
    for (i = 0; i < galleryList.length; i++) {
        galleryDetails = galleryList[i];
        createGalleryItem(galleryDetails[0], galleryDetails[1], galleryDetails[2], galleryDetails[3]);
    }
}
