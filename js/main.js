function initialise() {
    var mapbox = document.getElementById('map-container');
    var mapOptions = {
        center: new google.maps.LatLng(53.3484364,-6.2775284), //centre of dublin
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    var map = new google.maps.Map(mapbox, mapOptions);
    
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
}

google.maps.event.addDomListener(window, 'load', initialise);