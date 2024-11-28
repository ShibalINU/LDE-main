import { $system_services_createElement } from "../system/system_services.js";
import { $system_services_createPage } from "../system/system_services.js";
import { $system_services_createIconButton } from "../system/system_services.js";
import { makeDraggable } from "../system/system_windowManager.js";
import { removeWindow } from "../system/system_windowManager.js";
import { $systemLockScreen } from "../system/system_lockScreen.js";

document.getElementById("ldefs.js").addEventListener("click", () => {

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
        "Finder",
        winHead);

    const winQuit = $system_services_createElement.layouts(
        "div",
        {className: "winQuit"},
        "",
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

// Assuming 'section' is already created and available

// Navigation container with address bar
$system_services_createElement.layouts('div', { class: 'nav-container' }, '', section);
$system_services_createElement.inputs('input', { type: 'text', id: 'address-bar', value: 'root/', readonly: true }, section);

// Navigation container with buttons
var navContainer = $system_services_createElement.layouts('div', { class: 'nav-container' }, '', section);
$system_services_createElement.layouts('button', { id: 'back-btn' }, 'Back', navContainer);
$system_services_createElement.layouts('button', { id: 'create-folder-btn' }, 'Create Folder', navContainer);
$system_services_createElement.layouts('button', { id: 'create-file-btn' }, 'Create File', navContainer);
$system_services_createElement.layouts('button', { id: 'delete-btn' }, 'Delete Selected', navContainer);

// LarkFS header and version info
$system_services_createElement.layouts('h3', {}, 'LarkFS', section);
$system_services_createElement.layouts('small', {}, 'Version A01', section);

// Folder list container
$system_services_createElement.layouts('div', { id: 'folder-list' }, '', section);




    winContent.style.width = "800px";
    winContent.style.height = "500px";
    makeDraggable(winHead);
    removeWindow(winQuit);

// file system functions

let fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {
    name: "root",
    type: "directory",
    contents: []
  };

  let currentPath = ['root'];
  let selectedItem = null; 

  function initializeFileSystem() {
    updateAddressBar();
    updateFolderView();
  }


  function updateAddressBar() {
    document.getElementById('address-bar').value = currentPath.join('/') + '/';
  }

  // Update the folder and file view (based on current directory)
  function updateFolderView() {
    const folderList = document.getElementById('folder-list');
    folderList.innerHTML = ''; 
    let currentDir = getNode(currentPath); 

    if (currentDir && currentDir.contents) {
      currentDir.contents.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add(item.type); // Use 'folder' or 'file' class
        
        // Create a container for the item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add(item.type);
        
        // Add the icon (folder.png or file.png)
        const img = document.createElement('img');
        img.src = item.type === 'directory' ? 'folder.png' : 'file.png';
        itemContainer.appendChild(img);
        
        // Add the name of the folder or file
        const name = document.createElement('div');
        name.textContent = item.name;
        itemContainer.appendChild(name);

        // Handle click (for selection) and double-click (for navigation)
        itemContainer.addEventListener('click', (e) => handleClick(e, item));
        itemContainer.addEventListener('dblclick', (e) => handleDoubleClick(e, item)); // Double-click for folder navigation
        
        folderList.appendChild(itemContainer);
      });
    }
  }

  // Handle single click select
  function handleClick(e, item) {
    selectItem(e, item);
  }

  // Handle double-click to navigate
  function handleDoubleClick(e, item) {
    if (item.type === 'directory') {
      navigateToFolder(item.name);
    }
  }

  // Select an item (highlight it with a blue border)
  function selectItem(e, item) {
    if (selectedItem) {
      // Remove selection from the previously selected item
      const previousSelected = document.querySelector('.selected');
      if (previousSelected) {
        previousSelected.classList.remove('selected');
      }
    }

    // Add selection style to the clicked item
    const itemElement = e.target.closest('div');
    itemElement.classList.add('selected');
    selectedItem = item;
  }


  function navigateToFolder(folderName) {
    currentPath.push(folderName);
    updateAddressBar();
    updateFolderView();
  }

  function goBack() {
    if (currentPath.length > 1) {
      currentPath.pop(); 
      updateAddressBar();
      updateFolderView();
    }
  }

  function createFolder() {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      let currentDir = getNode(currentPath);
      if (currentDir) {
        currentDir.contents.push({
          name: folderName,
          type: 'directory',
          contents: []
        });
        updateFolderView();
        saveFileSystem();
      }
    }
  }

  function createFile() {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      let currentDir = getNode(currentPath);
      if (currentDir) {
        currentDir.contents.push({
          name: fileName,
          type: 'file',
          content: "" 
        });
        updateFolderView();
        saveFileSystem();
      }
    }
  }


  function deleteSelectedItem() {
    if (!selectedItem) {
      alert('Please select a folder or file to delete!');
      return;
    }

    const currentDir = getNode(currentPath);
    if (currentDir) {
      currentDir.contents = currentDir.contents.filter(item => item !== selectedItem);
      updateFolderView();
      saveFileSystem();
      selectedItem = null; 
    }
  }

  function getNode(path) {
    let currentNode = fileSystem;
    for (let i = 1; i < path.length; i++) {
      const folder = currentNode.contents.find(item => item.name === path[i]);
      if (!folder || folder.type !== 'directory') {
        return null; 
      }
      currentNode = folder;
    }
    return currentNode;
  }


  function saveFileSystem() {
    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
  }

  // event listeners
  document.getElementById('create-folder-btn').addEventListener('click', createFolder);
  document.getElementById('create-file-btn').addEventListener('click', createFile);
  document.getElementById('delete-btn').addEventListener('click', deleteSelectedItem);
  document.getElementById('back-btn').addEventListener('click', goBack);

  // initialize FS
  initializeFileSystem();

});