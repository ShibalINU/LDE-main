import { log } from '../simulations.js';

log('bootmanager phase');

let $selected_bootloader_content = localStorage.getItem(localStorage.getItem('selected_bootloader'))

if ($selected_bootloader_content === '') {
    log('bootable device is unformatted. formatting with OpusFS...')

    const OpusFS = 
    {
        name: "root",
        type: "directory",
        contents: [
            {
                name: "LDE",
                type: "directory",
                contents: [
                    {
                        name: "Resources",
                        type: "directory",
                        contents: [
                            {
                                name: "UnifyUI.css",
                                type: "file",
                                contents: "resources/unifyUI.css"
                            }
                        ]
                    },
                    {
                        name: "System",
                        type: "directory",
                        contents: [
                            {
                                name: "system_services.js",
                                type: "file",
                                contents: "system/system_services.js"
                            },
                            {
                                name: "system_lockScreen.js",
                                type: "file",
                                contents: "system/system_lockScreen.js"
                            }
                        ]
                    },
                    {
                        name: "Utilities",
                        type: "directory",
                        contents: [
                            {
                                name: "settings.util",
                                type: "file",
                                contents: "apps/settings.js"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    localStorage.setItem(localStorage.getItem('selected_bootloader'), JSON.stringify(OpusFS));
    log(JSON.stringify(OpusFS,null,2))
    log(`${localStorage.getItem('selected_bootloader')} format successful. restart to proceed kernel phase.`)
} else {
    log('bootmanager attempting to execute the kernel')
    const $kernel = document.createElement('script')
          $kernel.src = './core/kernel.js'
          $kernel.type = 'module'
    document.body.appendChild($kernel)
}