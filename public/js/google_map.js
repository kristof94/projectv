
var google;
var geocoder;
var map;
var markers = [];
function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    //48.871277, 2.316990
    var myLatlng = new google.maps.LatLng(48.861146, 2.344513);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 13,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: true,
        styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
    };

    

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    geocoder = new google.maps.Geocoder();
    adresse = new google.maps.places.Autocomplete(
        (document.getElementById('rue')),
        {types: ['geocode']});
    adresse.addListener('place_changed', function() {
        var place = adresse.getPlace();
        document.getElementById("rue").innerHTML = place;
        deleteMarkers();
        placeMarkerAndPanTo(place.geometry.location, map);
        /*$('html, body').animate({
            scrollTop: $("#hourPart").offset().top
        }, 1000);*/
    });
    map.addListener('click', function(e) {
        deleteMarkers();
        placeMarkerAndPanTo(e.latLng, map);
        reverseGeocoding(e.latLng);
    });      
}

function geoCode(place){
     geocoder.geocode( { 'address': place}, function(results, status) {
    /* Si l'adresse a pu être géolocalisée */
    if (status == google.maps.GeocoderStatus.OK) {
     /* Récupération de sa latitude et de sa longitude */
     document.getElementById('lat').value = results[0].geometry.location.lat();
     document.getElementById('lng').value = results[0].geometry.location.lng();
     map.setCenter(results[0].geometry.location);
     /* Affichage du marker */
     var marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location
     });
     /* Permet de supprimer le marker précédemment affiché */
     markers.push(marker);
     if(markers.length > 1)
      markers[(i-1)].setMap(null);
      i++;
     } else {
      alert("Le geocodage n\'a pu etre effectue pour la raison suivante: " + status);
     }
    });
    
}

     function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        markers.push(marker);
        map.panTo(latLng);        
      }

 // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }

function findLocation(){
}

function reverseGeocoding(latlng) {
  geocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
          var geoCodeaddress =  results[0].formatted_address;          
          document.getElementById("rue").value = geoCodeaddress;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}
    google.maps.event.addDomListener(window, 'load', init);
