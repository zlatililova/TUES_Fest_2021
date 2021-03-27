function initMap() {
let map = new google.maps.Map(document.getElementById("map"), {
center: { lat: 42.697708, lng: 23.321867 },
zoom: 12,
styles: [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "33"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "61"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "42"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "22"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "31"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "62"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-7"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "3"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-50"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a0914"
            },
            {
                "lightness": 17
            }
        ]
    }
],
});
    let parkers = [];
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    autocomplete.setTypes(["geocode"]);
    autocomplete.setOptions({ strictBounds: true });
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    const infowindowParking = new google.maps.InfoWindow();
    const infowindowContentParking = document.getElementById("infowindow-content-parking");
    let directionsDisplay = new google.maps.DirectionsRenderer();
    infowindow.setContent(infowindowContent);
    infowindowParking.setContent(infowindowContentParking);


    const svgMarker = {
        path: "M38.831,14.26c-0.191-0.233-0.476-0.369-0.775-0.369h-3.801c-0.938-2.474-2.16-4.898-3.549-5.813c-4.805-3.161-17.55-3.161-22.355,0c-1.39,0.916-2.607,3.343-3.55,5.813H1c-0.302,0-0.586,0.136-0.775,0.369c-0.19,0.232-0.266,0.539-0.204,0.834l0.563,2.728c0.096,0.465,0.506,0.797,0.979,0.797h1.126c-1.087,1.254-1.614,2.833-1.621,4.413c-0.007,1.952,0.734,3.716,2.089,4.964c0.015,0.013,0.03,0.022,0.044,0.035v3.817c0,0.827,0.672,1.5,1.5,1.5h3.506c0.828,0,1.5-0.673,1.5-1.5v-1.534h19.641v1.534c0,0.827,0.672,1.5,1.5,1.5h3.506c0.826,0,1.5-0.673,1.5-1.5v-3.742c1.438-1.317,2.125-3.129,2.134-4.938c0.006-1.634-0.545-3.271-1.696-4.551h1.201c0.475,0,0.885-0.332,0.979-0.798l0.564-2.727C39.094,14.799,39.021,14.494,38.831,14.26z M9.998,10.583c3.83-2.521,15.229-2.521,19.057,0c0.744,0.488,1.701,2.461,2.578,4.877H7.422C8.297,13.045,9.254,11.073,9.998,10.583zM5.512,23.408c0-1.63,1.322-2.95,2.951-2.95c1.631,0,2.951,1.32,2.951,2.95s-1.32,2.951-2.951,2.951C6.834,26.359,5.512,25.038,5.512,23.408z M30.631,26.359c-1.629,0-2.951-1.321-2.951-2.951s1.322-2.95,2.951-2.95c1.631,0,2.951,1.32,2.951,2.95S32.26,26.359,30.631,26.359z",
        fillColor: "red",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
        anchor: new google.maps.Point(15, 30)        
    };

    const svgParker = {
        path: "m425.941 0h-393.176c-18.094 0-32.765 14.671-32.765 32.765v393.176c0 18.094 14.671 32.765 32.765 32.765h393.176c18.094 0 32.765-14.671 32.765-32.765v-393.176c0-18.094-14.671-32.765-32.765-32.765zm-196.588 294.882h-32.765v65.529h-65.529v-262.117h98.294c54.203 0 98.294 44.091 98.294 98.294s-44.091 98.294-98.294 98.294z",
        fillColor: "red",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.07,
        anchor: new google.maps.Point(15, 30)             
    }
    
    const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
        icon: svgMarker
    });

    function addMarker(location) {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          icon: svgParker
          });
        parkers.push(marker);
    }


    function setMapOnAll(map) {
        for (let i = 0; i < parkers.length; i++) {
          parkers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
    }
    
    function deleteMarkers() {
        clearMarkers();
        parkers = [];
    }

    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        infowindowParking.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15); 
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        let address = "";

        if (place.address_components) {
            address = [
            (place.address_components[0] &&
                place.address_components[0].short_name) ||
                "",
            (place.address_components[1] &&
                place.address_components[1].short_name) ||
                "",
            (place.address_components[2] &&
                place.address_components[2].short_name) ||
                "",
            ].join(" ");
        }
        infowindowContent.children["place-icon"].src = place.icon;
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
        infowindow.open(map, marker);


        const currentLocation = place.geometry.location;
        const origin_location = new google.maps.LatLng(currentLocation.lat(), currentLocation.lng());
        const origin_type = 'parking';
        const request = {
            location: origin_location,
            radius: '10000',
            type: [origin_type],
            rank_by: "nearest"
        };


        const googleMapsService = new google.maps.places.PlacesService(map);
        googleMapsService.nearbySearch(request, callback);
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                deleteMarkers();

                const {name, lat, lng, rating} = handleResult(results[0]);
                const parkingLatLng = {lat, lng};

                addMarker(parkingLatLng);

                if (name != null) {
                    infowindowContentParking.children["parking-name"].textContent = name;
                    if (rating) {
                        infowindowContentParking.children["parking-rating"].textContent = "Rating: " + rating;
                    }
                    infowindowParking.open(map, parkers[0]);
                }

                console.log(parkingLatLng)

                const directionsService = new google.maps.DirectionsService();
                if(directionsDisplay != null) {
                    directionsDisplay.setMap(null);
                    directionsDisplay = null;
                    directionsDisplay = new google.maps.DirectionsRenderer();
                }                
                directionsDisplay.setMap(map); 
                directionsDisplay.setOptions( { suppressMarkers: true } );
        
                let request = {
                    origin: place.geometry.location,
                    destination: parkingLatLng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
        
                directionsService.route(request, function(response, status){
                    if(status = 'OK'){
                        directionsDisplay.setDirections(response);
                    }
                });
            }
        }
        function handleResult(result) {
            resultObject = {
                name: null,
                lat: null,
                lng: null,
                rating: null
            }

            for(let key in result) {
                if(key == 'name') {
                    resultObject['name'] = result.name
                }
                if(key == 'geometry') {
                    resultObject['lat'] = result.geometry.location.lat();
                    resultObject['lng'] = result.geometry.location.lng();
                }
                if(key == 'rating') {
                    resultObject['rating'] = result.rating;
                }
            }

            return resultObject;
        }
        //const xhr = new XMLHttpRequest();
        //xhr.open('GET', `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.lat()},151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEYfind/?lat=&lng=${currentLocation.lng()}`);
        /*xhr.onload = function() {
            if (xhr.status === 200) {
                deleteMarkers();
                const { found, name, lat, lng, rating} = JSON.parse(xhr.responseText);

                if (!found) {
                    alert('Parking not found!');
                    return;
                }

                const parkingLatLng = { lat, lng };
                
                addMarker(parkingLatLng);
    
                if (name != null) {
                    infowindowContentParking.children["parking-name"].textContent = name;
                    if (rating) {
                        infowindowContentParking.children["parking-rating"].textContent = "Rating: " + rating;
                    }
                    infowindowParking.open(map, parkers[0]);
                }

                
        
                const directionsService = new google.maps.DirectionsService();
                if(directionsDisplay != null) {
                    directionsDisplay.setMap(null);
                    directionsDisplay = null;
                    directionsDisplay = new google.maps.DirectionsRenderer();
                }                
                directionsDisplay.setMap(map); 
                directionsDisplay.setOptions( { suppressMarkers: true } );
        
                let request = {
                    origin: place.geometry.location,
                    destination: parkingLatLng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
        
                directionsService.route(request, function(response, status){
                    if(status = 'OK'){
                        directionsDisplay.setDirections(response);
                    }
                });
                
        
            } else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();*/
    });

/*
    var request = {
        location: map.center,
        radius: 3000,
        types: ['parking']
    };

    var places_service = new google.maps.places.PlacesService(map);

    places_service.nearbySearch(request, callback);    */
}


/*
function callback(results, status) {
    if(status == google.maps.places.PlacesService.OK){
        for (var i = 0; i < results.length; i++){
            marker.push(createMarker(results[i]));
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

    return marker;
}*/

