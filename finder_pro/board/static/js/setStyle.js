function setStyle() {
    let uiState = localStorage.getItem("uiState");
    if(uiState == null) {
        uiState = 'default';
    }
    if(localStorage.getItem("hasAcceptedCookies") === "True") {
        if (getCookie('webSiteSetting') == "") {
            setCookie('webSiteSetting', 'default');
        }
        uiState = getCookie('webSiteSetting');
    }

    switch(uiState) {
        case 'default':
            document.body.style.backgroundColor = "white";
            const textsDark = document.getElementsByClassName('big-text');
            if (textsDark) {
                for (let i = 0; i < textsDark.length; i++) {
                    textsDark[i].style.color = "black";
                }
            }

            const travelParamsLight = document.getElementById('travel-params');
            if (travelParamsLight) {
                travelParamsLight.style.color = "black";
            }

            break;
        case 'darkMode':
            document.body.style.backgroundColor = "#2b2b2b";

            const textsWhite = document.getElementsByClassName('big-text');
            if (textsWhite) {
                for (let i = 0; i < textsWhite.length; i++) {
                    textsWhite[i].style.color = "white";
                }
            }

            const section = document.getElementsByClassName('about-section');
            if (section) {
                for (let i = 0; i < section.length; i++) {
                    section[i].style.color = "white";
                }
            }

            const travelParamsDark = document.getElementById('travel-params');
            if (travelParamsDark) {
                travelParamsDark.style.color = "white";
            }
            break;

        case '':
            document.body.style.backgroundColor = "white";
            const textsNull = document.getElementsByClassName('big-text');
            if (textsNull) {
                for (let i = 0; i <textsNull.length; i++) {
                    textsDark[i].style.color = "black";
                }
            }

            const travelParamsNull = document.getElementById('travel-params');
            if (travelParamsNull) {
                travelParamsNull.style.color = "black";
            }

            break;
    }
}
