//retrieve raw memories JSON from storage
var memJSON = localStorage.getItem("memories");
var savedMem = [];
//console.log(memJSON);
//console.log(savedMem);

//sort objects in array of journal entries by property
function sortByProperty(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]){
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        } else {
            return 0;
        }
    }
};

var slider = document.getElementById("slider");
var isChecked = slider.checked;
//console.log(isChecked);

slider.addEventListener('change', function() {
    savedMem = JSON.parse(memJSON);
    if (isChecked === true) {
        savedMem.sort(sortByProperty("Date"));
        //console.log(savedMem);
        loadMemories ();
        isChecked = false;
        saveCheck();
        //console.log(isChecked);
    } else {
        savedMem.sort(sortByProperty("Name"));
        //console.log(savedMem);
        loadMemories ();
        isChecked = true;
        saveCheck();
        //console.log(isChecked);
    }
});

// Save memory function 
function saveCheck () {
    localStorage.setItem("slider", isChecked);
};

// render journal entries in table
window.onload = function() {
    slider = JSON.parse(localStorage.getItem("slider"));
    savedMem = JSON.parse(localStorage.getItem("memories"));
    while (savedMem === null) {
        savedMem = [];
        var noSaved = document.getElementById("noSaved");
        var clearBtn = document.getElementById("clearBtn");
        noSaved.style.display = "block";
        clearBtn.style.display ="none";
    };
    if (isChecked === true) {
        savedMem.sort(sortByProperty("Park"));
        loadMemories();
        return;
    } else {
        savedMem.sort(sortByProperty("Date"));
        loadMemories();
        return;
    }
};

rawMem = [];

//load table of saved memories from journal entries
function loadMemories () {
    //console.log(savedMem);

    //takes sortMem JSON and converts it to JS object with dates as objects
    rawMem = JSON.stringify(savedMem)
    var sortMem = JSON.parse(rawMem, function (key, value) {
        if (key == "Date") {
            var dateObj = new Date(value);
            //console.log(dateObj);
            var newDate = moment(dateObj).format("ll");
            return newDate;
        } else {
            return value;
        }
    });
    
    //console.log(sortMem);

    //extracts values for table header
    var col = [];
    for (var i = 0; i < sortMem.length; i++) {
        for (var key in sortMem[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    //console.log(col);

    //creates table
    var table = document.createElement("table");
    table.className = "table";

    //creates header row using extracted data
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.className = "has-text-primary-light has-background-primary-dark"
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //adds JSON data to table as individual rows
    for (var i = 0 ; i < sortMem.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.className = "has-text-primary-dark is-size-7"
            tabCell.innerHTML = sortMem[i][col[j]];
        }
    }

    //displays data in body
    var divShowData = document.getElementById("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);

};

var x = document.getElementById("memPanel");
var y = document.getElementById("myForm");
var z = document.getElementById("clearSort");
var w = document.getElementById("saveBtn");
var s = document.getElementById("memBtnBox");

//shows and hides the memories table on button click
function show() {
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "block";
    w.innerHTML = "back";
    s.style.display = "none";
  };

function hide () {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
    w.innerHTML = "";
    s.style.display = "block";
};

//clears memories
function clearMem () {
        localStorage.clear("memories");
        location.reload();
};

//hover
var saveFormBtn = document.getElementById("saveForm");

function hoverSave (){
    saveFormBtn.className = "button is-primary is-focused is-fullwidth has-text-weight-bold";
};

function unhoverSave (){
    saveFormBtn.className = "button is-primary is-outlined is-fullwidth has-text-weight-bold";
};

console.log("Thanks for stopping by :)");