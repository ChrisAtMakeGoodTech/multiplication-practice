import { MultiplicationProblem, getRange } from './quick-imports.js';

const Problems = [];
let currentProblem;
let currentAnswer;
let currentSeconds;
let remainingProblems;
let timeout;
let remainingSeconds;

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

	const startSeconds = Number(document.getElementById('start-seconds').value);
	const goalSeconds = Number(document.getElementById('goal-seconds').value);

	const firstNumber = document.getElementById('first-number');
	const secondNumber = document.getElementById('second-number');
	const answer = document.getElementById('answer');
	const remainingSecondsDisplay = document.getElementById('remaining-seconds');
	const lastResult = document.getElementById('last-result');

	currentSeconds = startSeconds;

	remainingProblems = [...Problems];
	timeout = null;
	remainingSeconds;

	answer.addEventListener('input', () => {
		if (answer.value == currentAnswer) {
			lastResult.classList.remove('has-text-danger');
			lastResult.classList.add('has-text-success');
			lastResult.textContent = `Correct! ${currentProblem.X} x ${currentProblem.Y} = ${currentProblem.Answer}`;
			startNewProblem();
		}
	});

	startNewProblem();

	function startNewProblem() {
		if (timeout) clearTimeout(timeout);
		if (remainingProblems.length === 0) {
			if (currentSeconds === goalSeconds) return win();

			currentSeconds--;
			remainingProblems = [...Problems];
		}

		remainingSeconds = currentSeconds;
		let currentProblemIndex = Math.floor(Math.random() * remainingProblems.length);
		currentProblem = remainingProblems[currentProblemIndex];
		remainingProblems.splice(currentProblemIndex, 1);
		firstNumber.innerHTML = currentProblem.X;
		secondNumber.innerHTML = currentProblem.Y;
		currentAnswer = currentProblem.Answer;

		remainingSecondsDisplay.innerHTML = currentSeconds;

		timeout = setTimeout(startTimeout, 1000);

		answer.value = '';
		answer.focus();
	}

	function startTimeout() {
		remainingSeconds--;
		if (remainingSeconds < 0) {
			lastResult.classList.add('has-text-danger');
			lastResult.classList.remove('has-text-success');
			lastResult.textContent = `Too slow! ${currentProblem.X} x ${currentProblem.Y} = ${currentProblem.Answer}`;
			currentSeconds += 2;
			remainingProblems = [];
			startNewProblem();
		} else {
			remainingSecondsDisplay.innerHTML = remainingSeconds;
			timeout = setTimeout(startTimeout, 1000);
		}

	}

	function win() {
		clearTimeout(timeout);
		remainingSecondsDisplay.innerHTML = 'You win.';
	}
}

