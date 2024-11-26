document.body.innerHTML = `
    <div class="bootSession">
        <h1>LDE</h1>
        <small>Press F1 to launch, F12 for BIOS</small>
    </div>
    `

    function handleKeydown(event) {
        if (event.key === 'F1') {
            event.preventDefault();
            const $system_bootLoader = document.createElement("script");
            $system_bootLoader.setAttribute("src", "./system/system_bootLoader.js");
            $system_bootLoader.setAttribute("type", "module");
            document.body.appendChild($system_bootLoader);
            document.removeEventListener('keydown', handleKeydown);
        } else if (event.key === 'F12') {
            window.location.href = `bootSession.html`;
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    
    document.addEventListener('keydown', handleKeydown);
    