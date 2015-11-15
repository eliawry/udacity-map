// Hardcoded locations of neighborhood pools
var locations = [{
    "latitude": 37.398424,
    "longitude": -122.08733,
    "poolName": "Pool and Hot Tub"
}, {
    "latitude": 37.400426,
    "longitude": -122.081832,
    "poolName": "Max's Pool"
}, {
    "latitude": 37.402233,
    "longitude": -122.082287,
    "poolName": "Hot Tub behind a friend's house"
}, {
    "latitude": 37.401655,
    "longitude": -122.083999,
    "poolName": "Hot Tub and Pool"
}, {
    "latitude": 37.401696,
    "longitude": -122.084012,
    "poolName": "Public Pool"
}, {
    "latitude": 37.401145,
    "longitude": -122.086475,
    "poolName": "Kiddy Pool"
}, {
    "latitude": 37.396624,
    "longitude": -122.088938,
    "poolName": "Water Slide"
}, {
    "latitude": 37.39246,
    "longitude": -122.074207,
    "poolName": "Wading Pool"
}];

// Create a new google map
var mapProp = {
    center: new google.maps.LatLng(37.4038194, -122.081267),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.HYBRID
};
var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
var markers = [];

var addMarker = function(location) {
    var loc = new google.maps.LatLng(location.latitude, location.longitude);
    var marker = new google.maps.Marker({
        position: loc,
        animation: google.maps.Animation.DROP
    });
    // Show the user streetview if available, and link to nearby photos
    var infowindow = new google.maps.InfoWindow({
        content: ('<img src="https://maps.googleapis.com/maps/api/streetview?size=200x200&location=' + location.latitude + ',' + location.longitude + '"><a href = "https://www.flickr.com/nearby/' + location.latitude + ',' + location.longitude + '">See nearby photos</a>')
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
        // Adopted from https://developers.google.com/maps/documentation/javascript/markers
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });
    marker.setMap(map);
    markers.push(marker);
};


var viewModel = {
    // deepcopy locations and store in a pools variable
    pools: ko.observableArray(locations.slice(0)),
    query: ko.observable(''),

    // on search, look for whatever is typed in the searchbar and update
    // the map markers
    search: function(value) {
        viewModel.pools.removeAll();
        for (var x in locations) {
            if (locations[x].poolName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                viewModel.pools.push(locations[x]);
                markers[x].setMap(map);
            } else {
                markers[x].setMap(null);
            }
        }
    }
};

viewModel.query.subscribe(viewModel.search);

function initialize() {

    locations.forEach(
        addMarker
    );
    $("#view-toggle").click(
        function() {
            $("#search-wrapper").toggleClass("hide-if-small");
            $("#googleMap").toggleClass("hide-if-small");
        }
    );
}
google.maps.event.addDomListener(window, 'load', initialize);
ko.applyBindings(viewModel);