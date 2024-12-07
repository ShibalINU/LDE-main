
import { log } from '../simulations.js'

log('opusFS phase')

let fileSystem = JSON.parse(localStorage.getItem(localStorage.getItem('selected_bootloader')))
let currentPath = ['root']
log(`opusFS retrieved from ${localStorage.getItem('selected_bootloader')}`)
log(`${JSON.stringify(fileSystem,null,2)}`)

export const opus = {
  createFile() {
    const fileName = prompt('Enter file name:')
    if (fileName) {
      let currentDir = this.getNode(currentPath)
      if (currentDir) {
        currentDir.contents.push({
          name: fileName,
          type: 'file',
          content: ""
        })
        console.log('File created: ' + fileName)
        this.saveFileSystem()
      }
    }
  },

  createFolder() {
    const folderName = prompt('Enter folder name:')
    if (folderName) {
      let currentDir = this.getNode(currentPath)
      if (currentDir) {
        currentDir.contents.push({
          name: folderName,
          type: 'directory',
          contents: []
        })
        console.log('Folder created: ' + folderName)
        this.saveFileSystem()
      }
    }
  },

  deleteItem() {
    const itemName = prompt('Enter the name of the file/folder to delete:')
    let currentDir = this.getNode(currentPath)
    if (currentDir) {
      const itemToDelete = currentDir.contents.find(item => item.name === itemName)
      if (itemToDelete) {
        currentDir.contents = currentDir.contents.filter(item => item !== itemToDelete)
        console.log('Deleted item: ' + itemName)
        this.saveFileSystem()
      } else {
        console.log('Item not found.')
      }
    }
  },

  getNode(path) {
    let currentNode = fileSystem;
    for (let i = 1; i < path.length; i++) {
      const item = currentNode.contents.find(item => item.name === path[i]);
      
      if (!item) {
        // If the item is not found at any point, return null
        return null;
      }
      
      if (item.type === 'directory') {
        // If the item is a directory, navigate inside it
        currentNode = item;
      } else if (i === path.length - 1 && item.type === 'file') {
        // If we are at the last element in the path and it's a file, return it
        return item;
      }
    }
    // If we finish the loop without returning a file, return the current directory
    return currentNode;
  },

  readFile(path) {
    let fileNode = this.getNode(path);  // Retrieve the file node by path

    if (fileNode && fileNode.type === 'file') {
      // If the file is found, return the file content and its path
      return {
        content: fileNode.contents, // Get content of the file
        path: path.join('/')
      };
    } else {
      console.log('File not found or path is incorrect.');
      return null;  // Return null if the file is not found or the path is invalid
    }
  },

  

  saveFileSystem() {
    localStorage.setItem(localStorage.getItem('selected_bootloader'), JSON.stringify(fileSystem))
  }
}

log('kernel attempting to initialize gui 2/3')
const $gui = document.createElement('script')
      $gui.src = './core/gui.js'
      $gui.type = 'module'
document.body.appendChild($gui)
