import { $system_services_createElement, $system_services_createIconButton, $system_services_createUserTemplate } from "./system_services.js";

const superTB = $system_services_createElement.layouts(
    "div",
    {className: "superTB bottom-position"},
    "",
    document.body
)

    const calendarTab = $system_services_createElement.layouts(
        "div",
        {className: "calendarTab hidden", id: "calendarTab"},
        "",
        superTB
    )

        const winLocalNav = $system_services_createElement.layouts(
            "div",
            {className: "winLocalNav"},
            "",
            calendarTab
        )

        const section = $system_services_createElement.layouts(
            "section",
            {},
            "",
            calendarTab
        )
        
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

    const startMenu = $system_services_createElement.layouts(
        "div",
        {className: "startMenu hidden", id: "startMenu"},
        "",
        superTB
    )
    $system_services_createUserTemplate(localStorage.getItem('STORE_SYSTEM_USERNAME'), "Local Account", startMenu)

        $system_services_createElement.layouts(
            "h2",
            {},
            "Home",
            startMenu
        )


        var alert = $system_services_createElement.layouts(
            "div",
            {className: "winAlerts"},
            "",
            startMenu)
    
            $system_services_createElement.layouts(
                "p",
                {},
                "If no apps show up, please reload the page. this is due to a faulty boot loader process",
                alert)

        $system_services_createElement.layouts(
            "small",
            {},
            "Recently Added",
            startMenu
        )

        const startMenu_builtInLock = $system_services_createIconButton("\uE8AF", "Lock", {}, startMenu)
              startMenu_builtInLock.addEventListener('click', () => {
                location.reload()
              })

    const tbarFrame = $system_services_createElement.layouts(
        "div",
        {className: "tbarFrame"},
        "",
        superTB
    )

        const tbarStart = $system_services_createElement.layouts(
            "div",
            {className: "tbarStart"},
            "\uEA86",
            tbarFrame
        )
        tbarStart.addEventListener('click', () => {
            document.getElementById('startMenu').classList.toggle('hidden')
            if (!document.getElementById('calendarTab').classList.contains("hidden")) {document.getElementById("calendarTab").classList.toggle('hidden')}
        })

        $system_services_createElement.inputs(
            "input",
            {type: "text", placeholder: "Type here to search"},
            tbarFrame
        )

        $system_services_createElement.layouts(
            "div",
            {className: "tbarLists", id: "tbarLists"},
            "",
            tbarFrame
        )

        const tbarClock = $system_services_createElement.layouts(
            "small",
            {className: "tbarClock"},
            "7:55\nFriday, September 6",
            tbarFrame
        )
        tbarClock.addEventListener('click', () => {
            document.getElementById('calendarTab').classList.toggle('hidden')
            if (!document.getElementById('startMenu').classList.contains("hidden")) {document.getElementById("startMenu").classList.toggle('hidden')}
        })

        $system_services_createElement.layouts(
            "p",
            {id: "appID"},
            "0",
            tbarFrame
        )


