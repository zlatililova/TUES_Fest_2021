function initCreateDestinationMap(userLocationObject) {
    let webSiteSetting = null;
    if(sessionStorage.getItem("hasAcceptedCookies") === "False") {
        if(sessionStorage.getItem("uiState") == null) {
            sessionStorage.setItem("uiState", "default"); 
        }
        webSiteSetting = sessionStorage.getItem("uiState");
    }
    else if(sessionStorage.getItem("hasAcceptedCookies") == "True") {
        if (getCookie("webSiteSetting") == "") {
            setCookie("webSiteSetting", "default", 10);
        }
        webSiteSetting = getCookie("webSiteSetting");
    }

    const zoom_level_for_tiles = 10;
    const select = document.getElementById("select-input");
    const infowindowNewLocation = new google.maps.InfoWindow();
    const infowindowContentNewLocation = document.getElementById("infowindow-content-new-location");
    infowindowNewLocation.setContent(infowindowContentNewLocation);
    const geocoder = new google.maps.Geocoder();

    const userPosition = userLocationObject.userPosition;
    const zoom_for_pos = userLocationObject.zoom_for_pos;

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: userPosition.lat, lng: userPosition.lng },
        zoom: zoom_for_pos.zoom,
        minZoom: zoom_for_pos.minZoom,
        styles: getCustomMapStyles(webSiteSetting),
    });

    const button = document.getElementById("create_destination");

    const marker = new google.maps.Marker({
        position: { lat: userPosition.lat, lng: userPosition.lng},
        map: map,
        draggable: true,
        title: "Drag To New Location"
    });
    
    function getLocationNameFromType(location_type) {
        switch(location_type) {
            case 'parking':
                return "Parking Lot";
            case 'supermarket':
                return "Supermarket";
            case 'tourist_attraction':
                return "Tourist Attraction";
            case 'atm':
                return "ATM";
            case 'bar':
                return "Bar";
            case 'night_club':
                return "Night Club";
            case 'lodging':
                return "Hotel";
        }
    }

    marker.addListener('position_changed', function() {
        infowindowContentNewLocation.children["new-location-name"].textContent = getLocationNameFromType(select.value);
        infowindowContentNewLocation.children["new-location-position"].textContent = "Lat: " + marker.position.lat() + " Lng: " + marker.position.lng();
    });

    marker.addListener('mouseover', function() {
        infowindowContentNewLocation.children["new-location-name"].textContent = getLocationNameFromType(select.value);
        infowindowContentNewLocation.children["new-location-position"].textContent = "Lat: " + marker.position.lat() + " Lng: " + marker.position.lng();
        infowindowContentNewLocation.style["display"] = "block";
        infowindowNewLocation.open(map, marker);
    });

    marker.addListener('mouseout', function() {
        infowindowNewLocation.close();
    });

    button.addEventListener('mouseover', function() {
        button.style["backgroundColor"] = "salmon";
        button.style["color"] = "white";
    });

    button.addEventListener('mouseout', function() {
        button.style["backgroundColor"] = "#f12e2e";
        button.style["color"] = "black";
    });

    function displayResult(locationName, locationAddress, locationType) {
        if (locationName == null) {
            if (locationAddress == null && locationType == null) {
                window.alert ("Something Went Terribly Wrong");
                return;
            }
            else if (locationAddress == null && locationType) {
                window.alert ("Added New Location of Type: ", getLocationNameFromType(locationType))
                return;
            }
            window.alert ("Successfully Added New Location of Type: " + getLocationNameFromType(locationType) + "\nTo Adress: " + locationAddress)
            return;
        }
        else if (locationName) {
            if (locationAddress == null && locationType == null) {
                window.alert ("Something Went Terribly Wrong");
                return;
            }
            else if (locationAddress == null && locationType) {
                window.alert ("Added: " + locationName + "\nWhich is of Type: " + locationType);
                return;
            }
            window.alert ("Successfully Added: " + locationName + "\nWhich is of Type: " + getLocationNameFromType(locationType) + "\nAdress: " + locationAddress)
            return; 
        }
    

    }

    button.addEventListener("click", function (){



        const newLocationNameDefault = getLocationNameFromType(select.value);
        const newLocationType = select.value;

        const locationName = prompt("Location Name", newLocationNameDefault);
        
        const tileIdString = getTileIdFromLocation(marker.position, zoom_level_for_tiles);
        const locationListRef = firebase.database().ref("Locations/" + tileIdString + "/" + newLocationType);

        const lat = marker.position.lat();
        const lng = marker.position.lng();

        const position = {
            lat: lat,
            lng: lng
        };
        
        const NewLocation = locationListRef.push();
        NewLocation.set({ 
            name: locationName,
            type: newLocationType,
            position: position,
            isVerified: false,
            isFinderProLocation: true
        });

        geocoder.geocode({location: position}, function(results, status) {
            if (status === "OK") {
                displayResult(locationName, results[0].formatted_address, newLocationType);
            }
            else {
                displayResult(locationName, null, newLocationType);
            }
        });
        
    });
}