

window.onload = function () {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    let chessBoard = document.getElementById("chessboard");
    let chessBoardWrapper = document.createElement("div");
    chessBoardWrapper.classList.add("main-area-wrp");
    for(let i = 0; i < 8; i++) {
        let currentRow = document.createElement("div");
        currentRow.classList.add("row");
        for (let j = 0; j < 8; j ++) {
            let currCell = document.createElement("div");
            currCell.classList.add("cell");
            currentRow.appendChild(currCell);
        }
        chessBoardWrapper.appendChild(currentRow);
    }
    chessBoard.appendChild(chessBoardWrapper);
}