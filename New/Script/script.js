let gameMode = 'mouseover'; /*click*/
let colorMode = 'default'; /*random*/
let gridSize = 16;

const body = document.querySelector('body');

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
            cell.addEventListener(gameMode, (e) => e.target.style.backgroundColor = changeColor());
            cellRow.append(cell);
        }
        gridContainer.append(cellRow);
    }

    body.append(gridContainer)
}

createGrid(gridSize);

const clearButton = document.createElement('button');
clearButton.textContent = "clear";
clearButton.addEventListener('click', (e) => {
    document.querySelector('.gridContainer').remove();
    gridSize = -1;
    while (gridSize < 1 || gridSize > 100) {
        gridSize = prompt('Select a grid size between 1 and 100', 16);
    }
    createGrid(gridSize);
});

body.append(clearButton);

function randomColor() {
    return `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
}

function changeColor() {
    if (colorMode === 'default') {
        return 'grey';
    } else if (colorMode === 'random') {
        return randomColor();
    }
}