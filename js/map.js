locations = [
	{'wikipedia': 'https://en.wikipedia.org/wiki/Fukushima_Daiichi_nuclear_disaster'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/Instituto_Oncologico_Nacional'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/1996_San_Juan_de_Dios_radiotherapy_accident'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/1990_Clinic_of_Zaragoza_radiotherapy_accident'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/Goi%C3%A2nia_accident'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/Chernobyl_disaster'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/Bhopal_Gas_Tragedy'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/Three_Mile_Island_accident'},
	{'wikipedia': 'https://en.wikipedia.org/wiki/Lucens_reactor'},
	]

function initialize() {


  var mapProp = {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var current = 0;
var last = 1;
var tmp = 0;
for (var i = 0; i < 30; i ++) {
   var position = new google.maps.LatLng(current, last);
   tmp = current;
   current = current + last;
   last = tmp;
   var marker=new google.maps.Marker({position:position});
   marker.setMap(map);
}
}
google.maps.event.addDomListener(window, 'load', initialize);