import { $system_services_createElement, $system_services_createIconButton } from "./system_services.js"; // Ensure correct case
import { opus } from "../core/opusFS.js";
// Assuming `opus` is your FS API and `startMenu` is the parent element for app icons
// Define the path to the Utilities directory
const utilitiesPath = ['root', 'LDE', 'Utilities'];

// Fetch the Utilities directory node
const utilitiesNode = opus.getNode(utilitiesPath);

if (utilitiesNode && utilitiesNode.contents) {
    // Loop through all contents of the Utilities directory
    utilitiesNode.contents.forEach(item => {
        // Check if the item is a .util file
        if (item.type === 'file' && item.name.endsWith('.util')) {
            // Read the file's content using opus.readFile
            const appFile = opus.readFile([...utilitiesPath, item.name]);

            if (appFile) {
                // Dynamically create a script element to load the app
                const appScript = document.createElement('script');
                appScript.src = appFile.content; // Use the content as the source path
                appScript.type = 'module';
                document.body.appendChild(appScript);

                // Create an icon for the app in the UI
                $system_services_createIconButton("\uEA86", item.name, { id: item.name }, startMenu);

                console.log(`App loaded: ${item.name}`);
            } else {
                console.error(`Failed to load app: ${item.name}`);
            }
        }
    });
} else {
    console.error("Utilities directory not found or is empty.");
}
