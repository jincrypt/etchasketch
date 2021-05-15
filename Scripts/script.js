// Grid Size for exercise, default 16x16
let gridSize = 16;

const gridSpace = document.querySelector('#gridSpace');
let colorMode = 'default';
let mouseDrawing = false; 

// Defaults to hover drawing
let drawingMode = 'hover';   


// Changes button for mouse mode
let buttonMode = document.querySelector('#mode');
let buttonText = document.querySelector('#modeText')
buttonMode.addEventListener('click', (e) => {
    if (drawingMode === 'click') {
        drawingMode = 'hover';
        buttonText.textContent = `Mode:\n\nHover`;
    } else if (drawingMode === 'hover') {
        drawingMode = 'click';
        buttonText.textContent = `Mode:\n\nClick`;
    }
})

// Add event listener to clear button
document.querySelector('#clear').addEventListener('click', (e) => {
    clearScreen();

    // Based on how clearScreen was made, if user presses cancel, the following statement will just clear
    if (gridSize) {
        createGrid(gridSize);
    }
})

// Cancels mouseDrawing mode if your mouse goes off the screen. 
// Only works if propagation is stopped while your mouse is on the screen.
document.querySelector('body').addEventListener('mouseover', (e) => {
    if (drawingMode === 'click') {
        mouseDrawing = false;
    }
})

// Add event listener to classic and random numbers
let buttonColor = document.querySelector('#colorMode')
buttonColor.addEventListener('click', (e) => {
    if (colorMode === 'default') {
        colorMode = 'random';
        buttonColor.textContent = 'random'
    } else if (colorMode === 'random') {
        colorMode = 'default'
        buttonColor.textContent = 'Classic';
    }
});


function createGrid(gridSize) {
    gridSpace.style.gridTemplateRows = `repeat(${gridSize},1fr)`;

    // Removes Previous Grid
    let removeRows = document.querySelectorAll('.gridRow');
    removeRows.forEach(row => {
        row.parentNode.removeChild(row);
    });

    // Creates new grid (rows first). Assigns correct grid spacing.
    for (let i = 0; i < gridSize; i++){
        let gridRow = document.createElement('div');
        gridRow.className = 'gridRow';
        gridRow.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        
        // Creates individual squares for the current row
        for (let j = 0; j < gridSize; j++){
            let gridSquare = document.createElement('div');
            gridSquare.className = 'gridSquare';
            gridSquare.addEventListener('mouseover', (e) => {
                if (drawingMode === 'hover') {
                    gridColor(gridSquare);
                }
            });
            gridSquare.addEventListener('mousedown', (e) => {
                if (drawingMode === 'click') {
                    gridColor(gridSquare);
                    mouseDrawing = true;
                }
            });            
            gridSquare.addEventListener('mousemove', (e) => {
                if (mouseDrawing === true && drawingMode === 'click') {
                    gridColor(gridSquare);
                }
            });
            gridSquare.addEventListener('mouseup', (e) => {
                if (mouseDrawing === true && drawingMode === 'click') {
                    mouseDrawing = false;
                }
            });
            gridSquare.addEventListener('mouseover', (e) => {
                if (mouseDrawing === true && drawingMode === 'click') {
                    e.stopPropagation();
                }
            });
            gridSquare.addEventListener('touchmove', touch);

            gridRow.appendChild(gridSquare);
        }
        gridSpace.appendChild(gridRow);
    }
}

// Function for touch/mobile support
function touch(e) {
    // Prevents additional mouse-down (prevents scrolling)
    e.preventDefault();

    // Variable for location of finger !! target only shows initial target. Not subsequent after fingers move.
    let touches = e.changedTouches[0]

    // Returns element at finger position (x, y).
    gridSquare = document.elementFromPoint(touches.clientX, touches.clientY);
    
    // Added if statement to prevent changing colors of random elements
    // Used catch to clean up console log so it doesn't print out element errors
    try {
        if (gridSquare.className === 'gridSquare') {
            // Add color on element if element is gridSquare
            gridColor(gridSquare);              
        }
    } catch(err) {}
}

// Function to change color
function gridColor(gridSquare) {
    let currentColor = gridSquare.style.backgroundColor;
    if (colorMode === 'default') {
            gridSquare.style.backgroundColor = 'grey';
    } else if (colorMode === 'random') {
        if (!currentColor || currentColor === 'grey') {
            gridSquare.style.backgroundColor = randomRGB();
        } else {
            gridSquare.style.backgroundColor = modifyRGB(gridSquare);
        }
    }
}

// Function for random rgba
function randomRGB() {
    return `rgb(${Math.round(Math.random()*255)} ,${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)})`
}

// Function for reading and increasing current rgb by 10%
function modifyRGB(gridSquare) {
    let cellRGB = getComputedStyle(gridSquare).backgroundColor.replace(/\D/g,' ').trim().split('  ');
    return `rgb(${cellRGB[0] * 0.9}, ${cellRGB[1] * 0.9}, ${cellRGB[2] * 0.9})`;
}

// Function for clear button.
function clearScreen() {
    let screen = document.querySelectorAll('.gridSquare');
    screen.forEach(e => {
        if (e.style.backgroundColor) {
            e.style.removeProperty('background-color');
        }
    });

    do {
        gridSize = prompt('How many squares per side for the new grid?\n\nChoose between 1 to 100', 16);
        if (gridSize === null) {
            break;
        }
    } while (isNaN(gridSize) || gridSize < 1 || gridSize > 100);
}

// Run once to create initial grid.
createGrid(gridSize);
