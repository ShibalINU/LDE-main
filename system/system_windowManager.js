export function removeWindow(winQuit) {
    winQuit.addEventListener("click", () => {
        const appID = winQuit.parentElement.parentElement.getAttribute("data-appID");
        winQuit.parentElement.parentElement.remove()

        const tbarLists = document.querySelector(".tbarLists");
        const elementToRemove = tbarLists.querySelector(`[data-appID="${appID}"]`);
        if (elementToRemove) {
            elementToRemove.remove();
        }
        // updateAppList();
    })
}

let highestZIndex = 0;

export function makeDraggable(winHead) {

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    const win = winHead.parentElement;

    const handleMouseMove = (e) => {
        if (isDragging) {
            requestAnimationFrame(() => {
                win.style.left = `${e.clientX - offsetX}px`;
                win.style.top = `${e.clientY - offsetY}px`;
            });
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    winHead.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - winHead.parentElement.offsetLeft;
        offsetY = e.clientY - winHead.parentElement.offsetTop;

        // Ensure this window is brought to the front
        highestZIndex++;
        win.style.zIndex = highestZIndex;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}