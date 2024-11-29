import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createIconButton } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";

document.getElementById("powerCompiler.js").addEventListener("click", () => {

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
        "Power Compiler | JavaScript",
        winHead
    );
    const winQuit = $system_services_createElement.layouts(
        "div",
        { className: "winQuit" },
        "\uE8BB",
        winHead
    );
    const winLocalNav = $system_services_createElement.layouts(
        "div",
        { className: "winLocalNav" },
        "",
        winFrame
    );
    const winContent = $system_services_createElement.layouts(
        "div",
        { className: "winContent", style: "height: 20rem; width: 40rem;" },
        "",
        winFrame
    );

    // Update app ID
    // const appIDElement = document.getElementById("appID");
    // const appID = parseInt(appIDElement.textContent, 10) + 1;
    // winFrame.setAttribute("data-appID", appID);
    // appIDElement.textContent = appID;

    // Create section for customization
    const section = $system_services_createElement.layouts(
        "section",
        {},
        "",
        winContent
    );

    var alert = $system_services_createElement.layouts(
        "div",
        {className: "winAlerts"},
        "",
        section)

        $system_services_createElement.layouts(
            "p",
            {},
            "This app is still in dev stage. It is not recommended to add this program to the Local Storage lists. By using this app, you are aware of the potential risks of accessing JavaScript directly.",
            alert)

    // Create a wrapper for the textarea
    const wrapper = $system_services_createElement.layouts(
        "ul",
        { className: "wrapper" },
        "",
        section
    );

    const textarea = $system_services_createElement.inputs(
        "textarea",
        { className: "monospaced", placeholder: "Enter JavaScript code here..." },
        wrapper
    );

    const outputDiv = $system_services_createElement.layouts(
        "small",
        { className: "outputDiv" },
        "",
        section
    );

    // Create navigation buttons
    const navButtons = [
        { label: "View", action: () => alert("View button clicked!") },
        { label: "Insert", action: () => alert("Insert button clicked!") },
        { label: "Export", action: () => alert("Export button clicked!") },
        { label: "Run", action: () => runCode() }
    ];

    navButtons.forEach((button) => {
        const btn = $system_services_createElement.inputs(
            "button",
            { textContent: button.label },
            winLocalNav
        );
        btn.addEventListener("click", button.action);
    });

    // Run button functionality
    const runCode = () => {
        try {
            const userCode = textarea.value;
            new Function(userCode)();
            outputDiv.textContent = `Executed`;
        } catch (error) {
            outputDiv.textContent = `Error: ${error.message}`;
        }
    };

    // Finalize app behavior
    // updateAppList();
    // tbarAppList(winTitle.textContent);
    makeDraggable(winHead);
    removeWindow(winQuit);
});
