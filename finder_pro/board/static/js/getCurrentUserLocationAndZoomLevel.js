async function getCurrentUserLocationAndZoomLevel() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const returnObject = {
                userPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom_for_pos: {
                    zoom: 12,
                    min_zoom: 9
                }
            }
            try {  
                initOriginDestinationMap(returnObject);
            }
            catch {
                try {
                    initCreateDestinationMap(returnObject);
                }
                catch {
                    window.alert("Something Went Wrong");
                }
            }

    }, () => {
            handleLocationError(true);
            const returnObject = {
                userPosition: {
                    lat: 0,
                    lng: 0
                },
                zoom_for_pos: {
                    zoom: 2,
                    min_zoom: 1
                }
            }

            initOriginDestinationMap(returnObject);

        });
    } else {
        handleLocationError(false);
        const returnObject = {
            userPosition: {
                lat: 0,
                lng: 0
            },
            zoom_for_pos: {
                zoom: 2,
                min_zoom: 1
            }
        }

        initOriginDestinationMap(returnObject);

  }
}

async function handleLocationError(browserHasGeolocation) {
    browserHasGeolocation
    ? window.alert("Error: The Geolocation service failed.")
    : window.alert("Error: Your browser doesn't support geolocation.")
} 
