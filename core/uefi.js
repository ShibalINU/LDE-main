import {log} from '../simulations.js'

log('uefi phase')

log('uefi attempting to execute the bootloader')
const $bootloader = document.createElement('script')
      $bootloader.src = './core/bootloader.js'
      $bootloader.type = 'module'
document.body.appendChild($bootloader)