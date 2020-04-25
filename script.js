$(document).ready(function () {
	let para = document.getElementById("number_para");
	let btnNextNumber = document.getElementById("random");
	let table = document.getElementById("table");
	let game = document.getElementById("end");
	let btnNewGame = document.getElementById("btn_new-game");
	let $cache = $("#cache");

	let tokens = new Array();
	let store_num = new Array();
	let len_store = 0;
	let len = 90;

	function init() {
		$cache.empty();

		for (let i = 1; i <= 90; ++i) {
			tokens.push(i);
		}
	}

	//var w = window.speechSynthesis;

	for (var i = 0; i < 9; ++i) {
		for (var j = 0; j < 10; j++) {
			table.rows[i].cells[j].innerText = "";
		}
	}

	init();

	var row_prev = -1;
	var column_prev = -1;
	var row, column;

	btnNextNumber.addEventListener("click", function () {
		var ran_value = Math.floor(Math.random() * len);
		len -= 1;
		var n = tokens[ran_value].toString();
		store_num.push(tokens[ran_value]);
		len_store += 1;
		var msg = new SpeechSynthesisUtterance(n);
		msg.pitch = 2;
		//w.speak(msg);
		row = parseInt(tokens[ran_value] / 10);
		column = parseInt(tokens[ran_value] % 10);
		if (column == 0) {
			column = 10;
			row -= 1;
		}

		$cache.append(
			`<li class="list-inline-item">${store_num[store_num.length - 1]}</li>`
		);

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
		tokens.splice(ran_value, 1);
		if (len == 0) {
			btnNextNumber.style.display = "none";
			game.style.display = "block";
		}
	});

	btnNewGame.addEventListener("click", function () {
		if (confirm("Are you sure you want to reset the game?")) {
			btnNextNumber.style.display = "block";
			game.style.display = "none";
			para.innerText = "0";
			tokens = new Array();
			for (var i = 1; i <= 90; ++i) {
				tokens.push(i);
			}
			store_num = new Array();
			len_store = 0;

			for (var i = 0; i < 9; ++i) {
				for (var j = 0; j < 10; j++) {
					table.rows[i].cells[j].innerText = "";
				}
			}
			init();
			table.rows[row].cells[column - 1].style.background = null;
			var row_prev = -1;
			var column_prev = -1;
		}
	});
});
