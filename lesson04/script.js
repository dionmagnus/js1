//Задание 1

function numToObject(num) {
    let order1 = num % 10;
    let order2 = Math.floor((num % 100)/10);    
    let order3 = Math.floor((num % 1000)/100);
    return {'единицы': order1, 'десятки': order2, 'сотни': order3};
}


function onCode() {
    let inputString = document.getElementById("inputString").value;
    if (inputString.match(/^\d{1,3}$/)) {
        let outputString = numToObject(parseInt(inputString));
        document.getElementById("outputString").innerText = JSON.stringify(outputString);
    } else 
        alert("Неправильный формат входных данных. Вводить нужно число в диаразоне 0-999");

}

//Задание 2
function Fruit(color, shape) {
    this.color = color;
    this.shape = shape;
    this.showFruit = function() {
        return this.color + " " + this.shape;
    }
}


window.onload = function () {
    let apple = new Fruit("зеленое", "круглое");
    let banan = new Fruit("желтый", "длинный"); 

    document.getElementById("apple").innerText = JSON.stringify(apple);
    document.getElementById("banan").innerText = JSON.stringify(banan);
    <br/>
    document.getElementById("apple_showFruit").innerText = apple.showFruit();
    document.getElementById("banan_showFruit").innerText = banan.showFruit();
}
