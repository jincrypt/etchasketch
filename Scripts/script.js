// Grid Size for exercise, default 16x16
let gridSize = 16;
let gridSpace = document.querySelector('#gridSpace');
let colorMode = 'default';


// Add event listener to clear button
document.querySelector('#clear').addEventListener('click', (e) => {
    clearScreen();

    // Based on how clearScreen was made, if user presses cancel, the following statement will just clear
    if (gridSize) {
        createGrid(gridSize);
    }
})

// Add event listener to classic and random numbers
document.querySelector('#classic').addEventListener('click', (e) => {
    colorMode = 'default';
})
document.querySelector('#random').addEventListener('click', (e) => {
    colorMode = 'random';
})


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
                gridColor(gridSquare);
            })
            gridRow.appendChild(gridSquare);
        }
        gridSpace.appendChild(gridRow);
    }
}

// Function to change color
function gridColor(gridSquare) {
    let currentColor = gridSquare.style.backgroundColor;
    if (colorMode === 'default') {
            gridSquare.style.backgroundColor = 'grey';
    } else if (colorMode === 'random') {
        if (!currentColor) {
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
    r = cellRGB[0] * 0.9;
    if (r > 255) {
        r = 255;
    }
    g = cellRGB[1] * 0.9;
    if (g > 255) {
        g = 255;
    }
    b = cellRGB[2] * 0.9;
    if (b > 255) { 
        b = 255;
    }
    return `rgb(${r}, ${g}, ${b})`;
}

// Function for clear button.
function clearScreen() {
    let screen = document.querySelectorAll('.gridSquare');
    screen.forEach(e => {
        if (e.style.backgroundColor) {
            e.style.backgroundColor = 'white';
        }
    });

    do {
        gridSize = prompt('How many squares per side for the new grid?\n\nChoose between 1 to 100');
        if (gridSize === null) {
            break;
        }
    } while (isNaN(gridSize) || gridSize < 1 || gridSize > 100);


}

// Run once to create initial grid.
createGrid(gridSize);