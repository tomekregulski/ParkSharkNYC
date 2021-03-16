// declare global variables
var gpsBtn = document.getElementById('gps');
var zipSearch = document.getElementById('go');
var zipInput = document.getElementById('zip');
var userLat;
var userLon;
var parkResults = [];

// set click event listeners for buttons
gpsBtn.addEventListener('click', getLocation);
zipSearch.addEventListener('click', zipCoord); // 

// pull coordinates for zip code
function zipCoord(event)  {
    event.preventDefault();
    console.log('working');
    var userZip = zipInput.value;
    console.log(userZip); 
    for (var i = 0; i < zipCodes.length; i++) {
        if (zipCodes[i].zip == userZip) {
        console.log(zipCodes[i].latitude);
        console.log(zipCodes[i].longitude);
        userLat = zipCodes[i].latitude;
        userLon = zipCodes[i].longitude;
        console.log(userLat, userLon);
        }
    }
    checkParkCoord();
};

// Captures user's current location and sets user lat/lon
function getLocation() {
    window.navigator.geolocation.getCurrentPosition((location) => {
        //   commented out until needed by other functions
          userLat = location.coords.latitude;
          userLon = location.coords.longitude;
          console.log(userLat);
          console.log(userLon);
          // pass to parksFilter
        // distance(latNew, lonNew, 40.7411, -73.9897)
        checkParkCoord();
      })
  };
  
  // pulls coordinates of each park, to be checked for distance from user lat/lon
  function checkParkCoord() {
    console.log('hi');
    for (var i = 0; i < parksArray.length; i++) {
        var parkLat = parksArray[i].coord[1];
        var parkLon = parksArray[i].coord[0];
        var park = parksArray[i].name;
        // capture index of each park into a variable
        var parkIndex = i; 
        distance(userLat, userLon, parkLat, parkLon, park, parkIndex);
    }
    // showMap();
};

function distance(lat1, lon1, lat2, lon2, park, parkIndex) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;    
    if ((12742 * Math.asin(Math.sqrt(a))) < 1 ) {
        // log index of each valid park, which can be passed to Map Marker and Search Results loop functions
        var distance = (12742 * Math.asin(Math.sqrt(a)));
        // console.log(distance);
        var closeParkIndex = parkIndex;
        // console.log(closeParkIndex);
        // Alternatively, we can set up each detail here as a variable to get passed to Map Marker and Search Results loop functions, whichever ends up being easier
        // var closeParkName = park
        // console.log(closeParkName);
        // var closeParkAddress = parksArray[closeParkIndex].address;
        // console.log(closeParkAddress);
        // var closeParkMonument = parksArray[closeParkIndex].monument;
        // console.log(closeParkMonument);
        // var closeParkTrail = parksArray[closeParkIndex].trails;
        // console.log(closeParkTrail);
        var closePark = {};
        closePark['name'] = park;
        closePark['address'] = parksArray[closeParkIndex].address;
        closePark['monument'] = parksArray[closeParkIndex].monument;
        closePark['trails'] = parksArray[closeParkIndex].trails;
        closePark['distance'] = distance;
        closePark['parksIndex'] = parkIndex;
        closePark['coord'] = [lat2,lon2]
        // console.log(closePark);
        parkResults.push(closePark);
        } 
    }; // 2 * R; R = 6371 km

// now ready to generate results