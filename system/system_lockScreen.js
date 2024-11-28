import { $system_services_createElement } from "./system_services.js";

if (!localStorage.getItem('STORE_SYSTEM_PASSWORD')) {
    localStorage.setItem('STORE_SYSTEM_PASSWORD', '');
}

if (!localStorage.getItem('STORE_SYSTEM_USERNAME')) {
    localStorage.setItem('STORE_SYSTEM_USERNAME', 'User');
}


// Lockscreen and UAC
export const $systemLockScreen = (h2 = "", small = "", callback = null) => {
    const lockScreenFRAMEP = $system_services_createElement.layouts(
        "div",
        { className: "lockScreenFRAMEP" },
        "",
        document.body
    );
    lockScreenFRAMEP.style.zIndex = 999;

    const winFrame = $system_services_createElement.layouts(
        "div",
        { className: "winFrame" },
        "",
        lockScreenFRAMEP
    );

    const winHead = $system_services_createElement.layouts(
        "div",
        {className: "winHead"},
        "",
        winFrame);

        $system_services_createElement.layouts(
            "small",
            {className: "winTitle"},
            "User Account Control",
            winHead);

    const winContent = $system_services_createElement.layouts(
        "div",
        { className: "winContent" },
        "",
        winFrame
    );

    var section = $system_services_createElement.layouts(
        "section",
        {},
        "",
        winContent
    );

    $system_services_createElement.layouts(
        "h2",
        {},
        h2,
        section
    );

    $system_services_createElement.layouts(
        "small",
        {},
        small,  
        section
    );

    $system_services_createElement.layouts(
        "hr",
        {},
        "",
        section
    );

    const lockScreenPASSWORD = $system_services_createElement.inputs(
        "input",
        { type: "password", placeholder: "Enter your password" },
        section
    );

    lockScreenPASSWORD.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (lockScreenPASSWORD.value === localStorage.getItem("STORE_SYSTEM_PASSWORD")) { // Admin password validation
                lockScreenFRAMEP.remove();
                if (callback) callback(); // Execute callback if password is correct
            } else {
                alert("Incorrect administrator password");
            }
        }
    });
}

const lock = document.getElementById("id")
if (!lock) {
    $systemLockScreen(localStorage.getItem("STORE_SYSTEM_USERNAME"), "Do not forget your password", function() {
        const $system_taskbar = document.createElement("script");
        $system_taskbar.setAttribute("src", "./system/system_taskbar.js");
        $system_taskbar.setAttribute("type", "module");
        $system_taskbar.id = "id"
        document.body.appendChild($system_taskbar);
    
        const $system_windowManager = document.createElement("script");
        $system_windowManager.setAttribute("src", "./system/system_windowManager.js");
        $system_windowManager.setAttribute("type", "module");
        document.body.appendChild($system_windowManager);

        const $system_programs = document.createElement("script");
        $system_programs.setAttribute("src", "./system/system_programs.js");
        $system_programs.setAttribute("type", "module");
        document.body.appendChild($system_programs);
    });
}