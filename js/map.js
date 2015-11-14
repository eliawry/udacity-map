var locations = [
    {
        "latitude": 37.398424,
        "longitude": -122.08733,
        "poolName": "awesome pool 0"
    },
    {
        "latitude": 37.400426,
        "longitude": -122.081832,
        "poolName": "awesome pool 1"
    },
    {
        "latitude": 37.402233,
        "longitude": -122.082287,
        "poolName": "awesome pool 2"
    },
    {
        "latitude": 37.401655,
        "longitude": -122.083999,
        "poolName": "awesome pool 3"
    },
    {
        "latitude": 37.401696,
        "longitude": -122.084012,
        "poolName": "awesome pool 4"
    },
    {
        "latitude": 37.401145,
        "longitude": -122.086475,
        "poolName": "awesome pool 5"
    },
    {
        "latitude": 37.396624,
        "longitude": -122.088938,
        "poolName": "awesome pool 6"
    },
    {
        "latitude": 37.39246,
        "longitude": -122.074207,
        "poolName": "awesome pool 7"
    }
]



var poolViewModel = {
    // Data
    pools: ko.observableArray(locations),
    query: ko.observable(''),

  search: function(value) {
    // remove all the current beers, which removes them from the view
    poolViewModel.pools.removeAll();

    for(var x in pools) {
      if(pools[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        poolViewModel.pool.push(pools[x]);
      }
    }
  }
};

poolViewModel.query.subscribe(poolViewModel.search);

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(37.4038194,-122.081267),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.HYBRID
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

locations.forEach(
  function (location) {
    location = new google.maps.LatLng(location.latitude, location.longitude);
    var marker=new google.maps.Marker({position:location});
    marker.setMap(map);
  }
)
}
google.maps.event.addDomListener(window, 'load', initialize);
ko.applyBindings(poolViewModel);