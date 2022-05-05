
/*
	Game core variables
 */

let player, winner = null;
const playerSelected = document.getElementById('player-selected');
const winnerSelected = document.getElementById('winner-selected');
const squares = document.getElementsByClassName('square');

/*
	Utility variables
 */

	let audioParty, audioHeartbeat, audioLaugh, audioSiren;

/*
	Utility functions
 */

const loadSoundArquives = () => {

  audioParty = new Audio(
	"./media/mixkit-birthday-crowd-party-cheer-531.wav"
  );

  audioHeartbeat = new Audio(
	// mixkit-cinematic-horror-heartbeat-transition-489.wav
	"./media/mixkit-cinematic-horror-heartbeat-transition-489.wav"
  );
	
//   audioLaugh = new Audio(
// 	// mixkit-troll-warrior-laugh-409.wav
// 	"./media/mixkit-troll-warrior-laugh-409.wav"
//   );

//   audioSiren = new Audio(
// 	// mixkit-police-siren-us-1643.wav
// 	"./media/mixkit-police-siren-us-1643.wav"
//   );
};


const audioPlay = (a, loop, volume = 1) => {
	a.play();
	a.autoplay
	if (loop) a.loop = true;
	a.volume = volume;
};
  
const audioStop = (a) => {
	// https://codetogo.io/how-to-stop-audio-in-javascript/
	a.pause();
	a.currentTime = 0;
};


/*
	Game core functions
 */

const chooseSquare = (id) => {
	if (winner !== null) {
		return;
	}

	const square = document.getElementById(id);
	if (square.innerHTML !== '-') {
		return;
	}
	
	square.innerHTML = player;
	square.style.color = '#000';

	if (player === 'X') {
		player = 'O';
	} else {
		player = 'X'
	}

	changePlayer(player);
	checkWinner();
}

const changePlayer = (value) => {
	player = value;
	playerSelected.innerHTML = player;
}

const changeWinner = (square) => {
	winner = square.innerHTML;
	winnerSelected.innerHTML = winner;
	audioStop(audioHeartbeat);
	audioPlay(audioParty, false, 0.5);
}

const changeSquareColor = (square1, square2, square3) => {
	square1.style.background = '#0F0';
	square2.style.background = '#0F0';
	square3.style.background = '#0F0';
}

const checkWinner = () => {
	const square1 = document.getElementById(1);
	const square2 = document.getElementById(2);
	const square3 = document.getElementById(3);
	const square4 = document.getElementById(4);
	const square5 = document.getElementById(5);
	const square6 = document.getElementById(6);
	const square7 = document.getElementById(7);
	const square8 = document.getElementById(8);
	const square9 = document.getElementById(9);

	if (checkSequence(square1, square2, square3)) {
		changeSquareColor(square1, square2, square3);
		changeWinner(square1);
		return;
	}

	if (checkSequence(square4, square5, square6)) {
		changeSquareColor(square4, square5, square6);
		changeWinner(square4);
		return;
	}

	if (checkSequence(square7, square8, square9)) {
		changeSquareColor(square7, square8, square9);
		changeWinner(square7);
		return;
	}

	if (checkSequence(square1, square4, square7)) {
		changeSquareColor(square1, square4, square7);
		changeWinner(square1);
		return;
	}

	if (checkSequence(square2, square5, square8)) {
		changeSquareColor(square2, square5, square8);
		changeWinner(square2);
		return;
	}

	if (checkSequence(square3, square6, square9)) {
		changeSquareColor(square3, square6, square9);
		changeWinner(square3);
		return;
	}

	if (checkSequence(square1, square5, square9)) {
		changeSquareColor(square1, square5, square9);
		changeWinner(square1);
		return;
	}

	if (checkSequence(square3, square5, square7)) {
		changeSquareColor(square3, square5, square7);
		changeWinner(square3);
		return;
	}
}

const checkSequence = (square1, square2, square3) => {
	let isEqual = false;

	if (square1.innerHTML !== '-' && square1.innerHTML === square2.innerHTML && square2.innerHTML === square3.innerHTML) {
		isEqual = true;
	}

	return isEqual;
}

const restart = () => {
	audioStop(audioHeartbeat);
	audioPlay(audioHeartbeat, true, 0.2);
	audioStop(audioParty);

	winner = null;
	winnerSelected.innerHTML = '';

	for (let i = 1; i <=9; i++) {
		const square = document.getElementById(i);
		square.style.background = '#eee';
		square.style.color = '#eee';
		square.innerHTML = '-';
	}
	
	changePlayer('X');
}

const init = () => {
	loadSoundArquives();
	changePlayer('X');

	// Workaround for "Autoplay is only allowed when approved by the user, the site is activated by the user, or media is muted." issue.
	// Check the (Todo) "sound effects 🎶🎸"" section in README.md
	
	// Get the modal
	const modal = document.getElementById("myModal");

	// Get the <span> element that closes the modal
	const span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	modal.onclick = function() {
		modal.style.display = "none";
		audioPlay(audioHeartbeat, true, 0.2);
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target === modal) {
			modal.style.display = "none";
			audioPlay(audioHeartbeat, true, 0.2);
		}
	} 
		
}

init();

