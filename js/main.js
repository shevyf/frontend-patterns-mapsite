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
        content: '<a>https://www.facebook.com/colin.mccusker1/videos/10153282679114618/</a>'
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
        content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/R0-y9ZqiY90" frameborder="0" allowfullscreen></iframe>'
    },
    {
        title: 'Abby Theatre',
        position: [53.348614, -6.257153],
        content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WXayhUzWnl0" frameborder="0" allowfullscreen></iframe>'
    },
        {
        title: 'My House',
        position: [53.34648, -6.2835266],
        content: 'http://www.pixiespace.com/resume/'
    },
];

// marker 
function maplocation(pos, name, content) {
    this.position = pos;
    this.name = name;
    this.content = content;
    this.visibleMarker = ko.observable(true);
    
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos[0], pos[1]),
        title: name,
        map: map
    });
    
    this.popup = new google.maps.InfoWindow({
        content: content  });
    
    google.maps.event.addListener(this.marker, 'click', (function(popup, marker) {
        return function() {
        popup.open(map,marker);
        }
    })(this.popup, this.marker)
    );
    
    this.showPopup = function() {
        if(this.popup.getMap()){this.popup.close()} else {this.popup.open(map, this.marker)};
    };
    
    this.hideButton = function(){this.visibleMarker(false)};
    this.showButton = function(){this.visibleMarker(true)};
}

var map;

function markerViewModel() {
    self = this;
    
    self.locations = (function(){
        var locationList = [];
        localMarkers.forEach(function(item) {
            locationList.push(new maplocation(item.position, item.title, item.content)) 
        });
        return locationList;
    })();
    
    self.search = function() {
        var searchTerm = $('#searchbox').val().toLowerCase();
        console.log(searchTerm.length);
        if (searchTerm.length > 0) {
                //console.log("searchterm more than 0");
                self.locations.forEach(function(location){
                    
                    if (location.name.toLowerCase().includes(searchTerm)) { location.visibleMarker(true)} else {location.visibleMarker(false)}
                });
            }
        else {
            console.log("searchterm less than 0");
            self.locations.forEach(function(location){location.visibleMarker(true)});
            }
    };
    // on type, if length of string >0, foreach in locationList, if string in name, visible: true else visible:false. If length of string 0, foreach(visible = true)
}

// set up map, add markers, 

function initialise() {
    var mapbox = document.getElementById('map-container');
    var mapOptions = {
        center: new google.maps.LatLng(53.34987099459691, -6.2708336062987575), //centre of dublin
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(mapbox, mapOptions);
        map.set('styles', mapStyles);
    
    ko.applyBindings(new markerViewModel());
    
    
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


TODO: AJAX flickr content for popups
https://www.flickr.com/services/api/explore/flickr.photos.search
https://www.flickr.com/services/api/flickr.photos.search.html
*/