function getTileIdFromLocation(latLng, zoom) {
    const tileIdObject = getTileIdObjectFromLocation(latLng, zoom);
    const tileIdString = getStringFromXY(tileIdObject.x, tileIdObject.y);
    return tileIdString;
}

function getTileIdObjectFromLocation(latLng, zoom) {
    const TILE_SIZE = 256;
    const scale = 1 << zoom;
    const worldCoordinate = project(latLng);
    const tileIdObject = new google.maps.Point(
        Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
        Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
    );
    return tileIdObject;
}

function project(latLng) {
    const TILE_SIZE = 256;
    let siny = Math.sin((latLng.lat() * Math.PI) / 180);
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return new google.maps.Point(
        TILE_SIZE * (0.5 + latLng.lng() / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    );
}

function getStringFromXY(x, y) {
    const stringFromXY = "" + x + ", " + y;
    return stringFromXY;
}