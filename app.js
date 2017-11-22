"use strict";

var notes = {
    notetitle: "default title",
    content: "default content",
    importance: 5,
    duedate: new Date()
}

var counter = 0;

// JS for toggle
/*
window.addEvent('domready', function () {
    $$('input').set({
        events: {
            change: function (el) {
                $$('label').removeClass('selected');
                this.getParent('label').addClass('selected');
            }
        }
    });
});
*/

/*****************************************************************************
*
* Event listeners for UI elements
*
****************************************************************************/


function newNote() {
    //opens New Note window (will probably be replaced by link idk yet)
    window.location.replace("newnote.html");
};


function cancelNewNote() {
    //adds Cancel functionality for new note window
    window.location.replace("index.html");
}

function nowOffline() {
    //alerts user that he's offline
    alert("Hey, you're offline! \n But don't worry, we've got you. The app will still work as expected.");
}


/*****************************************************************************
*
* Methods to update the model
*
****************************************************************************/

function saveNewNote() {
    //gets data from note
    counter = localStorage.length;
    let tempnote = new Notelike(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('importance').value);
    //saves note in localStorage
    localStorage.setItem(counter, JSON.stringify(tempnote));
    counter++;
};




function cloneTheNote() {
    //handlebars
    var source = document.getElementById('notes-template2').innerHTML;
    var template = Handlebars.compile(source);
    var container = document.querySelector(".notes");
    var notescontainer = document.getElementById("notescontainer");

    //puts note data into notecard
    for (let i = 0; i < localStorage.length; i++) {
        //gets data from key
        let tempnote = localStorage.getItem(localStorage.key(i));
        notes = JSON.parse(tempnote);
        //fills content into cardtemplate
        var context = { notetitle: notes.notetitle, content: notes.content, importance: notes.importance };
        var html = template(context);
        //notecard is defined as the card that should be duplicated
        var notecard = document.querySelector("div.single-note");
        //new cloned note is defined by cloning the notecard
        var noteclone = notecard.cloneNode(true);
        //here should the notecard be updated with the new note data
        //noteclone.insertAdjacentHTML("beforeend", html);
        noteclone.querySelector("#notes-template").innerHTML = html;
        //the new cloned note is injected in the end of the notescontainer
        notescontainer.insertAdjacentElement("beforeend", noteclone);
                
    }
};




//create a class that will produce the notes objects
class Notelike {
    constructor(notetitle, content, importance) {
        this.notetitle = notetitle;
        this.content = content;
        this.importance = importance;
    }

    set(notetitle, content, importance) {
        this.notetitle = notetitle;
        this.content = content;
        this.importance = importance;
    }
}

//is thought to come to the view/controller page
function submitNewNote() {
    //saves note 
    saveNewNote();
};


/*****************************************************************************
*
* Methods fort the view
*
****************************************************************************/


//if it's not empty create a new node for the note
function cloneNoteCard() {
    var notecard = document.querySelector("div.single-note");
    var noteclone = notecard.cloneNode(true);
    document.body.appendChild(noteclone);
    var notescontainer = document.getElementById("notescontainer");
    notescontainer.insertBefore(noteclone, notescontainer.childNodes[0]);
}


//is called onload of the document
function updateView() {
    //handlebars();
    cloneTheNote();
    updateTheme();
}



/*****************************************************************************
*
* Others
*
****************************************************************************/

//start of styleswitcher
// functions for Styleswitcher 
function changeToDarkTheme() {
    //find all elements with the classname       
    var styleme = document.querySelectorAll(".styleme");
    var i;
    for (i = 0; i < styleme.length; i++) {
        styleme[i].style.backgroundColor = "black";
        styleme[i].style.background = "black";
        styleme[i].style.color = "white";
    }
}

function changeToLightTheme() {
    //find all elements with the classname       
    var styleme = document.querySelectorAll(".styleme");
    var i;
    for (i = 0; i < styleme.length; i++) {
        styleme[i].style.backgroundColor = "white";
        styleme[i].style.background = "white";
        styleme[i].style.color = "grey";
    }
};

function changeToColourfulTheme() {
    //find all elements with the classname       
    var styleme = document.querySelectorAll(".styleme");
    var i;
    for (i = 0; i < styleme.length; i++) {
        styleme[i].style.backgroundColor = "red";
        styleme[i].style.background = "red";
        styleme[i].style.color = "grey";
    }
};


function styleSwitcher() {
    //get selected theme option
    var switcher = document.getElementById("styleswitcher");
    var selectedTheme = switcher.options[switcher.selectedIndex].value;
    localStorage.setItem("themeoption", selectedTheme);
    updateTheme();
}


function updateTheme() {

    //update theme according to the chosen option
    if (localStorage.getItem('themeoption') == "light") {
        console.log("You selected the light theme");
        changeToLightTheme();
    }
    else if (localStorage.getItem('themeoption') == "dark") {
        console.log("You selected the dark theme");
        changeToDarkTheme();
    }
    else if (localStorage.getItem('themeoption') == "colourful") {
        console.log("You selected the colourful theme");
        changeToColourfulTheme();
    }

    else {
        console.log("the styleswitcher doesn't work");
    }
}


//end of styleswitcher


//checks if note is finished or not
function checkedNote() {
    let noteIsFinished = document.getElementById("checknote").checked;
    if (noteIsFinished == true) {
        console.log("it's checked");
        document.getElementById("checked").classList.toggle("newClassName");
    }

    else if (noteIsFinished == false) {
        console.log("it's unchecked");
    }
}


//start of filter function
//help: https://www.w3schools.com/jsref/met_doc_getelementsbyname.asp
//help: 

//version with name
var x = document.getElementsByName("finished");
var i;
for (i = 0; i < x.length; i++) {
    if (x[i].type == "checkbox") {
        x[i].checked = true;
    }
}



//version from codepen
filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("single-note");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}


// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

//end of filter function

//example to get anzahl posts
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_reduce



/*
$(document).ready(function () {
    function init() {
        if (localStorage["title"]) {
            $('#title').val(localStorage["title"]);
        }
        if (localStorage["description"]) {
            $('#description').val(localStorage["description"]);
        }
        if (localStorage["importance"]) {
            $('#importance').val(localStorage["importance"]);
        }
        if (localStorage["enddate"]) {
            $('#enddate').val(localStorage["enddate"]);
        }
    }
    init();
});

$('.stored').change(function () {
    localStorage[$(this).attr('name')] = $(this).val();
});

$('#localStorageTest').submit(function() {
    localStorage.clear();
});
*/
