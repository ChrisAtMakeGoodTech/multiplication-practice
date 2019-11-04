import { MultiplicationProblem, getRange } from './quick2-imports.js';

const Problems = [];
let currentProblem;
let currentAnswer;
let remainingProblems;
let startTime;
let allWithinTimeLimit;

document.getElementById('start-button').addEventListener('click', () => {
	document.getElementById('first').style.display = 'none';
	document.getElementById('second').style.display = 'block';
	startGame();
});

function startGame() {
	const numbers = document.getElementById('numbers').value.split(' ').map(i => Number(i));
	const range = getRange(0, 12);

	for (let x of numbers) {
		for (let y of range) {
			Problems.push(new MultiplicationProblem(x, y));
		}
	}

	const goalSeconds = Number(document.getElementById('goal-seconds').value);

	const firstNumber = document.getElementById('first-number');
	const secondNumber = document.getElementById('second-number');
	const answer = document.getElementById('answer');
	const lastResult = document.getElementById('last-result');
	const lastTime = document.getElementById('last-time');

	remainingProblems = [...Problems];

	answer.addEventListener('input', () => {
		if (answer.value == currentAnswer) {
			const secondsTaken = (performance.now() - startTime) / 1000;
			if (secondsTaken > goalSeconds) allWithinTimeLimit = false;
			lastResult.textContent = `Correct! ${currentProblem.X} x ${currentProblem.Y} = ${currentProblem.Answer}.`;
			lastTime.textContent = `Time: ${secondsTaken}`;
			startNewProblem();
		}
	});

	startNewProblem();

	function startNewProblem() {
		startTime = performance.now();
		if (remainingProblems.length === 0) {
			if (allWithinTimeLimit) return win();

			allWithinTimeLimit = true;
			remainingProblems = [...Problems];
		}

		let currentProblemIndex = Math.floor(Math.random() * remainingProblems.length);
		currentProblem = remainingProblems[currentProblemIndex];
		remainingProblems.splice(currentProblemIndex, 1);
		firstNumber.innerHTML = currentProblem.X;
		secondNumber.innerHTML = currentProblem.Y;
		currentAnswer = currentProblem.Answer;

		answer.value = '';
		answer.focus();
	}

	function win() {
		const winMessage = document.getElementById('win');
		winMessage.textContent = `You reached your goal of ${goalSeconds} seconds!`;
		winMessage.style.display = 'block';
		document.getElementById('problem').style.display = 'none';
	}
}

