import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createIconButton } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";
import { $systemLockScreen } from "../system/system_lockScreen.js";

const newDataAttribute = (htmlTag, dataAttr, dataAttrVal, className, appendTo) => {
    const newElement = document.createElement(htmlTag);
    const fullDataAttr = `data-${dataAttr}`;

    newElement.setAttribute(fullDataAttr, dataAttrVal);
    newElement.classList.add(className);

    appendTo.appendChild(newElement);

    newElement.addEventListener('click', () => {
        const wURL = newElement.getAttribute(fullDataAttr);

        if (newElement.classList.contains("dataAccentColors")) {
            document.documentElement.style.setProperty('--accentHoverState', wURL);
            
        } else if (newElement.classList.contains("dataWallpapers")) {
            document.body.style.backgroundImage = `url('${wURL}')`;

        } else if (newElement.classList.contains("dataTheme")) {
            const themes = {
                light: {
                    '--winFrame': '#f5f5f5',
                    '--winFrame2': '#f0f0f0',
                    '--defaultText': '#0a0a0a'
                },
                dark: {
                    '--winFrame': '#1d1d1d',
                    '--winFrame2': '#0e0e0e',
                    '--defaultText': '#ffffff'
                },
                black: {
                    '--winFrame': '#000000',
                    '--winFrame2': '#0e0e0e',
                    '--defaultText': '#ffffff'
                }
            };
            
            const theme = themes[wURL];
            if (theme) {
                Object.entries(theme).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value);
                });
            }
        }
    });

    return newElement;
};

document.getElementById("krita.js").addEventListener("click", () => {

    const winFrame = $system_services_createElement.layouts(
        "div", 
        {className: "winFrame"}, 
        "",
        document.body);

    const winHead = $system_services_createElement.layouts(
        "div",
        {className: "winHead"},
        "",
        winFrame);

    const winTitle = $system_services_createElement.layouts(
        "small",
        {className: "winTitle"},
        "Krita",
        winHead);

    const winQuit = $system_services_createElement.layouts(
        "div",
        {className: "winQuit"},
        "\uE8BB",
        winHead);

    const winContent = $system_services_createElement.layouts(
        "div",
        {className: "winContent"},
        "",
        winFrame)

    const winFooter = $system_services_createElement.layouts(
        "div",
        {className: "winFooter"},
        "",
        winFrame)

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Personalization"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {placeholder: "Add or remove a package here", type: "text"},
            "Krita",
            section
        )

        const krita_inputBox = $system_services_createElement.inputs(
            "input",
            {placeholder: "Add or remove a package here", type: "text"},
            section
        )

        $system_services_createElement.layouts(
            "small",
            {},
            "This will add or remove a LocalStorage key and bootloader will read it when the page reloads, reducing the need of manually creating or removing a key in developer tools.\n\nPlease explicitly include .js at the end of the name.",
            section)

        const krita_addToLS = $system_services_createElement.layouts(
            "button",
            {},
            "Add",
            winFooter
        )
        krita_addToLS.addEventListener('click', () => {
            $systemLockScreen("Krita", "This applications wants to:\n\nModify LocalStorage settings.\n\nIf you believe this was a mistake, contact your support administrator.", function() {
                let keyAddress = krita_inputBox.value.replaceAll(" ", "_")
                localStorage.setItem(keyAddress, "");
                alert("Settings updated successfully!");
            });
        })

        const krita_removeToLS = $system_services_createElement.layouts(
            "button",
            {},
            "Remove",
            winFooter
        )
        krita_removeToLS.addEventListener('click', () => {
            $systemLockScreen("Krita", "This application wants to:\n\n- Modify LocalStorage settings.\n\nIf you believe this was a mistake, contact your support administrator.", function() {
                let keyAddress = krita_inputBox.value.replaceAll(" ", "_")
                localStorage.removeItem(keyAddress, "");
                alert("Settings updated successfully!");
            });
        })

    winContent.style.width = "300px";

    let num = parseInt(document.getElementById("appID").textContent, 10)
    winFrame.setAttribute("data-appID", ++num)
    document.getElementById("appID").textContent = num
    const currentWindowOpened = $system_services_createIconButton(
        "\uEA86",
        winTitle.textContent,
        {},
        document.getElementById('tbarLists')
    )
    currentWindowOpened.setAttribute("data-appID", num)

    // updateAppList();
    // tbarAppList(winTitle.textContent)
    makeDraggable(winHead);
    removeWindow(winQuit);
});