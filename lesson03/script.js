/**
* Реализовать RLE-сжатие: AAAB -> A3B, BCCDDDAXXXX -> BC2D3AX4
* @param {string} value
* @return {string}
*/
function rle(value) {
    value = value.toString().toLowerCase();
    
    let result = '';
    let storedLetter = '';
    let counter = 1;
    for (currLetter of value) {
        if (storedLetter != currLetter) {
            result += (counter == 1) ? storedLetter : storedLetter + counter.toString();
            storedLetter = currLetter;
            counter = 1;    
        } else
            counter++;
    }
    result += (counter == 1) ? storedLetter : storedLetter + counter.toString();
    
    return result;
}

//console.log(rle('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD'));

function onCode() {
    let inputString = document.getElementById("inputString").value;
    if (inputString.match(/[A-Z,a-z]/)) {
        let outputString = rle(inputString);
        document.getElementById("outputString").innerText = outputString;
    } else 
        alert("Неправильный формат входных данных. Можно использовать только латинские буквы.");
}

window.onload = function () {
    rle('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD');
}