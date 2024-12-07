import { log } from '../simulations.js'
import { opus } from './opusFS.js'

log('gui phase')

log('validating gui');
const find_gui = opus.readFile(['root', 'LDE', 'Resources', 'UnifyUI.css']);
    if (find_gui) {
    log(`File path: ${find_gui.path}`);
    log(`File content: ${find_gui.content}`);
    } else {
    log('File not found.');
    }

const gui = document.createElement('link')
      gui.rel = 'stylesheet'
      gui.href = `${find_gui.content}`
document.head.appendChild(gui)

log('gui validation success!');

log('kernel attempting to initialize system services 3/3')
const find_system_services = opus.readFile(['root', 'LDE', 'System', 'system_services.js']);
    if (find_system_services) {
    log(`File path: ${find_system_services.path}`);
    log(`File content: ${find_system_services.content}`);
    } else {
    log('File not found.');
    }

const system_services = document.createElement('script')
      system_services.src = `${find_system_services.content}`
      system_services.type = 'module'
document.body.appendChild(system_services)