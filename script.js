
function tempCalc() {
	var tempCel = parseFloat(document.getElementById("temp_cel_field").value);
	if (!isNaN(tempCel)) {
		var tempFar =  (9 / 5) * tempCel + 32;
		alert("Температура, град Фаренгейта: " + tempFar);
	} else {
		alert("Температура не задана или введена некорректно");
	}
}


window.onload = function () {
	var admin;
	var name = "Василий";
	admin = name;
	document.getElementById("admin_val").innerText = admin;
	
	var sum = 1000 + "108";	
	document.getElementById("sum_val").innerText = sum;
}


