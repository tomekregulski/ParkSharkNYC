//retrieves raw memories JSON from storage
var memJSON = localStorage.getItem("memories");

console.log(memJSON);

function sortByProperty(property){
    return function(a,b) {
        if (a[property] > b[property]){
        return 1;
        } else {
            return -1;
        }
    }
};

//var sortDate = memJSON.sort(sortByProperty("Date"));
//console.log(sortDate);

//converts memories JSON to JS object
var memories = JSON.parse(memJSON, function (key, value) {
    if (key == "Date") {
        return new Date(value);
      } else {
        return value;
      }
});

//loads table of saved memories
window.onload = function loadMemories () {
    
    console.log(memories);

    //extracts values for table header
    var col = [];
    for (var i = 0; i < memories.length; i++) {
        for (var key in memories[i]) {
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
    for (var i = 0 ; i < memories.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = memories[i][col[j]];
            
        }
    }

    //displays data in body
    var divShowData = document.getElementById("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);


};

//shows and hides the memories table on button click
function showHide() {
    
    if (memories == ""){
        alert("You have no saved memories.");
        return false;
    } else {
        let x = document.getElementById("showData");
        let y = document.getElementById("container");

        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
            var showButton = document.getElementById("show");
            showButton.innerHTML = "Hide Memories";
        } else {
            x.style.display = "none";
            y.style.display = "block";
            var showButton = document.getElementById("show");
            showButton.innerHTML = "Show Memories";
        }
    }
  };

  //clears memories
  function clearMem () {
    if (memories == ""){
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