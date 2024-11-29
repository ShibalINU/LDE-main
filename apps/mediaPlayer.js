// ported mediaplayer from LDE 0.1

import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createIconButton } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";

document.getElementById("mediaPlayer.js").addEventListener("click", () => {
    // Create the main window structure
    const winFrame = $system_services_createElement.layouts(
        "div",
        { className: "winFrame" },
        "",
        document.body
    );
    const winHead = $system_services_createElement.layouts(
        "div",
        { className: "winHead" },
        "",
        winFrame
    );
    const winTitle = $system_services_createElement.layouts(
        "small",
        { className: "winTitle" },
        "Media Player DEV",
        winHead
    );
    const winQuit = $system_services_createElement.layouts(
        "div",
        { className: "winQuit" },
        "\uE8BB",
        winHead
    );
    const winSplitView = $system_services_createElement.layouts(
        "div",
        { className: "winSplitView" },
        "",
        winFrame
    );
    const winSidebar = $system_services_createElement.layouts(
        "div",
        { className: "winSidebar" },
        "",
        winSplitView
    );
    const winContent = $system_services_createElement.layouts(
        "div",
        { className: "winContent", style: "height: 40rem; width: 40rem;" },
        "",
        winSplitView
    );

    // Update app ID
    // const appIDElement = document.getElementById("appID");
    // const appID = parseInt(appIDElement.textContent, 10) + 1;
    // winFrame.setAttribute("data-appID", appID);
    // appIDElement.textContent = appID;

    // Create "Home" section
    const sectionHome = $system_services_createElement.layouts(
        "section",
        { className: "Home"},
        "",
        winContent
    );

    const fileInput = $system_services_createElement.inputs(
        "input",
        { type: "file", accept: "audio/*,video/*" },
        sectionHome
    );

    fileInput.addEventListener("change", () => {
        // Remove existing media elements
        sectionHome.querySelectorAll("audio, video").forEach(media => media.remove());

        const file = fileInput.files[0];
        const fileURL = URL.createObjectURL(file);

        if (file.type.startsWith("audio")) {
            const audioElement = $system_services_createElement.inputs(
                "audio",
                { className: "mediaPlayer", controls: true, src: fileURL },
                sectionHome
            );
        } else if (file.type.startsWith("video")) {
            const videoElement = $system_services_createElement.inputs(
                "video",
                {
                    className: "mediaPlayer",
                    controls: true,
                    style: "width: 100%; height: auto;",
                    src: fileURL
                },
                sectionHome
            );
        }
    });

    // Create "About" section
    const sectionAbout = $system_services_createElement.layouts(
        "section",
        { className: "About" },
        "",
        winContent
    );
    $system_services_createElement.layouts(
        "h2",
        {},
        "Welcome to Media Player",
        sectionAbout
    );
    $system_services_createElement.layouts(
        "p",
        {},
        "This media player can play both audio and video files. You can also import media files to play.",
        sectionAbout
    );

    var alert = $system_services_createElement.layouts(
        "div",
        {className: "winAlerts"},
        "",
        sectionAbout)

        $system_services_createElement.layouts(
            "p",
            {},
            "App ported from LDE 0.1 and is updated",
            alert)

    // Add pages to the sidebar
    $system_services_createPage("\uEA86", "Home", winSidebar, winContent);
    $system_services_createPage("\uE8F1", "About", winSidebar, winContent);

    // Finalize app behavior
    // updateAppList();
    // tbarAppList(winTitle.textContent);
    makeDraggable(winHead);
    removeWindow(winQuit);
});
