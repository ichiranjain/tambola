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
	const $currentTokenDisplay = $("#current-number");
	const $btnNextNumber = $("#btn-next-number");
	const $board = $("#board");
	const $gameOver = $("#game-over");
	const $btnNewGame = $("#btn-new-game");
	const $cache = $("#cache");

	let availableTokens, foundTokens;

	function init() {
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
		$currentTokenDisplay.text("-");

		// set board
		$board.empty();
		for (var i = 0; i < 9; ++i) {
			const row = $('<div id="row" class="board-row"></div>');
			for (var j = 1; j <= 10; j++) {
				const tileNumber = i * 10 + j;
				row.append(
					`<div id="tile-${tileNumber}" class="board-tile">${tileNumber}</div>`
				);
			}
			$board.append(row);
		}

		$currentTokenDisplay.show();
		$btnNextNumber.show();
		$gameOver.hide();
	}

	function handleNextNumber() {
		// get random number from available tokens
		const currentToken = availableTokens.popRandom();

		$currentTokenDisplay.text(currentToken);
		foundTokens.push(currentToken);

		// Show the selected token in previous number
		$cache.append(`<li class="list-inline-item">${currentToken}</li>`);

		// announce the selected token
		var msg = new SpeechSynthesisUtterance(currentToken);
		msg.pitch = 2;
		//w.speak(msg);

		// place the selected token
		$(".current-token", "#board").removeClass("current-token");
		$(`#tile-${currentToken}`, "#board").addClass("show-text current-token");

		if (availableTokens.length == 0) {
			$currentTokenDisplay.hide();
			$btnNextNumber.hide();
			$gameOver.show();
		}
	}

	function handleNewGame() {
		if (confirm("Are you sure you want to reset the game?")) {
			init();
		}
	}

	//var w = window.speechSynthesis;

	init();

	$btnNextNumber.click(handleNextNumber);
	$btnNewGame.click(handleNewGame);
});
