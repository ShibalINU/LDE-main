import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createIconButton } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";

document.getElementById("calendar.js").addEventListener("click", () => {

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
        "Calendar",
        winHead);

    const winQuit = $system_services_createElement.layouts(
        "div",
        {className: "winQuit"},
        "\uE8BB",
        winHead);

    const winLocalNav = $system_services_createElement.layouts(
        "div",
        {className: "winLocalNav"},
        "",
        winFrame);

    const winContent = $system_services_createElement.layouts(
        "div",
        {className: "winContent"},
        "",
        winFrame);

    var section = $system_services_createElement.layouts(
        "section",
        {className: "Personalization"},
        "",
        winContent);

    winContent.style.width = "300px";

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    // Create previous and next buttons only once
    $system_services_createElement.inputs(
        "button",
        { className: "calendarExample-prev", innerText: "<", onclick: () => changeMonth(section, -1) },
        winLocalNav
    );

    $system_services_createElement.inputs(
        "button",
        { className: "calendarExample-next", innerText: ">", onclick: () => changeMonth(section, 1) },
        winLocalNav
    );

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    
    const generateCalendar = (section, year, month) => {
        section.innerHTML = ""; // Clear the previous calendar content
    
        // Create calendar header
        const header = $system_services_createElement.layouts(
            "h2",
            { className: "calendarExample-header" },
            `${monthNames[month]} ${year}`, // Updated format
            section
        );
    
        // Weekdays row
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekDaysRow = $system_services_createElement.layouts(
            "div",
            { className: "calendarExample-weekdays" },
            "",
            section
        );
    
        weekDays.forEach(day => {
            $system_services_createElement.layouts(
                "p",
                { className: "calendarExample-weekday" },
                day,
                weekDaysRow
            );
        });
    
        // Days grid
        const daysRow = $system_services_createElement.layouts(
            "div",
            { className: "calendarExample-days" },
            "",
            section
        );
    
        const daysInCurrentMonth = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);
        const matchDay = new Date().getDay(); // Corrected line
    
        for (let i = 0; i < firstDay; i++) {
            let daylist = $system_services_createElement.layouts(
                "p",
                { className: "calendarExample-empty" },
                "",
                daysRow
            );
    
            if (i == matchDay) {
                daylist.style.color = "var(--accentHoverState)";
            }
        }
    
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const dayElement = $system_services_createElement.layouts(
                "p",
                { className: "calendarExample-day" },
                day,
                daysRow
            );
    
            // Apply accent color to the current day
            if (day === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                dayElement.style.backgroundColor = "var(--accentHoverState)";
                dayElement.style.color = "var(--defaultText)"
            }
        }
    };
    
    const changeMonth = (section, offset) => {
        currentMonth += offset;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(section, currentYear, currentMonth);
    };
    
    generateCalendar(section, currentYear, currentMonth);

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
