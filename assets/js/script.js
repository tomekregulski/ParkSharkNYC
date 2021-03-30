// declare global variables
var gpsBtn = document.getElementById('gps');
var zipSearch = document.getElementById('go');
var zipInput = document.getElementById('zip');
var userLat;
var userLon;
var parkResults = [];
var mapImage = document.getElementById('mapImg');

// set click event listeners for buttons
gpsBtn.addEventListener('click', getLocation);
zipSearch.addEventListener('click', zipCoord); // 

// pull coordinates for zip code
function zipCoord(event)  {
    event.preventDefault();
    // clear any prior search results
    parkResults = [];
    var userZip = zipInput.value;
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

// capture user's current location and sets user lat/lon
function getLocation() {
    // clear any prior search results
    parkResults = [];
    window.navigator.geolocation.getCurrentPosition((location) => {
          userLat = location.coords.latitude;
          userLon = location.coords.longitude;
        checkParkCoord();
      })
  };
  
// pull coordinates of each park, to be checked for distance from user lat/lon
function checkParkCoord() {
    for (var i = 0; i < parksArray.length; i++) {
        var parkLat = parksArray[i].coord[1];
        var parkLon = parksArray[i].coord[0];
        var park = parksArray[i].name;
        // capture index of each park into a variable
        var parkIndex = i; 
        distance(userLat, userLon, parkLat, parkLon, park, parkIndex);
    }
    // showMap() is intentionally commented out below for the purpose of Github deployment. 
    //Please reference the Installation and Use section of the README for guidance on setting up functionality locally
    // showMap();
    createResults();
};

// Calculate the distance of each park from the search coordinates. Any park that is within one (1) mile will be pushed to the parkResults array and rendered as a search result
function distance(lat1, lon1, lat2, lon2, park, parkIndex) {
    var p = 0.017453292519943295; 
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;    
    if ((12742 * Math.asin(Math.sqrt(a))) < 1 ) {
        var closeParkIndex = parkIndex;
        var closePark = {};
        closePark['name'] = park;
        closePark['address'] = parksArray[closeParkIndex].address;
        closePark['monument'] = parksArray[closeParkIndex].monument;
        closePark['trails'] = parksArray[closeParkIndex].trails;
        parkResults.push(closePark);
    } 
}; 

function createResults() {
    // clear any previous search result cards
    var resultEl = document.getElementById("results");
    while (resultEl.firstChild) {
        resultEl.removeChild(resultEl.firstChild);
    }
    //render park search results in results div
    for (var i = 0; i < parkResults.length; i++) {
        console.log("rendering div now")
        //create result card elements
        var nameList = document.createElement('p');
        var address = document.createElement('p');
        var monumentList = document.createElement('p');
        var trailList = document.createElement('p');
        nameList.innerText = parkResults[i].name;
        address.innerText = parkResults[i].address;
        monumentList.innerText = 'Monuments: ' + parkResults[i].monument
        trailList.innerText = 'Trails: ' + parkResults[i].trails

        //append and apply styling
        var parksdiv = document.createElement("div");
        
        parksdiv.appendChild(nameList);
        parksdiv.appendChild(address);
        parksdiv.appendChild(monumentList);
        parksdiv.appendChild(trailList);
        
        parksdiv.setAttribute("class", "panel has-background-primary-light resultCard");
        nameList.setAttribute('class', 'panel-heading has-background-primary-dark has-text-primary-light');
        address.setAttribute('class', 'subtitle-is-7 has-text-primary-dark has-text-left')
        monumentList.setAttribute('class', 'control has-text-primary-dark has-text-left');
        trailList.setAttribute('class', 'control has-text-primary-dark has-text-left');
        address.setAttribute('style', 'padding-left: 8px; padding-right: 8px; line-height: 1.5');
        monumentList.setAttribute('style', 'padding-left: 8px');
        trailList.setAttribute('style', 'padding-left: 8px; padding-bottom: 8px');

        //append result card to results div
        resultEl.appendChild(parksdiv);
        resultEl.setAttribute('class', 'box p-4');
    }
};