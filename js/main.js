/*
TODO:

Change markers when selected (e.g. bounce)
Grunt automation
*/

//Starting Variables

//google map object, to be accessible generally
var map; 

//map styles, just for the looks
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
          { "visibility": "on" }
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
          { "color": "#0cca8a",
            "visibility": "on"
          }
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

//list of locations, with name, location and some initial content. 
//TODO: remove initial content or replace with AJAX'd stuff
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
        title: 'Abby Theatre',
        position: [53.348614, -6.257153],
        content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WXayhUzWnl0" frameborder="0" allowfullscreen></iframe>'
    },
    {
        title: 'Trinity College',
        position: [53.344401, -6.257330],
        content: ''
    },
    {
        title: 'Millstone Restaurant',
        position: [53.344126, -6.262710],
        content:''
    },
    {
        title: 'Meeting House Square',
        position: [53.344991, -6.265374],
        content:''
    },
    {
        title: 'Lemon Jelly',
        position: [53.347149, -6.265395],
        content: ''
    }
];

//function to take a marker and popup and get flicker data, create a string and set content of popup box
//Note: Flickr's API requires that the callback name is specified with 'jsoncallback' instead of just callback which is jQuery's default.
//TODO: add other AJAX call to foursquare
var getFlickr = function(marker, popup) {
    var pos = marker.getPosition();
    console.log(pos);
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7abca36c88c5c619545ef842155974d9&lat='+pos.A+'&lon='+pos.F+'&radius=0.01&per_page=8&page=1&format=json';
    $.ajax(url, {
        dataType: 'jsonp',
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

var getFlickr = function(pos, name, flickr, foursq) {
    //var pos = marker.getPosition();
    console.log(pos);
    
    var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7abca36c88c5c619545ef842155974d9&lat='+pos[0]+'&lon='+pos[1]+'&radius=0.01&per_page=8&page=1&format=json';
    $.ajax(flickrUrl, {
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function(response) {
            console.log(response);
            var allPhotos = response.photos.photo;
            var flickrStr = '<div class="photos">';
            for (i=0; i <allPhotos.length; i++) {
                var photoUrl = 'https://farm'+ allPhotos[i].farm +'.staticflickr.com/'+ allPhotos[i].server +'/'+ allPhotos[i].id +'_'+ allPhotos[i].secret +'_q.jpg';
                var thisImage = '<img src="'+photoUrl+'">';
                flickrStr += thisImage;
            }
            flickrStr += '</div>';
            flickr(flickrStr);
        }
    });
    
    var foursqUrl = 'https://api.foursquare.com/v2/venues/search/?ll='+pos[0]+','+pos[1]+'&radius=50&query='+name+'&intent=browse&client_id=JILQ425OSSB1A4PVRXHIOSMZLBMQ2LDZPPSDPBVPYIMLSVDQ&client_secret=RT0YLMXT4DRGCVZLTNKLKBTXHDCHFFPAE5AKZKPQ3SP15Q0R&v=20130815';
    $.ajax(foursqUrl, {
        dataType: 'json',
        success: function(response) {
            console.log(response);
            var foursqStr = '<div>';
            var allPlaces = response.response.venues;
            var placeData = '<div><h4>Nearby Locations</h4><div class="singleplace">';
            for (i=0; i < allPlaces.length; i++) {
                //display venue.name, venue.formattedAddress[0][1][2], webpage and venue.formattedPhone
                var thisPlace = allPlaces[i];
                console.log(thisPlace);
                placeData += '<div class="placename">'+thisPlace.name+'</div>';
                placeData += '<div class="placedetails">Address: '+ thisPlace.location.formattedAddress[0] + ' ' + thisPlace.location.formattedAddress[1] + ' ' + thisPlace.location.formattedAddress[2] + '</div>';
                placeData += '<div class="placedetails">Phone: '+ thisPlace.contact.formattedPhone + '</div>';
            };
            foursqStr += placeData;
            foursqStr += '</div></div>';
            foursq(foursqStr);
        }
    });
}

// location object to go in array. Contains info about the location inc. whether it's visible in the search buttons or not, plus the marker and popup objects for each location (and listeners with closures)
// Also added functions to show/hide popups, and to show/hide search panel button
//TODO: Integrate getting info with showPopup function. Can listener take this function as a callback?
function maplocation(pos, name, content) {
    var self = this;
    self.position = pos;
    self.name = name;
    self.flickr = ko.observable('<h4>Flickr Stream</h4>');
    self.foursquare = ko.observable('<h4>Foursquare nearby locations</h4>');
    self.visibleMarker = ko.observable(true);
    
    self.marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos[0], pos[1]),
        title: name,
        map: map
    });
    
    self.popup = new google.maps.InfoWindow({
        content: '<div><h3>' + name + '</h3></div>'  });
    
    self.popupdate = ko.computed(function (){
        //if either flickr or foursquare change, update popup content
        var newContent = '<div class="container-fluid popup"><div class="row popup"><h3>'+self.name+'</h3>' + self.flickr() + self.foursquare(); + '</div></div>'
        console.log(newContent);
        self.popup.setContent(newContent);
    })
    
    self.showPopup = function() {
        if(self.popup.getMap()){self.popup.close()} 
        else {
            getFlickr(self.position, self.name, self.flickr, self.foursquare);
            self.popup.open(map, self.marker)};
    };
    
    google.maps.event.addListener(self.marker, 'click', (function(pos, name, flickr, foursquare, marker) {
        return function() {
            getFlickr(pos, name, flickr, foursquare);
            self.popup.open(map,marker);
            console.log(self.popup.getContent());
            console.log(self.flickr());
        }
        
    })(self.position, self.name, self.flickr, self.foursquare, self.marker)
    );
    
    self.hideButton = function(){self.visibleMarker(false)};
    self.showButton = function(){self.visibleMarker(true)};
}

function markerViewModel() {
    self = this;
    
    self.locations = (function(){
        var locationList = [];
        localMarkers.forEach(function(item) {
            locationList.push(new maplocation(item.position, item.title, item.content)) 
        });
        //sort locationList
        
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

function initialise() {
    var mapbox = document.getElementById('map-container');
    var mapOptions = {
        center: new google.maps.LatLng(53.34628441758734, -6.26027643161614), //centre of dublin
        zoom: 16,
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

