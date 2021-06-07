// declare global variables
var gpsBtn = document.getElementById('gps');
var zipSearch = document.getElementById('go');
var zipInput = document.getElementById('zip');
var userLat;
var userLon;
var parkResults;
var mapImage = document.getElementById('mapImg');
var popupArray = [];
var map;
var markerLayer;

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
    window.navigator.geolocation.getCurrentPosition((location) => {
          userLat = location.coords.latitude;
          userLon = location.coords.longitude;
        checkParkCoord();
      })
  };
  
// pull coordinates of each park, to be checked for distance from user lat/lon
function checkParkCoord() {
    // clear parkResults array and remove any results cards from previous search
    parkResults = [];
    var resultsNode = document.getElementById("results");
    resultsNode.innerHTML = '';
    // create resultsArray for current search
    for (var i = 0; i < parksArray.length; i++) {
        var parkLat = parseFloat(parksArray[i].lat);
        var parkLon = parseFloat(parksArray[i].lon);
        var park = parksArray[i].name;
        var index = [i];
        distance(userLat, userLon, parkLat, parkLon, park, index);
    }
    createResults();
    showMap();
};

// Calculate the distance of each park from the search coordinates. Any park that is within one (1) mile will be pushed to the parkResults array and rendered as a search result
function distance(lat1, lon1, lat2, lon2, park, index) {
    var p = 0.017453292519943295; 
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    if ((12742 * Math.asin(Math.sqrt(a))) < 1 ) {
        var closePark = {};
        closePark['name'] = park;
        closePark['location'] = parksArray[index].location;
        closePark['monument'] = parksArray[index].monument;
        closePark['trails'] = parksArray[index].trails;
        closePark['lat'] = parksArray[index].lat;
        closePark['lon'] = parksArray[index].lon;
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
        var location = document.createElement('p');
        var monumentList = document.createElement('p');
        var trailList = document.createElement('p');
        nameList.innerText = parkResults[i].name;
        location.innerText = parkResults[i].location;
        console.log(parkResults[i].location);
        monumentList.innerText = 'Monuments: ' + parkResults[i].monument
        trailList.innerText = 'Trails: ' + parkResults[i].trails

        //append and apply styling
        var parksdiv = document.createElement("div");
        
        parksdiv.appendChild(nameList);
        parksdiv.appendChild(location);
        parksdiv.appendChild(monumentList);
        parksdiv.appendChild(trailList);
        
        parksdiv.setAttribute("class", "panel has-background-primary-light resultCard");
        nameList.setAttribute('class', 'panel-heading has-background-primary-dark has-text-primary-light');
        location.setAttribute('class', 'subtitle-is-7 has-text-primary-dark has-text-left')
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

// Reset map layer if present from a previous search
function checkMap() {
    var container = L.DomUtil.get('map');
    var mapDiv = document.getElementById('map');
        if(container != null){
            container._leaflet_id = null;
            mapDiv.setAttribute('class', 'map-div.show');
        }
}

// Show the map, centered on the user coordinates
function showMap() {
    checkMap();
    var map = L.map('map').setView([userLat, userLon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    createMarkers(map);
}

// Create and place the markers for each park in parkResults
function createMarkers(map) {
    popupArray = [];
    console.log("creating popups");
    for (var i = 0; i < parkResults.length; i++) {
        var lon = parkResults[i].lon;
        var lat = parkResults[i].lat;
        console.log(lat);
        console.log(lon);
        var name = parkResults[i].name;
        var location = parkResults[i].location;
        var monument = parkResults[i].monument;
        var trail = parkResults[i].trails;
        console.log(name, location, monument, trail);
        var popupContent = `${name}`;
        console.log(popupContent);
        
        var markerLocation = new L.LatLng(lat, lon);
        var marker = new L.Marker(markerLocation);

        marker.bindTooltip(`${name}<br>${location}<br>Monuments: ${monument}<br>Trails: ${trail}`)
        popupArray.push(marker)
        
    }
    var markerLayer = L.layerGroup(popupArray);
    map.addLayer(markerLayer);
}