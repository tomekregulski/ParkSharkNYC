// set global variables
var parksArray = [];
var parksWithTrails = [];
var parksWithMonuments = [];

var goBtn = document.getElementById("go")
// add go button handler 
//goBtn.addEventListener("click", getParkTrails);
// initialize building parksArray by starting with trails
getParkTrails();

function createResults() {
    //render park names in ol
    for (var i = 0; i < 1; i++) {//testing smaller array for i < parksArray.length
        //create first li and so on...
        var nameList = document.createElement('li');
        var trailList = document.createElement('li');
        var monumentList = document.createElement('li');

        nameList.textContent = parksArray[i];
        if (parksWithTrails.includes(parksArray[i]) ){
            trailList.textContent = 'Trail available: ' + 'Yes';
        } else {
            trailList.textContent = 'Trail available: ' + 'No';
        }
        if (parksWithMonuments.includes(parksArray[i]) ){
            monumentList.textContent = 'Monument available: ' + 'Yes';
        } else {
            monumentList.textContent = 'Monument available: ' + 'No';
        }
        //inside ol, append each li
        var parksList = document.createElement("ol");
        parksList.appendChild(nameList);
        parksList.appendChild(trailList);
        parksList.appendChild(monumentList);

        //inside div, append each ol
        var resultEl = document.getElementById("results");
        resultEl.appendChild(parksList);
    }
}

function getParkTrails() {

    var parksUrl = 'https://data.cityofnewyork.us/resource/vjbm-hsyr.json'

    fetch(parksUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            // extract park name for each trail
            for (var i = 0; i < data.length; i++) {
                var parkName = data[i].park_name;
                // if trail is in a park, extract the name and add to parksWithTrails
                if (!parksWithTrails.includes(parkName)) {
                    parksWithTrails.push(parkName);
                }
            }
        })
    console.log('trails done');
    console.log(parksWithTrails);
    getParkMonuments();
};


function getParkMonuments() {

    var parksUrl = 'https://data.cityofnewyork.us/resource/6rrm-vxj9.json'

    fetch(parksUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            // check each monument to see if it is in a park
            for (var i = 0; i < data.length; i++) {
                // if monument is in a park, extract the name and add to parksWithMonuments
                if (data[i].parkprop === "Y") {
                    var parkName = data[i].parkname;
                    // add park name to parksWithMonuments array if name does not already exits in that array, aka prevent duplicate entries
                    if (!parksWithMonuments.includes(parkName)) {
                        parksWithMonuments.push(parkName);
                    }
                }
            }
        })
    console.log('monuments done');
    console.log(parksWithMonuments);
    getParkLocations();
};

function getParkLocations() {

    var parksUrl = 'https://data.cityofnewyork.us/resource/enfh-gkve.json'

    fetch(parksUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            for (var i = 0; i < data.length; i++) {
                var parkName = data[i].signname;
                var address = data[i].location;
                var coord = data[i].multipolygon.coordinates[0][0][0];
                var newPark = {};
                newPark['name'] = parkName;
                newPark['address'] = address;
                newPark['coord'] = coord;
                if (parksWithTrails.includes(parkName)) {
                    newPark['trails'] = 'Yes';
                } else {
                    newPark['trails'] = 'No';
                }
                if (parksWithMonuments.includes(parkName)) {
                    newPark['monument'] = 'Yes';
                } else {
                    newPark['monument'] = 'No';
                }
                parksArray.push(newPark);
        }
    })
    console.log('ready');
    console.log(parksArray);
    // we now have a locally available array of all parks, including whether or not they have a monument or trail (most have neither)
    createResults();
};
