let gameMode = 'mouseover'; /*click*/
let colorMode = 'default'; /*random*/

const body = document.querySelector('body');

function createGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gridContainer');

    for (let i = 0; i < 16; i++) {
        let cellRow = document.createElement('div');
        cellRow.classList.add('cellRow');
        for (let j = 0; j < 16; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener(gameMode, (e) => e.target.style.backgroundColor = changeColor());

            cellRow.append(cell);
        }
        gridContainer.append(cellRow);
    }

    body.append(gridContainer)
}

createGrid();

const clearButton = document.createElement('button');
clearButton.textContent = "clear";
clearButton.addEventListener('click', (e) => {
    document.querySelectorAll('.cell').forEach(item => item.style.backgroundColor = "white")
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