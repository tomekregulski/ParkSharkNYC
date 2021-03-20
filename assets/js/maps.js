var mapDiv = document.getElementById('map');

// render Google Maps after obtaining user's location coordinates
function showMap() {
    mapDiv.setAttribute('class', 'map.open');
    //console.log('hello');
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(userLat, userLon),
    });

    var infowindow = new google.maps.InfoWindow;

    var marker, i;

    // loop through parkResults to compile results of all satisfying locations
    for (i = 0; i < parkResults.length; i++) {  
        marker = new google.maps.Marker({
                position: new google.maps.LatLng(parkResults[i].coord[0], parkResults[i].coord[1]),
                map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(`<p>${parkResults[i].name} <br> Trails: ${parkResults[i].trails} <br> Monument: ${parkResults[i].monument}</p>`);
                    infowindow.open(map, marker);
                }
        })(marker, i));
    }
};