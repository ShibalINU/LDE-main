import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";


document.getElementById("readme.js").addEventListener("click", () => {

    var preCode5 =
`$system_services_createElement.layouts(
    "h2", <--- HTML TAG | e.g. h1, h2, p, a
    {}, <--- ATTRIBUTES | e.g. className: "", id: "", style: "" (Separated by commas)
    "Hello World", <--- TEXT CONTENT
    section) <--- PARENT TARGET | oftentimes this remains untouched, appends to a desired parent. In this case, <h2> tag parent is 'section'.
`

    var preCode4 =
`...your existing code

var section = $system_services_createElement.layouts(
    "section",
    {},
    "",
    winContent)

...place the snippet here
`

    var preCode3 =
`$system_services_createElement.layouts(
    "h2",
    {},
    "Hello World",
    section)
`

    var preCode2 =
`document.getElementById("example.js").addEventListener("click", () => {
`

    var preCode1 = 
`import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createIconButton } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";
import { $systemLockScreen } from "../system/system_lockScreen.js";

document.getElementById("APP_NAME.js").addEventListener("click", () => {

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
        "My application",
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
        {},
        "",
        winContent)

    winContent.style.width = "300px";
    makeDraggable(winHead);
    removeWindow(winQuit);
});`

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
        {className: "Basics"},
        "",
        winContent)

        var alert = $system_services_createElement.layouts(
            "div",
            {className: "winAlerts"},
            "",
            section)

            $system_services_createElement.layouts(
                "h3",
                {},
                "LDE 2 is in the making",
                alert)

            $system_services_createElement.layouts(
                "p",
                {},
                "LDE 2 aims to create a XML to JS compiler for developers like you, build apps easily.",
                alert)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Basics",
            section)

        $system_services_createElement.layouts(
            "h3",
            {},
            "Executing app",
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Creating a .js file",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            "Fork this code and open VSCode. You'll see the project is divided into four folders: apps, archives, resources, and system. Create a JS file in apps e.g. example.js (this will serve as your project file). After creating a file.",
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Initializing the application",
            section)


        $system_services_createElement.layouts(
            "p",
            {},
            "After creating a file. Copy the following code to create the base application.",
            section)

        $system_services_createElement.layouts(
            "pre",
            {},
            preCode1,
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            `Afterwards, change the name of APP_NAME in document.getElementById("APP_NAME.js").addEventListener("click", () => { to the name of your project file, in this case: example.js. Your output should be like this:`,
            section)

        $system_services_createElement.layouts(
            "pre",
            {},
            preCode2,
            section)

        $system_services_createElement.layouts(
            "small",
            {},
            "Installing your first app",
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            `Go to start menu and open Krita. Krita is a package manager tool to install .js files in the apps folder. Install your first app by typing example.js and click add.`,
            section)

        $system_services_createElement.layouts(
            "p",
            {},
            `Follow the confirmation steps to install your app, then reload your page, your first app should be visible in the start menu lists, and looks like this:`,
            section)

        var dummyContainer1 = $system_services_createElement.layouts(
            "div",
            {className: "dummyContainer"},
            "",
            section)

            var winFrameDC = $system_services_createElement.layouts(
                "div", 
                {className: "winFrame", style: "position: relative;"}, 
                "",
                dummyContainer1);
        
            var winHeadDC = $system_services_createElement.layouts(
                "div",
                {className: "winHead"},
                "",
                winFrameDC);
        
            var winTitleDC = $system_services_createElement.layouts(
                "small",
                {className: "winTitle"},
                "My application",
                winHeadDC);
        
            var winQuitDC = $system_services_createElement.layouts(
                "div",
                {className: "winQuit"},
                "\uE8BB",
                winHeadDC);

            var winContentDC = $system_services_createElement.layouts(
                "div",
                {className: "winContent"},
                "",
                winFrameDC)

            $system_services_createElement.layouts(
                "small",
                {},
                "Adding contents to your app",
                section)

            $system_services_createElement.layouts(
                "p",
                {},
                `Copy and paste the following snippet to insert an element.`,
                section)
        
            $system_services_createElement.layouts(
                "pre",
                {},
                preCode3,
                section)

            $system_services_createElement.layouts(
                "p",
                {},
                `Place the copied snippet below this code in your project`,
                section)

            $system_services_createElement.layouts(
                "pre",
                {},
                preCode4,
                section)

            $system_services_createElement.layouts(
                "p",
                {},
                `Save the project, reload the page and see if your app looks like this:`,
                section)

                var dummyContainer2 = $system_services_createElement.layouts(
                    "div",
                    {className: "dummyContainer"},
                    "",
                    section)
        
                    winFrameDC = $system_services_createElement.layouts(
                        "div", 
                        {className: "winFrame", style: "position: relative;"}, 
                        "",
                        dummyContainer2);
                
                    winHeadDC = $system_services_createElement.layouts(
                        "div",
                        {className: "winHead"},
                        "",
                        winFrameDC);
                
                    winTitleDC = $system_services_createElement.layouts(
                        "small",
                        {className: "winTitle"},
                        "My application",
                        winHeadDC);
                
                    winQuitDC = $system_services_createElement.layouts(
                        "div",
                        {className: "winQuit"},
                        "\uE8BB",
                        winHeadDC);
        
                    winContentDC = $system_services_createElement.layouts(
                        "div",
                        {className: "winContent"},
                        "",
                        winFrameDC)

                    var sectionDC = $system_services_createElement.layouts(
                        "div",
                        {},
                        "",
                        winContentDC)

                        var h1DC = $system_services_createElement.layouts(
                            "h1",
                            {},
                            "Hello World",
                            sectionDC)

                $system_services_createElement.layouts(
                    "pre",
                    {},
                    preCode5,
                    section)

                $system_services_createElement.layouts(
                    "p",
                    {},
                    `HTML TAG -This defines what type of HTML element to create. In this case, "h2" creates a second-level heading (<h2>).
                    
                    ATTRIBUTES- This is an object where you can add various attributes to the element, such as className, id, etc. It's empty ({}) here, meaning no additional attributes are added.
                    
                    TEXT CONTENT- This is the actual text that will be placed inside the newly created HTML element. In this case, it's "Hello World".
                    
                    PARENT TARGET - This refers to the parent element where the new element (<h2>) will be appended. The parent here is specified as section.`,
                    section)

                $system_services_createElement.layouts(
                    "p",
                    {},
                    `The function $system_services_createElement.layouts creates an <h2> element with the text "Hello World" and appends it to the specified section element. The attributes object is currently empty, meaning no additional HTML attributes are being added to this heading.`,
                    section)

                    

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Sidebars"},
        "",
        winContent)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Sidebars",
            section)

            

    winContent.style.height = "500px";
    winContent.style.width = "800px";

    $system_services_createPage("\uEA86","Basics",winSidebar,winContent)
    $system_services_createPage("\uEA86","Sidebars",winSidebar,winContent)

    makeDraggable(winHead);
    removeWindow(winQuit);
});