var map;
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

var getFlickr = function(marker, popup) {
    var pos = marker.getPosition();
    console.log(pos);
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7abca36c88c5c619545ef842155974d9&lat='+pos.A+'&lon='+pos.F+'&radius=0.01&per_page=20&page=1&format=json';
    $.ajax(url, {
        dataType: 'jsonp',
        //Flickr's API requires that the callback name is specified with 'jsoncallback' instead of just callback which is jQuery's default.
        jsonp: 'jsoncallback',
        success: function(response) {
            console.log(response);
            var allPhotos = response.photos.photo;
            var content = '<div class="container-fluid popup" width=450 height=450><div class="row popup">';
            content += '<h3>'+marker.getTitle()+'</h3>';
            for (i=0; i <allPhotos.length; i++) {
                var photoUrl = 'https://farm'+ allPhotos[i].farm +'.staticflickr.com/'+ allPhotos[i].server +'/'+ allPhotos[i].id +'_'+ allPhotos[i].secret +'_q.jpg';
                var thisImage = '<img src="'+photoUrl+'">';
                content += thisImage;
            }
            content += '</div></div>';
            popup.setContent(content);
        }
    })
}

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
            console.log(marker.getPosition());
            getFlickr(marker, popup);
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
    
}



var getFlickr2 = function(pos) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7abca36c88c5c619545ef842155974d9&lat='+pos[0]+'&lon='+pos[1]+'&radius=0.01&per_page=20&page=1&format=json&nojsoncallback=1';
    $.getJSON(url, function(response) {
        console.log(response);
        console.log(response.photos.photo.length);
        for (i=0; i<response.photos.photo.length; i++) {
            console.log(response.photos.photo[i].id)
        }
    })
}

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


/*

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

TODO: AJAX flickr content for popups
https://www.flickr.com/services/api/explore/flickr.photos.search
https://www.flickr.com/services/api/flickr.photos.search.html

https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fc778e032734a15eb7f780767d7994ba&lat=53.343174&lon=-6.267567&radius=0.01&per_page=20&page=1&format=json&nojsoncallback=1&api_sig=865d52131b668519cec3b571100e3b65

*/

