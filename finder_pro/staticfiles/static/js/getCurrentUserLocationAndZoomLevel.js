async function getCurrentUserLocationAndZoomLevel() {
    if(localStorage.getItem("hasAcceptedCookies") === "True") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLocationObject = {
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
                    initOriginDestinationMap(userLocationObject);
                }
                catch {
                    try {
                        initCreateDestinationMap(userLocationObject);
                    }
                    catch {
                        window.alert ("Something Went Wrong");
                    }
                }
    
        }, () => {
                handleLocationError(true);
                const userLocationObject = {
                    userPosition: {
                        lat: 0,
                        lng: 0
                    },
                    zoom_for_pos: {
                        zoom: 2,
                        min_zoom: 1
                    }
                }
    
                try {  
                    initOriginDestinationMap(userLocationObject);
                }
                catch {
                    try {
                        initCreateDestinationMap(userLocationObject);
                    }
                    catch {                           
                        window.alert ("Something Went Wrong");
                    }
                }
    
    
            });
        } else {
            handleLocationError(false);
            const userLocationObject = {
                userPosition: {
                    lat: 0,
                    lng: 0
                },
                zoom_for_pos: {
                    zoom: 2,
                    min_zoom: 1
                }
            }
            
            try {  
                initOriginDestinationMap(userLocationObject);
            }
            catch {
                try {
                    initCreateDestinationMap(userLocationObject);
                }
                catch {
                    window.alert ("Something Went Wrong");
                }
            }
    
    
      }
    }
    else {
        const userLocationObject = {
            userPosition: {
                lat: 0,
                lng: 0
            },
            zoom_for_pos: {
                zoom: 2,
                min_zoom: 1
            }
        }
        
        try {  
            initOriginDestinationMap(userLocationObject);
        }
        catch {
            try {
                initCreateDestinationMap(userLocationObject);
            }
            catch {
                window.alert ("Something Went Wrong");
            }
        }
    }
}

async function handleLocationError(browserHasGeolocation) {
    browserHasGeolocation
    ? window.alert ("Error: The Geolocation service failed.")
    : window.alert ("Error: Your browser doesn't support geolocation.")
} 
