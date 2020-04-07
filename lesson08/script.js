/** Объект хранит DOM элемены клеток. Координаты в качестве индексов */
const chessCellMap = {};

let isWhiteTurn = true;

const whiteTimer = new Timer("Время белых вышло. Игра окончена.", "white-timer");
const blackTimer = new Timer("Время черных вышло. Игра окончена.", "black-timer");

/** Класс таймена */
function Timer(timerEndMsg, timerSelector) {
    this.time = 120;
    this.timerEndMsg = timerEndMsg; //"Время белых вышло. Игра окончена.";
    this.timerSelector = timerSelector; //"white-timer";

    this.formatTime = function(time) {
        let min = Math.floor(time/60).toString();
        let sec = (time % 60).toString();
        if (min.length == 1)
            min = "0" + min;
        if (sec.length == 1)
            sec = "0" + sec;

        return `${min}:${sec}`;
    }

    this.startTimer = function () {
        this.setIntObj = setInterval(this.procTimer, 1000, this);
    }

    this.stopTimer = function () {
        clearInterval(this.setIntObj);
    }

    this.procTimer = function (timer) {
        timer.time -= 1;
        document.getElementById(timer.timerSelector).innerText = timer.formatTime(timer.time);
        if (timer.time == 0) {
            timer.stopTimer();
            alert(timer.timerEndMsg);
        }
    }
}

function ChessCell(index, domElement) {
    this.index = index;
    this.domElement = domElement;
    this.figure = null;
    
    this.setFigure = function (figure) {
        if (this.figure != null)
            this.domElement.classList.remove(this.figure);
        
        this.domElement.classList.add(figure);
        this.figure = figure;
    };
    
    this.removeFigure = function () {
        if (this.figure != null)
            this.domElement.classList.remove(this.figure);
        this.figure = null;
    };

    this.setSelection = function(isSelected) {
        if (isSelected)
            this.domElement.classList.add('cell-selected');
        else
            this.domElement.classList.remove('cell-selected');
    };

    this.hasWhiteFigure = function () {
        return this.figure.indexOf('white') == 0;
    };
}


/**
 * Устанавливает заданную фигуру на заданную клетку
 * 
 * @param {string} cellIndex - индекс клетки
 * @param {string} figure - название фигуры
 */
function setFigure(cellIndex, figure) {
    let cell = chessCellMap[cellIndex];
    cell.setFigure(figure);
}

function onSelectCell(cellIndex) {
    let cell = chessCellMap[cellIndex];
    //Второй клик на поле при ходе. (ранее была выбрана фигура)
    if (window['selectedCellIndex'] != undefined) {
        let oldCell = chessCellMap[selectedCellIndex];
        oldCell.setSelection(false);
        //На второй клетке есть фигура
        if (cell.figure != null) {
            if (isWhiteTurn) {
                if (!cell.hasWhiteFigure()) {
                    makeMove(selectedCellIndex, cellIndex);
                } else 
                    alert("Ход белых. Свои фигуры есть нельзя");
            } else {
                if (cell.hasWhiteFigure()) {
                    makeMove(selectedCellIndex, cellIndex);
                } else 
                    alert("Ход черных. Свои фигуры есть нельзя");
            }              
        //На второй клетке других фигур нет. Просто перемещаем.
        } else
            makeMove(selectedCellIndex, cellIndex);
    
        selectedCellIndex = undefined;
    //Первый клик на поле (выбор фигуры)
    } else {
        if (cell.figure != null) {
            // Проверка возможности выбора фигуры
            let selectFigure = false;
            if (isWhiteTurn) {
                if (cell.hasWhiteFigure())
                    selectFigure = true;
                else
                    alert("Ход белых. Выберите белую фигуру.")
            } else {
                if (!cell.hasWhiteFigure())
                    selectFigure = true;
                else
                    alert("Ход черных. Выберите черную фигуру.")
            }

            //Выбор фигуры
            if (selectFigure) {
                cell.setSelection(true);
                selectedCellIndex = cellIndex;
            }

        }
    }
}

function makeMove(fromCellIndex, toCellIndex) {
    let fromCell = chessCellMap[fromCellIndex];
    let toCell = chessCellMap[toCellIndex];
    
    toCell.setFigure(fromCell.figure);
    
    fromCell.removeFigure();
    fromCell.setSelection(false);

    let currHistory = document.getElementById("history").innerHTML;    
    currHistory += isWhiteTurn ? `белые: ${fromCellIndex} &rarr; ${toCellIndex}` : `, черные: ${fromCellIndex} &rarr; ${toCellIndex} <br/>`;
    
    document.getElementById("history").innerHTML = currHistory;
    
    if (isWhiteTurn) {
        whiteTimer.stopTimer();
        blackTimer.startTimer();
    } else {
        blackTimer.stopTimer();
        whiteTimer.startTimer();
    }

    isWhiteTurn = !isWhiteTurn;
    updateMoveStatus();
}


function updateMoveStatus() {
    if(isWhiteTurn)
        document.getElementById("move-turn").innerText = "белые";
    else
        document.getElementById("move-turn").innerText = "черные";
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
            currCell.addEventListener('click', function () {
                onSelectCell(currIndex);
            });

            
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

    //Запуск таймера
    whiteTimer.startTimer();
}

