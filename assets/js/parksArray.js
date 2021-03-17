// set global variables
var parksArray = [];
var parksWithTrails = [];
var parksWithMonuments = [];

// initialize building parksArray by starting with trails
// getParkTrails();

// function getParkTrails() {

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
        //console.log(parksWithMonuments[0]);
        getParkLocations();
        })
    console.log('monuments done');
    
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
        //console.log(parksArray.length);//here it prints 100 to console
        //console.log(parksArray[0]);
    })
    console.log('ready');
    
    // we now have a locally available array of all parks, including whether or not they have a monument or trail (most have neither)
};
