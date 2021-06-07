// set global variables
var parksArray = [];
var parksWithTrails = [];
var parksWithMonuments = [];

// initialize building parksArray, starting with building a list of which parks have official trails
getParkTrails();

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
        //console.log(parksWithTrails[0]);
        getParkMonuments();
        })
    console.log('trails done');
    
};

// build a list of parks that feature monuments
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
                    // add park name to parksWithMonuments array if name does not already exits in that array, preventing duplicate entries
                    if (!parksWithMonuments.includes(parkName)) {
                        parksWithMonuments.push(parkName);
                    }
                }
            }
        getParkLocations();
        })
    console.log('monuments done');
    
};

// Get names, addresses, and coordinates for parks
function getParkLocations() {

            for (var i = 0; i < parkCoords.length; i++) {
                // console.log(parkCoords[i]);
                var parkName = parkCoords[i].name;
                var location = parkCoords[i].Location;
                var lat = parkCoords[i].lat;
                var lon = parkCoords[i].lon;
                // Combine information from previous API searches into new park objects and build a local parksArray
                var newPark = {};
                newPark['name'] = parkName;
                newPark['location'] = location;
                newPark['lat'] = lat;
                newPark['lon'] = lon;
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
    console.log('parksArray ready');
};
