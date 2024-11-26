import { $system_services_createElement } from "./system/system_services.js";
import { $system_services_createPage } from "./system/system_services.js";
import { $system_services_createUserTemplate } from "./system/system_services.js";
import { $system_services_createIconButton } from "./system/system_services.js";
import { makeDraggable } from "./system/system_windowManager.js";
import { removeWindow } from "./system/system_windowManager.js";
import { $systemLockScreen } from "./system/system_lockScreen.js";

const fileSystem = {
    Root: {
      Home: {
        "file1.txt": "This is a sample file.",
      },
    },
  };
  
  document.getElementById("files.js").addEventListener("click", () => {
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
      "Files DEV", 
      winHead
    );
  
    const winQuit = $system_services_createElement.layouts(
      "div", 
      {className: "winQuit"}, 
      "\uE8BB", 
      winHead
    );
  
    const winLocalNav = $system_services_createElement.layouts(
      "div", 
      {className: "winLocalNav"}, 
      "", 
      winFrame
    );
  
    const files_createNode = $system_services_createElement.layouts(
      "button", 
      {className: "button"}, 
      "Create", 
      winLocalNav
    );
    
    const files_deleteNode = $system_services_createElement.layouts(
      "button", 
      {className: "button"}, 
      "Delete", 
      winLocalNav
    );
  
    const winContent = $system_services_createElement.layouts(
      "div", 
      {className: "winContent"}, 
      "", 
      winFrame
    );
  
    // Display initial file structure
    function renderFileSystem() {
      winContent.innerHTML = ""; 
      for (const folder in fileSystem.Root) {
        const folderDiv = $system_services_createElement.layouts(
          "div", 
          {className: "folder"}, 
          folder, 
          winContent
        );
        const files = fileSystem.Root[folder];
        for (const file in files) {
          $system_services_createElement.layouts(
            "div", 
            {className: "file"}, 
            file, 
            folderDiv
          );
        }
      }
    }
  
    renderFileSystem();
  
    // Create node (folder or file)
    files_createNode.addEventListener("click", () => {
      const folderName = prompt("Enter folder name:");
      if (folderName && !fileSystem.Root[folderName]) {
        fileSystem.Root[folderName] = {};
        renderFileSystem();
      }
    });
  
    // Delete node
    files_deleteNode.addEventListener("click", () => {
      const folderName = prompt("Enter folder name to delete:");
      if (fileSystem.Root[folderName]) {
        delete fileSystem.Root[folderName];
        renderFileSystem();
      }
    });
  
    makeDraggable(winHead);
    removeWindow(winQuit);
  });
  