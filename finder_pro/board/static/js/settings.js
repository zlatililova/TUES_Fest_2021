function mapSetting() {

        let selectmapSetting = document.getElementById("select-map-setting");
        
        switch(selectmapSetting.value) {
            case "darkMode":
                selectmapSetting.value = "default";
                break;
            case "default":
                selectmapSetting.value = "darkMode";
                break;
        }

        const selectmapSettingFirstOptionInnerHtml = selectmapSetting.children['first-option'].innerHTML;
        const selectmapSettingFirstOptionValue = selectmapSetting.children['first-option'].value;
        selectmapSetting.children['first-option'].innerHTML = selectmapSetting.children['second-option'].innerHTML;
        selectmapSetting.children['first-option'].value = selectmapSetting.children['second-option'].value;
        selectmapSetting.children['second-option'].innerHTML = selectmapSettingFirstOptionInnerHtml;
        selectmapSetting.children['second-option'].value = selectmapSettingFirstOptionValue;

        setCookie("mapSetting", selectmapSetting.value, 10);
}