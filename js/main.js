var marker;
var map;

function initialise() {
    var mapbox = document.getElementById('map-container');
    var mapOptions = {
        center: new google.maps.LatLng(53.3484364,-6.2775284), //centre of dublin
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(mapbox, mapOptions);
    
    map.set('styles', [
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
    ]);
    
    var markerOptions = {
        position: new google.maps.LatLng(53.34648, -6.2835266),
        map: map,
        title: 'My House is a very very very nice house',
        draggable: true
    };
    
    marker = new google.maps.Marker(markerOptions);
}

google.maps.event.addDomListener(window, 'load', initialise);

// Markers - can be created and stored, and not drawn til later if you like using marker.setMap()
// https://developers.google.com/maps/documentation/javascript/markers
// draggable - dragged marker changes its position value.
// Q: can you store a marker as an observable? Or ca you assign an observable as a marker's position? position: new google.maps.LatLng(ko.observable())?