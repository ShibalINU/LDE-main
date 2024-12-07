import { log } from '../simulations.js';

log('bootloader phase');

log('bootloader attempting to find bootable device');
const bootableDevice = localStorage.getItem('selected_bootloader');

if (bootableDevice) {
    log('Bootable device found');
    log(`Device name: ${bootableDevice}`);

    log('bootloader attempting to execute bootmanager')
    const $bootmanager = document.createElement('script')
          $bootmanager.src = './core/bootmanager.js'
          $bootmanager.type = 'module'
    document.body.appendChild($bootmanager)
} else {
    log('no bootable device found');
    const deviceName = prompt('no bootable device found. enter the name for the new device:');
    if (deviceName) {
        localStorage.setItem('selected_bootloader', deviceName);
        localStorage.setItem(deviceName, '');
        log(`New bootable device created: ${deviceName}, restart your device to continue`);
    } else {
        log('no bootable device provided. boot process halted.');
    }
}