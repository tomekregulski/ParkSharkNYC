//retrieves raw memories JSON from storage
var memJSON = localStorage.getItem("memories");

var savedMem = [];

console.log(memJSON);

//sorts objects in array by property
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
console.log(isChecked);

slider.addEventListener('change', function() {
    savedMem = JSON.parse(memJSON);
    if (isChecked === true) {
        savedMem.sort(sortByProperty("Date"));
        console.log(savedMem);
        loadMemories ();
        isChecked = false;
        saveCheck();
        console.log(isChecked);
    } else {
        savedMem.sort(sortByProperty("Park"));
        console.log(savedMem);
        isChecked = true;
        loadMemories ();
        saveCheck();
        console.log(isChecked);
    }
  });

  function saveCheck (){
    localStorage.setItem("slider", isChecked);
}

window.onload = function() {
    slider = JSON.parse(localStorage.getItem("slider"));
    savedMem = JSON.parse(localStorage.getItem("memories"))
    if (isChecked === true) {
        savedMem.sort(sortByProperty("Park"));
        loadMemories();
        return;
    } else {
        savedMem.sort(sortByProperty("Date"));
        loadMemories();
        return;
    }
}

rawMem = [];

//loads table of saved memories
function loadMemories () {

    console.log(savedMem);

    //takes sortMem JSON and converts it to JS object with dates as objects
    rawMem = JSON.stringify(savedMem)
    var sortMem = JSON.parse(rawMem, function (key, value) {
    if (key == "Date") {
        var dateObj = new Date(value);
        console.log(dateObj);
        var newDate = moment(dateObj).format("ll");
        return newDate;
      } else {
        return value;
      }
});
    
    console.log(sortMem);

    //extracts values for table header
    var col = [];
    for (var i = 0; i < sortMem.length; i++) {
        for (var key in sortMem[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    console.log(col);

    //creates table
    var table = document.createElement("table");

    //creates header row using extracted data
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //adds JSON data to table as individual rows
    for (var i = 0 ; i < sortMem.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = sortMem[i][col[j]];
        }
    }

    //displays data in body
    var divShowData = document.getElementById("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);


};

//shows and hides the memories table on button click
function showHide() {
    
    if (savedMem == ""){
        alert("You have no saved memories.");
        return false;
    } else {
        let x = document.getElementById("showData");
        let y = document.getElementById("container");
        let z = document.getElementById("slider round");
        let w = document.getElementById("clear");
        let u = document.querySelector("h4");

        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
            z.style.display = "block";
            w.style.display = "block";
            u.style.display = "block";
            var showButton = document.getElementById("show");
            showButton.innerHTML = "Hide Memories";
        } else {
            x.style.display = "none";
            y.style.display = "block";
            z.style.display = "none";
            w.style.display = "none";
            u.style.display = "none";
            var showButton = document.getElementById("show");
            showButton.innerHTML = "Show Memories";
        }
    }
  };

  //clears memories
  function clearMem () {
    if (savedMem == ""){
        alert("You have no saved memories.");
        return false;
    } else {
        var warning = confirm("WARNING! You are about to erase all of your saved data. This cannot be undone. Do you want to proceed?");
        if (warning === true){
            localStorage.clear("memories");
            location.reload();
        }
        else {
        return false;
        }
    }
  };