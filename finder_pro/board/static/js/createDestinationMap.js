function initCreateDestinationMap(returnObject) {
    if (getCookie("mapSetting") == "") {
        setCookie("mapSetting", "default", 10);
    }

    const mapSetting = getCookie("mapSetting");

    const zoom_level_for_tiles = 10;
    const select = document.getElementById("select-input");
    const infowindowNewLocation = new google.maps.InfoWindow();
    const infowindowContentNewLocation = document.getElementById("infowindow-content-new-location");
    infowindowNewLocation.setContent(infowindowContentNewLocation);
    const geocoder = new google.maps.Geocoder();

    const userPosition = returnObject.userPosition;
    const zoom_for_pos = returnObject.zoom_for_pos;

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: userPosition.lat, lng: userPosition.lng },
        zoom: zoom_for_pos.zoom,
        minZoom: zoom_for_pos.min_zoom,
        styles: getCustomMapStyles(mapSetting),
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

    function displayResult(location_name, location_address) {
        if (location_address) {
            const alertMessage = "Added New Location Of Type: " + location_name + "\nAddress: " + location_address;
            window.alert(alertMessage);
            return;
        }
        const alertMessage = "Added New Location Of Type: " + location_name;
        window.alert(alertMessage);

    }

    button.addEventListener("click", function (){
        const newLocationName = getLocationNameFromType(select.value);
        const newLocationType = select.value;
        
        const tileIdString = getTileIdFromLocation(marker.position, zoom_level_for_tiles);
        console.log(tileIdString);
        const locationListRef = firebase.database().ref("Locations/" + tileIdString + "/" + newLocationType);
        
        const lat = marker.position.lat();
        const lng = marker.position.lng();

        const position = {
            lat: lat,
            lng: lng
        };
        
        const NewLocation = locationListRef.push();
        NewLocation.set({ 
            name: newLocationName,
            type: newLocationType,
            position: position
        });

        geocoder.geocode({location: position}, function(results, status) {
            if (status === "OK") {
                displayResult(newLocationName, results[0].formatted_address);
            }
            else {
                displayResult(newLocationName);
            }
        });
        
    });
}