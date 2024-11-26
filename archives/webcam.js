import { $system_services_createElement } from "./system/system_services.js";
import { $system_services_createPage } from "./system/system_services.js";
import { $system_services_createIconButton } from "./system/system_services.js";
import { makeDraggable } from "./system/system_windowManager.js";
import { removeWindow } from "./system/system_windowManager.js";

document.getElementById("webcam.js").addEventListener("click", () => {
    const winFrame = $system_services_createElement.layouts(
        "div", 
        {className: "winFrame"}, 
        "",
        document.body
    );

    const winHead = $system_services_createElement.layouts(
        "div",
        {className: "winHead"},
        "",
        winFrame
    );

    const winTitle = $system_services_createElement.layouts(
        "small",
        {className: "winTitle"},
        "Webcam Preview",
        winHead
    );

    const winQuit = $system_services_createElement.layouts(
        "div",
        {className: "winQuit"},
        "\uE8BB",
        winHead
    );

    const winContent = $system_services_createElement.layouts(
        "div",
        {className: "winContent"},
        "",
        winFrame
    );

    const videoSection = $system_services_createElement.layouts(
        "section",
        {className: "videoContainer"},
        "",
        winContent
    );

    const videoElement = $system_services_createElement.inputs(
        "video",
        {
            id: "webcamVideo",
            autoplay: true,
        },
        videoSection
    );

    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }

    startWebcam();

    winContent.style.width = "768px";

    let num = parseInt(document.getElementById("appID").textContent, 10);
    winFrame.setAttribute("data-appID", ++num);
    document.getElementById("appID").textContent = num;

    const currentWindowOpened = $system_services_createIconButton(
        "\uEA86",
        winTitle.textContent,
        {},
        document.getElementById('tbarLists')
    );
    currentWindowOpened.setAttribute("data-appID", num);

    makeDraggable(winHead);
    removeWindow(winQuit);
});
