//list of lists with class String, function, imagesource, and name for each item
var galleryList = [["gallery sphere shapes", "myFunct()", "sphere.png", "sphere"],
                ["gallery cube shapes", "myFunct()", "cube.png", "cube"],
                ["gallery torus shapes", "myFunct()", "torus.png", "torus"],
                ["gallery pokeball gaming", "myFunct()", "pokeball.png", "pokeball"],
                ["gallery cat animals", "myFunct()", "cat.png", "pokeball"],
                ["gallery dog animals", "myFunct()", "dog.png", "pokeball"],
                ["gallery hamburger food", "myFunct()", "hamburger.png", "pokeball"],
                ["gallery ice_cream food", "myFunct()", "ice cream.png", "pokeball"],
                ["gallery lemon food", "myFunct()", "lemon.jpg", "pokeball"],
                ["gallery space_invader gaming", "myFunct()", "space invader.png", "pokeball"],
                ["gallery squirrel animals", "myFunct()", "squirrel.jpg", "pokeball"],
                ["gallery whale animals", "myFunct()", "whale.png", "pokeball"],
                ["gallery mario gaming", "myFunct()", "mario.png", "pokeball"]];

var currentFilter = "gallery";

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
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
                var value = classList[j].indexOf(searchTerm);
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
