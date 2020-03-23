
function generateNumber() {	
	let numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	let number = "";
	for (let i = 0; i < 4; i++) {
		let randIndex = Math.round(Math.random() * (numArray.length - 1));
		number += "" + numArray[randIndex];
		numArray.splice(randIndex, 1);
	}
	
	return number;
}


function checkNumber(enteredNumber, secretNumber) {
	let entered = Array.from(enteredNumber.toString(10));
	let secret = Array.from(secretNumber.toString(10));
	
	let bulls = 0;
	for(let i = 0; i < entered.length; i++) {
		if (entered[i] == secret[i])
			bulls++;
	}
	
	let sortedEntered = entered.sort();
	let sortedSecret = secret.sort();
	
	let cows = 0;
	for(let i = 0; i < sortedEntered.length; i++) {
		if (sortedEntered[i] == sortedSecret[i])
			cows++;
	}
	
	return [cows, bulls];
}


function onGenerateNumber() {
	let genNum = generateNumber();
	document.getElementById('secretNumber').value = genNum;
	document.getElementById('debugNumber').innerText = genNum;
}

function onCheckNumber() {
	let secretNumber = parseInt(document.getElementById('secretNumber').value);
	let enteredNumber = parseInt(document.getElementById('enteredNumber').value);
	if (secretNumber == enteredNumber) {
		alert("Вы укадали число");
	} else {
		let res = checkNumber(enteredNumber, secretNumber);
		alert("Коров: " + res[0] + ", Быков: " + res[1]);
	}
}


window.onload = function () {
	onGenerateNumber();
}
