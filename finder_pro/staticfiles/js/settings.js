function webSiteSetting() {

        let hasAcceptedCookies = sessionStorage.getItem("hasAcceptedCookies");

        if(hasAcceptedCookies == null) {
            hasAcceptedCookies = "False";
        }

        console.log(hasAcceptedCookies)
 
        let selectwebSiteSetting = document.getElementById("select-map-setting");
        
        switch(selectwebSiteSetting.value) {
            case "darkMode":
                selectwebSiteSetting.value = "default";
                break;
            case "default":
                selectwebSiteSetting.value = "darkMode";
                break;
        }

        const selectwebSiteSettingFirstOptionInnerHtml = selectwebSiteSetting.children['first-option'].innerHTML;
        const selectwebSiteSettingFirstOptionValue = selectwebSiteSetting.children['first-option'].value;
        selectwebSiteSetting.children['first-option'].innerHTML = selectwebSiteSetting.children['second-option'].innerHTML;
        selectwebSiteSetting.children['first-option'].value = selectwebSiteSetting.children['second-option'].value;
        selectwebSiteSetting.children['second-option'].innerHTML = selectwebSiteSettingFirstOptionInnerHtml;
        selectwebSiteSetting.children['second-option'].value = selectwebSiteSettingFirstOptionValue;

        if(hasAcceptedCookies === "True") {
            setCookie("webSiteSetting", selectwebSiteSetting.value, 10);
            setStyle();
        }
        else if (hasAcceptedCookies === "False"){
            sessionStorage.setItem("uiState", selectwebSiteSetting.value);
            setStyle();
        }

}