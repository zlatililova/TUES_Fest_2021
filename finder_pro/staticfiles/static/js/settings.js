function webSiteSetting() {

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

        setCookie("webSiteSetting", selectwebSiteSetting.value, 10);
        setStyle();
}