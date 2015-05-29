var mapStyles = [
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          { "visibility": "on" },
          { "color": "#59a6dd" }
        ]
      },{
        "featureType": "road",
        "stylers": [
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#0cca8a" }
        ]
      },{
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
      }
    ]

var localMarkers = [
    {
        title: 'Pantibar',
        position: [53.346773, -6.267874],
        content: 'https://www.facebook.com/colin.mccusker1/videos/10153282679114618/'
    },
    {
        title: 'Dublin Castle Courtyard',
        position: [53.343174, -6.267567],
        content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FK3OvGX0O00" frameborder="0" allowfullscreen></iframe>'
    },
    {
        title: 'The George',
        position: [53.343762, -6.264677],
        content: 'http://www.tv3.ie/xpose/article/tv-news/167801/Vincent-Browne-LIVE-from-The-George-Bar'
    },
    {
        title: 'RTE - Pantigate',
        position: [53.315750, -6.223464],
        content: 'https://www.youtube.com/embed/R0-y9ZqiY90'
    },
    {
        title: 'Abby Theatre',
        position: [53.348614, -6.257153],
        content: 'https://www.youtube.com/embed/WXayhUzWnl0'
    },
        {
        title: 'My House',
        position: [53.34648, -6.2835266],
        content: 'http://www.pixiespace.com/resume/]'
    },
];


function newMarker(pos, name, content) {
    this.position = pos;
    this.name = name;
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos[0], pos[1]),
        title: name,
        map: map
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
        infowindow.setContent('<h3>'+ marker.title+ '</h3><div>'+marker.position+'</div>');
    })
}

//var marker;
var map;
var markerViewModel = ko.observableArray()


var infowindow = new google.maps.InfoWindow({
      content: "Hello World!"  });
// set up map, add markers, 


function initialise() {
    var mapbox = document.getElementById('map-container');
    var mapOptions = {
        center: new google.maps.LatLng(53.3484364,-6.2775284), //centre of dublin
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(mapbox, mapOptions);
        map.set('styles', mapStyles);
    
    
    localMarkers.forEach(function(item) {
       markerViewModel.push(new newMarker(item.position, item.title, item.content)) 
    });
}

google.maps.event.addDomListener(window, 'load', initialise);

// Markers - can be created and stored, and not drawn til later if you like using marker.setMap()
// https://developers.google.com/maps/documentation/javascript/markers
// draggable - dragged marker changes its position value.
// Q: can you store a marker as an observable? Or ca you assign an observable as a marker's position? position: new google.maps.LatLng(ko.observable())?


/*
Plan: make an object which is a marker, that contains lat, lng, title, how to draw itself (marker.setMap(map))
Make popup boxes for each marker object which link to some content
initiate with a nice little list of coords and stuff I give it.
later: Make search box, not sure how yet.


    var markerOptions = {
        position: new google.maps.LatLng(53.34648, -6.2835266),
        map: map,
        title: 'My House is a very very very nice house',
        draggable: true
    };
    
    marker = new google.maps.Marker(markerOptions);
    
    
Organise!

markerViewModel
- contains all data about markers, draws markers, markers have click functions to make popup box

each location is
- position {lat: x, lng: y}
- title
- visible (observable(true))
- a marker
- marker has calculated values? would that work?
each marker

searchbox - when typed in triggers an event to compare contents to titles


var markerViewModel = function (locations) {

this.popupTarget = ko.observable();

this.locations = ko.observableArray(ko.utils.arrayMap(locations, function (location){
    marker = new Marker({"stuff from location"});
    
    return {pos: pos, name: name, description: description, marker: marker,  };

}));

this.setPopup = function(marker){this.popupTarget = marker}


*/