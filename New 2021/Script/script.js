let gameMode = 'mouseover'; /*click*/
let colorMode = 'default'; /*random*/
let gridSize = 16;

const body = document.querySelector('body');

function changeColor(cell) {
    let currentColor = cell.style.backgroundColor;
    if (colorMode === 'default') {
        return 'grey';
    } else if (colorMode === 'random') {
        if (!currentColor || currentColor === 'grey') {
            return `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
        } else {
            let currentRGB = getComputedStyle(cell).backgroundColor.replace(/\D/g,' ').trim().split('  ');
            return `rgb(${currentRGB[0] * 0.9}, ${currentRGB[1] * 0.9}, ${currentRGB[2] * 0.9})`;
        }
    }
}

function createGrid(gridSize) {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gridContainer');
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize; i++) {
        let cellRow = document.createElement('div');
        cellRow.classList.add('cellRow');
        cellRow.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener(gameMode, (e) => {
                e.target.style.backgroundColor = changeColor(e.target);
            });
            cell.addEventListener('touchmove', touch);
            cellRow.append(cell);
        }
        gridContainer.append(cellRow);
    }

    body.append(gridContainer)
}

createGrid(gridSize);

const clearButton = document.createElement('button');
clearButton.textContent = "Clear";
clearButton.addEventListener('click', (e) => {
    document.querySelector('.gridContainer').remove();
    gridSize = -1;
    while (gridSize < 1 || gridSize > 100) {
        gridSize = prompt('Select a grid size between 1 and 100', 16);
    }
    createGrid(gridSize);
});

body.append(clearButton);

const colorModeButton = document.createElement('button');
colorModeButton.textContent = 'Default';
colorModeButton.addEventListener('click', (e) => {
    let currentMode = e.target.textContent.toLowerCase();
    if (currentMode === 'default') {
        colorModeButton.textContent = 'Random';
        colorMode = 'random';
    } else {
        colorModeButton.textContent = 'Default';
        colorMode = 'default';
    }
});

body.append(colorModeButton);


// Touch function https://gist.github.com/VehpuS/6fd5dca2ea8cd0eb0471
function touch(e) {
    // Prevents emulated mouse events
    e.preventDefault();

    // changedTouches will always provide the first target. But it will also provide the changing cursor values. Can use those values to determine the new elements
    let touches = e.changedTouches[0];
    let touchedCell = document.elementFromPoint(touches.clientX, touches.clientY);
    try {
        if (touchedCell.className === 'cell') {
            touchedCell.style.backgroundColor = changeColor(touchedCell);              
        }
    } catch(err) {}
}