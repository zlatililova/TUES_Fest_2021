function initCreateDestinationMap() {
    var myLatlng = new google.maps.LatLng(42.697708,23.321867);
    var mapOptions = {
        zoom: 12,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true,
        title: "Drag me!"
    });
    
    map.addListener('click', function (mapsMouseEvent) {
        infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
        var info = infoWindow.setContent(mapsMouseEvent.latLng.toString());
    });
}