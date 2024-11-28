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

// resizable window
export function makeResizable(win) {
    // Ensure .resizers div exists
    let resizers = win.querySelector('.resizers');
    if (!resizers) {
        resizers = document.createElement('div');
        resizers.classList.add('resizers');
        win.appendChild(resizers);

        // Add individual resizers
        const positions = [
            'top-left', 'top-right', 'bottom-left', 'bottom-right',
            'top', 'right', 'bottom', 'left'
        ];

        positions.forEach(pos => {
            const resizer = document.createElement('div');
            resizer.classList.add('resizer', pos);
            resizers.appendChild(resizer);
        });
    }

    let isResizing = false;
    let currentResizer;
    let startX, startY, startWidth, startHeight;

    const handleMouseMove = (e) => {
        if (!isResizing) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (currentResizer.classList.contains('bottom-right')) {
            win.style.width = `${startWidth + dx}px`;
            win.style.height = `${startHeight + dy}px`;
        } else if (currentResizer.classList.contains('bottom-left')) {
            win.style.width = `${startWidth - dx}px`;
            win.style.height = `${startHeight + dy}px`;
            win.style.left = `${win.offsetLeft + dx}px`;
        } else if (currentResizer.classList.contains('top-right')) {
            win.style.width = `${startWidth + dx}px`;
            win.style.height = `${startHeight - dy}px`;
            win.style.top = `${win.offsetTop + dy}px`;
        } else if (currentResizer.classList.contains('top-left')) {
            win.style.width = `${startWidth - dx}px`;
            win.style.height = `${startHeight - dy}px`;
            win.style.left = `${win.offsetLeft + dx}px`;
            win.style.top = `${win.offsetTop + dy}px`;
        } else if (currentResizer.classList.contains('right')) {
            win.style.width = `${startWidth + dx}px`;
        } else if (currentResizer.classList.contains('left')) {
            win.style.width = `${startWidth - dx}px`;
            win.style.left = `${win.offsetLeft + dx}px`;
        } else if (currentResizer.classList.contains('bottom')) {
            win.style.height = `${startHeight + dy}px`;
        } else if (currentResizer.classList.contains('top')) {
            win.style.height = `${startHeight - dy}px`;
            win.style.top = `${win.offsetTop + dy}px`;
        }
    };

    const handleMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e) => {
        isResizing = true;
        currentResizer = e.target;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = win.offsetWidth;
        startHeight = win.offsetHeight;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    resizers.querySelectorAll('.resizer').forEach(resizer => {
        resizer.addEventListener('mousedown', handleMouseDown);
    });
}
