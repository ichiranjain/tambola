$(document).ready(function () {
	let para = document.getElementById("number_para");
	let random_number = document.getElementById("random");
	let table = document.getElementById("table");
	let game = document.getElementById("end");
	let play_again = document.getElementById("button2");
	let cache = document.getElementById("cache");

	//var w = window.speechSynthesis;

	var array = new Array();
	var store_num = new Array();
	len_store = 0;
	len = 90;
	for (var i = 1; i <= 90; ++i) {
		array.push(i);
	}

	for (var i = 0; i < 9; ++i) {
		for (var j = 0; j < 10; j++) {
			table.rows[i].cells[j].innerText = "";
		}
	}
	for (var i = 0; i < 8; i++) {
		cache.rows[i].cells[0].innerText = "";
	}
	var row_prev = -1;
	var column_prev = -1;
	var row, column;
	random_number.addEventListener("click", function () {
		var ran_value = Math.floor(Math.random() * len);
		len -= 1;
		var n = array[ran_value].toString();
		store_num.push(array[ran_value]);
		len_store += 1;
		var msg = new SpeechSynthesisUtterance(n);
		msg.pitch = 2;
		//w.speak(msg);
		row = parseInt(array[ran_value] / 10);
		column = parseInt(array[ran_value] % 10);
		if (column == 0) {
			column = 10;
			row -= 1;
		}

		if (len_store < 9) {
			var k = 0;
			for (var i = len_store - 1; i >= 0; --i) {
				cache.rows[k].cells[0].innerText = store_num[i].toString();
				k += 1;
			}
		} else {
			var k = 0;
			for (var i = len_store - 1; i >= len_store - 8; --i) {
				cache.rows[k].cells[0].innerText = store_num[i].toString();
				k += 1;
			}
		}

		table.rows[row].cells[column - 1].innerText = n;
		table.rows[row].cells[column - 1].style.backgroundColor = "#d4c893";
		table.rows[row].cells[column - 1].style.backgroundImage =
			"linear-gradient(45deg, #FFFF00 0%, #d4c893 100%)";
		if (row_prev !== -1 && column_prev !== -1) {
			table.rows[row_prev].cells[column_prev - 1].style.background = null;
		}
		para.innerText = n;
		row_prev = row;
		column_prev = column;
		array.splice(ran_value, 1);
		if (len == 0) {
			random_number.style.display = "none";
			game.style.display = "block";
		}
	});

	play_again.addEventListener("click", function () {
		if (confirm("Are you sure you want to reset the game?")) {
			random_number.style.display = "block";
			game.style.display = "none";
			para.innerText = "0";
			array = new Array();
			len = 90;
			for (var i = 1; i <= 90; ++i) {
				array.push(i);
			}
			store_num = new Array();
			len_store = 0;

			for (var i = 0; i < 9; ++i) {
				for (var j = 0; j < 10; j++) {
					table.rows[i].cells[j].innerText = "";
				}
			}
			for (var i = 0; i < 8; i++) {
				cache.rows[i].cells[0].innerText = "";
			}
			table.rows[row].cells[column - 1].style.background = null;
			var row_prev = -1;
			var column_prev = -1;
		}
	});
});
