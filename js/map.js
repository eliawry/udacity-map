$(function() {
    var locations = [{
        "latitude": 37.398424,
        "longitude": -122.08733,
        "poolName": "awesome pool 0"
    }, {
        "latitude": 37.400426,
        "longitude": -122.081832,
        "poolName": "another pool"
    }, {
        "latitude": 37.402233,
        "longitude": -122.082287,
        "poolName": "third pool"
    }, {
        "latitude": 37.401655,
        "longitude": -122.083999,
        "poolName": "hot tub and pool"
    }, {
        "latitude": 37.401696,
        "longitude": -122.084012,
        "poolName": "ok i think this is"
    }, {
        "latitude": 37.401145,
        "longitude": -122.086475,
        "poolName": "awesome pool 5"
    }, {
        "latitude": 37.396624,
        "longitude": -122.088938,
        "poolName": "awesome pool 6"
    }, {
        "latitude": 37.39246,
        "longitude": -122.074207,
        "poolName": "awesome pool 7"
    }]


    // TODO
    // * Streetview of each pool
    var mapProp = {
        center: new google.maps.LatLng(37.4038194, -122.081267),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var markers = []

    var addMarker = function(location) {
        loc = new google.maps.LatLng(location.latitude, location.longitude);
        var marker = new google.maps.Marker({
            position: loc
        });
        var infowindow = new google.maps.InfoWindow({
            content:('<img src="https://maps.googleapis.com/maps/api/streetview?size=200x200&location='
                        + location.latitude + ',' + location.longitude + '"><a href = "https://www.flickr.com/nearby/'
                        + location.latitude + ',' + location.longitude + '">See nearby photos</a>')
        });
         console.log(infowindow.content)
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        marker.setMap(map);
        markers.push(marker);
    }


    var viewModel = {
      pools: ko.observableArray(locations.slice(0)),
      query: ko.observable(''),

      search: function(value) {
        viewModel.pools.removeAll();
        for(var x in locations) {
          if(locations[x].poolName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            viewModel.pools.push(locations[x]);
            markers[x].setMap(map);
          }
          else {
            markers[x].setMap(null);
          }
        }
      }
    };

    viewModel.query.subscribe(viewModel.search);

    function initialize() {

        locations.forEach(
            addMarker
        )
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    ko.applyBindings(viewModel);
});