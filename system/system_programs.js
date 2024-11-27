import { $system_services_createElement, $system_services_createIconButton } from "./system_services.js"; // Ensure correct case

// default apps:
localStorage.setItem('calendar.js', '');
localStorage.setItem('krita.js', '');
localStorage.setItem('settings.js', '');
localStorage.setItem('readme.js', '');
localStorage.setItem('webcam.js', '');
localStorage.setItem('files.js', '');

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let newAddress = "apps/" + key

    if (key.includes(".js")) {
        const $system_programs_qualified_app = document.createElement("script");
        $system_programs_qualified_app.setAttribute("src", newAddress);
        $system_programs_qualified_app.setAttribute("type", "module");
        document.body.appendChild($system_programs_qualified_app);

        $system_services_createIconButton("\uEA86", key, { id: key }, startMenu)

        console.log("Installed or Registered:", key);
    }
}