function initCreateDestinationMap() {
    const zoom_level_for_tiles = 10;
    const select = document.getElementById("select-input");
    const infowindowNewLocation = new google.maps.InfoWindow();
    const infowindowContentNewLocation = document.getElementById("infowindow-content-new-location");
    infowindowNewLocation.setContent(infowindowContentNewLocation);

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.697708, lng: 23.321867 },
        zoom: 12
    });

    const button = document.getElementById("create_destination");
    
    const marker = new google.maps.Marker({
        position: { lat: 42.69821264238199, lng: 23.32152367724611},
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
        }
    }

    marker.addListener('position_changed', function() {
        infowindowContentNewLocation.children["new-location-name"].textContent = getLocationNameFromType(select.value);
        infowindowContentNewLocation.children["new-location-position"].textContent = "Lat: " + marker.position.lat() + " Lng: " + marker.position.lng();
    });

    marker.addListener('mouseover', function() {
        infowindowContentNewLocation.children["new-location-name"].textContent = getLocationNameFromType(select.value);
        infowindowContentNewLocation.children["new-location-position"].textContent = "Lat: " + marker.position.lat() + " Lng: " + marker.position.lng();
        
        infowindowNewLocation.open(map, marker);
    });

    marker.addListener('mouseout', function() {
        infowindowNewLocation.close();
    });

    button.addEventListener("click", function (){
        const newLocationName = getLocationNameFromType(select.value);
        const newLocationType = select.value;
        
        const tileIdString = getTileIdFromLocation(marker.position, zoom_level_for_tiles);
        console.log(tileIdString);
        const locationListRef = firebase.database().ref("Locations/" + tileIdString + "/" + newLocationType);
        
        const lat = marker.position.lat();
        const lng = marker.position.lng();

        
        
        const NewLocation = locationListRef.push();
        NewLocation.set({ 
            name: newLocationName,
            type: newLocationType,
            position: {
                lat: lat,
                lng: lng
            }
        });
        
    });
}