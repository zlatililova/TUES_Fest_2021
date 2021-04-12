function popup() {
    let wasAskedForCookieConsent = localStorage.getItem("wasAsked");
    let hasAcceptedCookies = localStorage.getItem("hasAcceptedCookies");
    console.log(hasAcceptedCookies);

    if(hasAcceptedCookies == null) {
        hasAcceptedCookies = "False";
    }

    if(wasAskedForCookieConsent == null) {
        wasAskedForCookieConsent = "False";
    }

    if(wasAskedForCookieConsent === "False") {
        console.log("9", hasAcceptedCookies);
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.id = "main-popup";
        popup.textContent = "We use Cookies Only To Maximize The Quality Of Your User Experience";
        const declineButton = document.createElement("button");
        const acceptButton = document.createElement("button");

        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
    
        declineButton.className = "main-button";
        acceptButton.className = "main-button";

        declineButton.textContent = "Decline Non-Essential Cookies";
        declineButton.id = "decline-cookies-button";

        acceptButton.textContent = "Accept All Cookies";
        acceptButton.id = "accept-cookies-button";
        

        popup.appendChild(acceptButton);
        popup.appendChild(declineButton);
    
        document.body.appendChild(popup);
        document.body.appendChild(backdrop);
        console.log("HEyqaadw");
    
        declineButton.addEventListener("click", function() {
            document.body.removeChild(popup);
            document.body.removeChild(backdrop);
            localStorage.setItem("hasAcceptedCookies", "False");
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
            localStorage.setItem("wasAsked", "True");
            initOriginDestinationMap(userLocationObject);
        });
        
        acceptButton.addEventListener("click", function() {
            document.body.removeChild(popup);
            document.body.removeChild(backdrop);
            localStorage.clear();
            localStorage.setItem("hasAcceptedCookies", "True");
            localStorage.setItem("wasAsked", "True");
            getCurrentUserLocationAndZoomLevel();
        })
    }

    else if(hasAcceptedCookies === "True"){
        
        getCurrentUserLocationAndZoomLevel();

        console.log(hasAcceptedCookies);
    }

    else if(hasAcceptedCookies === "False") {
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
        initOriginDestinationMap(userLocationObject);
    }

    

}