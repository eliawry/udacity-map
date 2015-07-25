var locations = [
  [37.398424, -122.087330],
  [37.400426, -122.081832],
  [37.402233, -122.082287],
  [37.401655, -122.083999],
  [37.401696, -122.084012],
  [37.401145, -122.086475],
  [37.396624, -122.088938],
  [37.392460, -122.074207]
  ]



function Pool(data) {
    this.latitude = ko.observable(data.latitude);
    this.longitude = ko.observable(data.longitude);
}


function TaskListViewModel() {
    // Data
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
    self.incompleteTasks = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() });
    });

    // Operations
    self.addTask = function() {
        self.tasks.push(new Task({ title: this.newTaskText() }));
        self.newTaskText("");
    };
    self.removeTask = function(task) { self.tasks.remove(task) };
}

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(37.4038194,-122.081267),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.HYBRID
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

locations.forEach(
  function (location) {
    location = new google.maps.LatLng(location[0], location[1]);
    console.log(location)
    var marker=new google.maps.Marker({position:location});
    marker.setMap(map);
  }
)
}
google.maps.event.addDomListener(window, 'load', initialize);