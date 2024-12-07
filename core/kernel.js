import {log} from '../simulations.js'

log('kernel phase')

log('kernel attempting to initialize RAM')
localStorage.setItem('RAM', '{}');

log('RAM is used to store current running applications and services')

log('kernel attempting to initialize opusFS 1/3')
const $opusFS = document.createElement('script')
      $opusFS.src = './core/opusFS.js'
      $opusFS.type = 'module'
document.body.appendChild($opusFS)