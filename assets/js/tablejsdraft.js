//calls memories object from local storage and converts JSON to JS object
var memories = JSON.parse(localStorage.getItem("memories"))


window.onload = function loadMemories () {
    
    console.log(memories);

    //extract values for table header
    var col = [];
    for (var i = 0; i < memories.length; i++) {
        for (var key in memories[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    console.log(col);

    //create table
    var table = document.createElement("table");

    //create header row using extracted data
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //add JSON data to table as individual rows
    for (var i = 0 ; i < memories.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = memories[i][col[j]];
        }
    }

    console.log(table);

    //displays data in body
    var divShowData = document.getElementById("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);


};

console.log(memories);

//shows and hides the memories table on button click
function showHide() {
    
    if (memories == ""){
        alert("You have no saved memories.");
        return false;
    } else {
        var x = document.getElementById("showData");

        if (x.style.display === "none") {
            x.style.display = "block";
            var showButton = document.getElementById("show");
            showButton.innerHTML = "Hide Memories";
        } else {
            x.style.display = "none";
            var showButton = document.getElementById("show");
            showButton.innerHTML = "Show Memories";
        }
    }
  };

  
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