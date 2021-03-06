// Hardcoded locations of neighborhood pools
var locations = [{
    "latitude": 37.398424,
    "longitude": -122.08733,
    "poolName": "Pool and Hot Tub",
    "poolId": "pool0"
}, {
    "latitude": 37.400426,
    "longitude": -122.081832,
    "poolName": "Max's Pool",
    "poolId": "pool1"
}, {
    "latitude": 37.402233,
    "longitude": -122.082287,
    "poolName": "Hot Tub behind a friend's house",
    "poolId": "pool2"
}, {
    "latitude": 37.401655,
    "longitude": -122.083999,
    "poolName": "Hot Tub and Pool",
    "poolId": "pool3"
}, {
    "latitude": 37.401696,
    "longitude": -122.084012,
    "poolName": "Public Pool",
    "poolId": "pool4"
}, {
    "latitude": 37.401145,
    "longitude": -122.086475,
    "poolName": "Kiddy Pool",
    "poolId": "pool5"
}, {
    "latitude": 37.396624,
    "longitude": -122.088938,
    "poolName": "Water Slide",
    "poolId": "pool6"
}, {
    "latitude": 37.39246,
    "longitude": -122.074207,
    "poolName": "Wading Pool",
    "poolId": "pool7"
}];


var constructContentFromLocation = function(location) {
    var lat = location.latitude;
    var lon = location.longitude;
    var latLonStr = lat + ',' + lon;
    $.ajax({
        url: "http://api.wunderground.com/api/85c3f687e2c50808/geolookup/conditions/q/" + latLonStr + ".json",
        dataType: "jsonp",
        success: function(parsed_json) {
            var name = location.poolName;
            var temp = parsed_json.current_observation.temp_f;
            var feelslike = parsed_json.current_observation.feelslike_f;
            $("#results").append(
                "<div>Temperature at " + name + " is: " + temp + " degrees, feels like " + feelslike + " degrees </div>");
        }
    });
    return '<div id="results"><div><img src="https://maps.googleapis.com/maps/api/streetview?size=200x200&location=' + latLonStr + '"></div><div><a href = "https://www.flickr.com/nearby/' + latLonStr + '">See nearby photos</a></div></div>';
};


var initializeMap = function() {
    // Create a new google map
    var mapProp = {
        center: new google.maps.LatLng(37.4038194, -122.081267),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var markers = [];
    // keep a reference to actice infowindow, if any
    var currentInfowindow = null;

    var clearMarkers = function() {
        markers.forEach (
            function (m) {
                m.setMap(null);
            }
        );
        markers = [];
    };

    var addMarker = function(location) {
        var loc = new google.maps.LatLng(location.latitude, location.longitude);
        var marker = new google.maps.Marker({
            position: loc,
            animation: google.maps.Animation.DROP
        });

        marker.show = function() {
            if (currentInfowindow) {
                currentInfowindow.close();
            }
            // Show the user streetview if available, and link to nearby photos
            currentInfowindow = new google.maps.InfoWindow({
                content: constructContentFromLocation(location)
            });
            currentInfowindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            window.setTimeout(function() {
                marker.setAnimation(null);
            }, 1500);
        };

        marker.addListener('click', marker.show);
        $("#" + location.poolId).click(marker.show);
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
            clearMarkers();
            for (var x in locations) {
                if (locations[x].poolName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    viewModel.pools.push(locations[x]);
                    addMarker(locations[x]);
                }
            }
        }
    };

    viewModel.query.subscribe(viewModel.search);

    function initialize() {

        locations.forEach(
            addMarker
        );
        $("#toggle").click(
            function() {
                $("#search").toggleClass("hide-if-small");
                $("#map").toggleClass("hide-if-small");
            }
        );
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    ko.applyBindings(viewModel);
};
