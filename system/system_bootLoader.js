// system_bootLoader.js is essentially the root of LDE, modules load in order.
// when dealing with ES6 standards, add type = "module" for all scripts

const $system_services = document.createElement("script")
      $system_services.setAttribute("src", "./system/system_services.js")
      $system_services.setAttribute("type", "module")
      document.body.appendChild($system_services)

const $system_lockScreen = document.createElement("script")
      $system_lockScreen.setAttribute("src", "./system/system_lockScreen.js")
      $system_lockScreen.setAttribute("type", "module")
      document.body.appendChild($system_lockScreen)

const $system_bootLoader = document.querySelector(`script[src="system_bootLoader.js"]`);
      if ($system_bootLoader) {
          $system_bootLoader.remove();
      }

const $system_bootLoaderRemnant = document.querySelector(`.bootSession`);
if ($system_bootLoaderRemnant) {
      $system_bootLoaderRemnant.remove();
}