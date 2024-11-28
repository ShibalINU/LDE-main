import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";



document.getElementById("textedit.js").addEventListener("click", () => {
    // Create the window frame
    const winFrame = $system_services_createElement.layouts("div", { className: "winFrame" }, "", document.body);

    // Window header
    const winHead = $system_services_createElement.layouts("div", { className: "winHead" }, "", winFrame);
    $system_services_createElement.layouts("small", { className: "winTitle" }, "Notepad App", winHead);
    const winQuit = $system_services_createElement.layouts("div", { className: "winQuit" }, "\uE8BB", winHead);

    // Split view (Sidebar + Content)
    const winSplitView = $system_services_createElement.layouts("div", { className: "winSplitView" }, "", winFrame);
    const winSidebar = $system_services_createElement.layouts("div", { className: "winSidebar" }, "", winSplitView);
    const winContent = $system_services_createElement.layouts("div", { className: "winContent" }, "", winSplitView);

    // Sidebar pages
    const notepadPage = $system_services_createPage("\uE70F", "Notes", winSidebar, winContent);
    const viewNotesPage = $system_services_createPage("\uE8D2", "History", winSidebar, winContent);

    // Notepad Page
    const notepadSection = $system_services_createElement.layouts(
        "section",
        { className: "Notes" },
        "",
        winContent
    );

    var headings1 = $system_services_createElement.layouts(
        "h2",
        {},
        "Notes",
        notepadSection)

    const textArea = $system_services_createElement.layouts(
        "textarea",
        {
            placeholder: "Write your notes here..."
        },
        "",
        notepadSection
    );

    const saveButton = $system_services_createElement.layouts(
        "button",
        {},
        "Save Note",
        notepadSection
    );

    saveButton.addEventListener("click", () => {
        const note = textArea.value.trim();
        if (note) {
            const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
            savedNotes.push({ time: new Date().toLocaleString(), content: note });
            localStorage.setItem("notes", JSON.stringify(savedNotes));
            alert("Note saved!");
            textArea.value = ""; // Clear textarea
        } else {
            alert("Cannot save an empty note.");
        }
    });

    // History Page
    const notesSection = $system_services_createElement.layouts(
        "section",
        { className: "History hidden" }, // Initially hidden
        "",
        winContent
    );

    const notesContainer = $system_services_createElement.layouts(
        "div",
        {},
        "",
        notesSection
    );

    const loadNotes = () => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        notesContainer.innerHTML = ""; // Clear existing notes

        var headings1 = $system_services_createElement.layouts(
            "h2",
            {},
            "History",
            notesContainer)

        var alert = $system_services_createElement.layouts(
            "div",
            {className: "winAlerts"},
            "",
            notesContainer)

            $system_services_createElement.layouts(
                "p",
                {},
                "Fun fact: GPT 4o wrote this code.",
                alert)
                if (savedNotes.length) {
                    savedNotes.forEach((note) => {
                        // Create a container for each note
                        const noteContainer = $system_services_createElement.layouts(
                            "div",
                            {className: "winCards"},
                            "", // No inner text here, we will build content manually
                            notesContainer
                        );
                
                        // Create and add the time element
                        const noteTime = $system_services_createElement.layouts(
                            "b",
                            {},
                            note.time,
                            noteContainer
                        );
                
                        // Create and add the content element
                        const noteContent = $system_services_createElement.layouts(
                            "div",
                            {},
                            note.content,
                            noteContainer
                        );
                    });
                } else {
                    notesContainer.textContent = "No notes saved.";
                }
                
    };
    console.log("viewNotesPage:", viewNotesPage);

    // Load notes on page click
    viewNotesPage.addEventListener("click", loadNotes);

    winContent.style.width = "500px"
    winContent.style.height = "400px"

    // Window interaction handlers
    makeDraggable(winHead); // Draggable
    removeWindow(winQuit); // Close button
});
