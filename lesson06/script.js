/** Объект хранит DOM элемены клеток. Координаты в качестве индексов */
const chessCellMap = {};

function ChessCell(index, domElement) {
    this.index = index;
    this.domElement = domElement;
}


/**
 * Устанавливает заданную фигуру на заданную клетку
 * 
 * @param {string} cellIndex - индекс клетки
 * @param {string} figure - название фигуры
 */
function setFigure(cellIndex, figure) {
    let cell = chessCellMap[cellIndex];
    let cellFigure = cell.figure;
    if (cellFigure)
        cell.domElement.classList.remove(cellFigure);
    
    cell.domElement.classList.add(figure);
    cell.figure = figure;
}

function selectCell(cellIndex) {
    if (window['selectedCellIndex'] != undefined) {
        let oldCell = chessCellMap[selectedCellIndex];
        oldCell.domElement.classList.remove('cell-selected');    
    }
    
    let cell = chessCellMap[cellIndex];
    cell.domElement.classList.add('cell-selected');
    
    selectedCellIndex = cellIndex;
}

window.onload = function () {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    // Создание шахматрой доски
    let chessBoard = document.getElementById("chessboard");
    let chessBoardWrapper = document.createElement("div");
    chessBoardWrapper.classList.add("main-area-wrp");
    for(let i = 0; i < 8; i++) {
        let currentRow = document.createElement("div");
        currentRow.classList.add("row");
        
        let indexBlock = document.createElement("div");
        indexBlock.classList.add("row-index")
        indexBlock.innerText = (i + 1);
        currentRow.appendChild(indexBlock);

        for (let j = 0; j < 8; j ++) {
            let currCell = document.createElement("div");
            currCell.classList.add("cell");
            currCell.classList.add("chess-figure");
            //Для первой строки нужно добавить буквы
            if (i == 0) {
                let letterBlock = document.createElement("div");
                letterBlock.classList.add("col-index");
                letterBlock.innerText = letters[j];
                currCell.appendChild(letterBlock);
            }

            let currIndex = letters[j] + (i + 1);
            currCell.onclick = function () {
                selectCell(currIndex);
            };

            
            let currCellObj = new ChessCell(currIndex, currCell);
            chessCellMap[currIndex] = currCellObj;
            
            currentRow.appendChild(currCell);
        }
        chessBoardWrapper.appendChild(currentRow);
    }
    chessBoard.appendChild(chessBoardWrapper);

    //Расстановка белых фигур
    for(let i = 0; i < 8; i++)
        setFigure(letters[i] + "2", "white-spawn");

    setFigure("a1", "white-rock");
    setFigure("b1", "white-knight");
    setFigure("c1", "white-bishop");
    setFigure("d1", "white-king");
    setFigure("e1", "white-queen");
    setFigure("f1", "white-bishop");
    setFigure("g1", "white-knight");
    setFigure("h1", "white-rock");

    //Расстановка черных фигур
    for(let i = 0; i < 8; i++)
        setFigure(letters[i] + "7", "black-spawn");

    setFigure("a8", "black-rock");
    setFigure("b8", "black-knight");
    setFigure("c8", "black-bishop");
    setFigure("d8", "black-king");
    setFigure("e8", "black-queen");
    setFigure("f8", "black-bishop");
    setFigure("g8", "black-knight");
    setFigure("h8", "black-rock");


}

