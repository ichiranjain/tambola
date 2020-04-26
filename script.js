/**
 * Pop a random element from the array.
 * Note: This changes the state of the given array.
 */
Array.prototype.popRandom = function () {
	const selectedIndex = Math.floor(Math.random() * this.length);
	const [selectedItem] = this.splice(selectedIndex, 1);
	return selectedItem;
};

$(document).ready(function () {
	const $para = $("#current-number");
	const $btnNextNumber = $("#btn-next-number");
	const table = document.getElementById("table");
	const $gameOver = $("#game-over");
	const $btnNewGame = $("#btn-new-game");
	const $cache = $("#cache");

	let availableTokens, foundTokens;

	let row_prev, column_prev, row, column;

	function init() {
		row_prev = -1;
		column_prev = -1;

		availableTokens = new Array();
		foundTokens = new Array();

		const START_RANGE = 1;
		const END_RANGE = 90;

		// set available tokens
		for (let i = START_RANGE; i <= END_RANGE; i++) {
			availableTokens.push(i);
		}

		// setup UI
		$cache.empty();
		$para.text("-");

		// set board
		for (var i = 0; i < 9; ++i) {
			for (var j = 0; j < 10; j++) {
				table.rows[i].cells[j].innerText = "";
				table.rows[i].cells[j].style.background = null;
			}
		}

		$btnNextNumber.show();
		$gameOver.hide();
	}

	//var w = window.speechSynthesis;

	init();

	$btnNextNumber.click(function () {
		// get random number from available tokens
		const currentToken = availableTokens.popRandom();

		foundTokens.push(currentToken);

		// Show the selected token in previous number
		$cache.append(`<li class="list-inline-item">${currentToken}</li>`);

		// announce the selected token
		var msg = new SpeechSynthesisUtterance(currentToken);
		msg.pitch = 2;
		//w.speak(msg);

		// place the selected token
		row = parseInt(currentToken / 10);
		column = parseInt(currentToken % 10);
		if (column == 0) {
			column = 10;
			row -= 1;
		}

		table.rows[row].cells[column - 1].innerText = currentToken;
		table.rows[row].cells[column - 1].style.backgroundColor = "#d4c893";
		table.rows[row].cells[column - 1].style.backgroundImage =
			"linear-gradient(45deg, #FFFF00 0%, #d4c893 100%)";
		if (row_prev !== -1 && column_prev !== -1) {
			table.rows[row_prev].cells[column_prev - 1].style.background = null;
		}
		$para.text(currentToken);
		row_prev = row;
		column_prev = column;
		if (availableTokens.length == 0) {
			$btnNextNumber.hide();
			$gameOver.show();
		}
	});

	$btnNewGame.click(function () {
		if (confirm("Are you sure you want to reset the game?")) {
			init();
		}
	});
});
