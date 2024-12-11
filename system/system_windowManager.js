export function removeWindow(winQuit) {
    winQuit.addEventListener("click", () => {
        const appID = winQuit.parentElement.parentElement.getAttribute("data-appID");
        winQuit.parentElement.parentElement.remove();

        const tbarLists = document.querySelector(".tbarLists");
        const elementToRemove = tbarLists.querySelector(`[data-appID="${appID}"]`);
        if (elementToRemove) {
            elementToRemove.remove();
        }
        // updateAppList();
    });
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

export function makeResizable(winFrame) {
    const resizeHandle = document.createElement('div');
    resizeHandle.style.width = '10px';
    resizeHandle.style.height = '10px';
    resizeHandle.style.background = 'gray';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.right = '0';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.cursor = 'se-resize';
    winFrame.appendChild(resizeHandle);

    let isResizing = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
        if (isResizing) {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            winFrame.style.width = `${winFrame.offsetWidth + dx}px`;
            winFrame.style.height = `${winFrame.offsetHeight + dy}px`;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    };

    const handleMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        lastX = e.clientX;
        lastY = e.clientY;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const winHead = document.querySelector(".winHead");
    makeDraggable(winHead);

    const winFrame = document.querySelector(".winFrame");
    makeResizable(winFrame);
});
