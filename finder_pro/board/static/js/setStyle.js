function setStyle() {
    if(getCookie('mapSetting') == "") {
        setCookie('mapSetting', 'default');
    }

    switch(getCookie('mapSetting')) {
        case 'default':
            document.body.style.backgroundColor = "white";
            const textsDark = document.getElementsByClassName('big-text');
            console.log("Texts", textsDark)
            if(textsDark) {
                for (let i = 0; i < textsDark.length; i++) {
                    textsDark[i].style.color = "black";
                    console.log("Yo", textsDark);
                }
            }

            const travelParamsLight = document.getElementById('travel-params');
            if(travelParamsLight) {
                travelParamsLight.style.color = "black";
            }

            break;
        case 'darkMode':
            document.body.style.backgroundColor = "#2b2b2b";

            const textsWhite = document.getElementsByClassName('big-text');
            console.log("Texts", textsWhite)
            if(textsWhite) {
                for (let i = 0; i < textsWhite.length; i++) {
                    textsWhite[i].style.color = "white";
                    console.log("Yo", textsWhite);
                }
            }

            const section = document.getElementsByClassName('about-section');
            if(section) {
                for (let i = 0; i < section.length; i++) {
                    section[i].style.color = "white";
                }
            }

            const travelParamsDark = document.getElementById('travel-params');
            if(travelParamsDark) {
                travelParamsDark.style.color = "white";
            }
            break;

        case '':
            document.body.style.backgroundColor = "white";
            const textsNull = document.getElementsByClassName('big-text');
            console.log("Texts", textsNull)
            if(textsNull) {
                for (let i = 0; i <textsNull.length; i++) {
                    textsDark[i].style.color = "black";
                }
            }

            const travelParamsNull = document.getElementById('travel-params');
            if(travelParamsNull) {
                travelParamsNull.style.color = "black";
            }

            break;
    }
}
