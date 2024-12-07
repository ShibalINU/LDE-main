import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createUserTemplate } from "../system/system_services.js";
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

document.getElementById("settings.util").addEventListener("click", () => {

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
        "Settings PREVIEW",
        winHead);

    const winQuit = $system_services_createElement.layouts(
        "div",
        {className: "winQuit"},
        "\uE8BB",
        winHead);

    const winSplitView = $system_services_createElement.layouts(
        "div",
        {className: "winSplitView"},
        "",
        winFrame);

    const winSidebar = $system_services_createElement.layouts(
        "div",
        {className: "winSidebar"},
        "",
        winSplitView);

    const winContent = $system_services_createElement.layouts(
        "div",
        {className: "winContent"},
        "",
        winSplitView)

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Personalization"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Personalization",
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Wallpaper and Style",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Choose your desktop wallpaper",
            section)

        var cards = $system_services_createElement.layouts(
            "div",
            {className: "winCardFlex"},
            "",
            section)
            newDataAttribute("a", "wURL", "https://images.pexels.com/photos/27738886/pexels-photo-27738886.jpeg", "dataWallpapers", cards)
            newDataAttribute("a", "wURL", "https://images.pexels.com/photos/20402113/pexels-photo-20402113.jpeg", "dataWallpapers", cards)
            newDataAttribute("a", "wURL", "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg", "dataWallpapers", cards)
            newDataAttribute("a", "wURL", "https://images.pexels.com/photos/1276518/pexels-photo-1276518.jpeg", "dataWallpapers", cards)

        $system_services_createElement.layouts(
            "a",
            {},
            "Browse for more wallpapers",
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Color and Themes",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Choose your theme",
            section)

        var cards = $system_services_createElement.layouts(
            "div",
            {className: "winCardFlex"},
            "",
            section)
            newDataAttribute("a", "wTheme", "light", "dataTheme", cards)
            newDataAttribute("a", "wTheme", "dark", "dataTheme", cards)
            newDataAttribute("a", "wTheme", "black", "dataTheme", cards)

        $system_services_createElement.layouts(
            "p",
            {},
            "Choose your accent color",
            section)

        var cards = $system_services_createElement.layouts(
            "div",
            {className: "winCardFlexS"},
            "",
            section)
            newDataAttribute("a", "wAccentColor", "#2596be", "dataAccentColors", cards)
            newDataAttribute("a", "wAccentColor", "#e28743", "dataAccentColors", cards)

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Accounts"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Accounts",
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Accounts and Signing",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Change your username",
            section)

        const usernameBox = $system_services_createElement.inputs(
            "input",
            {type: "text", placeholder: "Your username will show across all LDE systems"},
            section
        )

        $system_services_createElement.layouts(
            "p",
            {},
            "Change your password",
            section)

        const passwordBox = $system_services_createElement.inputs(
            "input",
            {type: "password", placeholder: "Passwords must be a combination of letters, numbers and symbols"},
            section
        )

        const accounts_updateAccount = $system_services_createElement.layouts(
            "button",
            {},
            "Save changes",
            section)
        accounts_updateAccount.addEventListener('click', () => {
            $systemLockScreen("Settings", "This application wants to:\n\n- Change account settings.\n\nIf you believe this was a mistake, contact your support administrator.", function() {
                const newUsername = usernameBox.value
                const newPassword = passwordBox.value
                // localStorage.removeItem(STORE_SYSTEM_USERNAME)
                // localStorage.removeItem(STORE_SYSTEM_PASSWORD)

                localStorage.setItem('STORE_SYSTEM_USERNAME', newUsername);
                localStorage.setItem('STORE_SYSTEM_PASSWORD', newPassword);
                alert("Settings updated successfully!");
            });
        })

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Applications"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Applications",
            section)

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Accessibility"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Accessibility",
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Display",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Display Scaling",
            section)

        const scalingBox = $system_services_createElement.inputs(
            "input",
            {type: "text", placeholder: "11"},
            section
        )
        scalingBox.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                let toInt = parseInt(scalingBox.value, 10)
                document.documentElement.style.setProperty('--defaultSize', `${toInt}px`);
            }
        })

        $system_services_createElement.layouts(
            "small",
            {},
            "Scales overall UI in px, default is 11px\n\nNote: Some windows are in fixed sizes and is measured by pixels, scaling above recommended range may cause text cut-offs.",
            section)

    var section = $system_services_createElement.layouts(
        "section",
        {className: "About"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {},
            "About",
            section)

        $system_services_createElement.layouts(
            "h1",
            {},
            "LDE",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Web based operating system inspired by KDE, Now built on ES6. Build 2",
            section)

        $system_services_createElement.layouts(
            "h3",
            {},
            "What's new?",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Transitioned to ES6, a more efficient, optimized, versatile, and modular update yet. This update may potentially fix issues with running LDE to other clients",
            section)

    winContent.style.height = "400px";
    winContent.style.width = "400px";

    $system_services_createUserTemplate(localStorage.getItem('STORE_SYSTEM_USERNAME'), "Local Account", winSidebar)

    $system_services_createPage("\uEA86","Personalization",winSidebar,winContent)
    $system_services_createPage("\uEA86","Accounts",winSidebar,winContent)
    $system_services_createPage("\uEA86","Applications",winSidebar,winContent)
    $system_services_createPage("\uEA86","Accessibility",winSidebar,winContent)
    $system_services_createPage("\uEA86","About",winSidebar,winContent)

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