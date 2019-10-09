const startupDiv = document.getElementById('startup');
const container = document.getElementById('container');

const startupButton = document.getElementById('startupButton');
const factorsInput = document.getElementById('factorsInput');
const maxDigitsInput = document.getElementById('maxDigitsInput');

const questionContainer = document.getElementById('questionContainer');
const questionTbody = document.getElementById('questionTbody');
const answerInput = document.getElementById('answerInput');
const answerButton = document.getElementById('answerButton');

const trainingFactors = document.getElementById('trainingFactors');

let setFactors = null;
let setMaxDigits = null;

startupButton.addEventListener('click', () => {
	const inputFactors = validInput(factorsInput.value);
	if (inputFactors !== null) {
		const inputMaxDigits = validInput(maxDigitsInput.value);
		if (inputMaxDigits !== null) {
			setFactors = inputFactors;
			setMaxDigits = inputMaxDigits;
			runStartup();
		}
	}
});

function runStartup() {
	startupDiv.style.display = 'none';
	container.style.display = 'block';
	trainingFactors.innerText = setFactors.join(' ');
	setupQuestion();
	answerButton.addEventListener('click', () => {
		const answer = convertToInteger(answerInput.value);
		if (answer === questionAnswer) setupQuestion();
	});
}

let questionFactors = null;
let questionAnswer = null;

function setupQuestion() {
	questionFactors = setMaxDigits.map((f) => getProblemFactor(f));
	questionAnswer = questionFactors.reduce((p, c) => p * c, 1);

	questionTbody.innerHTML = questionFactors.map(getRow).join('');

	answerInput.value = '';

	questionTbody.querySelectorAll('input[data-factor]').forEach(i => {
		const number = convertToInteger(i.getAttribute('data-factor'));
		const factors = [];
		for (let i = 2; i <= 10; i++) {
			const product = number / i;
			if (Math.floor(product) === product) {
				factors.push(i);
			}
		}
		i.addEventListener('input', () => {
			let prev = [];
			let wrong = false;
			i.value.split(' ').forEach(j => {
				const n = convertToInteger(j);
				if (Number.isNaN(n) || prev.includes(n) || !factors.includes(n)) {
					wrong = true;
				} else {
					prev.push(n);
				}
			});
			if (wrong === false && prev.length === factors.length) {
				i.classList.add('is-success');
				i.classList.remove('is-warning');
			} else {
				i.classList.remove('is-success');
				i.classList.add('is-warning');
			}
		});
	});
}

function getRow(factor) {
	return `<tr><td>${factor}</td><td><input class="input" data-factor="${factor}" /></td></tr>`
}

function getProblemFactor(thisMaxDigits) {
	const baseFactor = setFactors[randomIntExclusive(0, setFactors.length)];
	const maxFactorMult = Math.floor((Math.pow(10, thisMaxDigits) - 1) / baseFactor);
	const thisNumber = baseFactor * randomIntInclusive(1, maxFactorMult);
	return thisNumber;
}

function convertToInteger(numberString) {
	if (typeof numberString !== 'string') return NaN;
	if (numberString === '') return NaN;
	return Number.parseInt(numberString);
}

function validInput(input) {
	const inputFactors = input.split(',').map(convertToInteger);
	if (inputFactors.length > 0 && !inputFactors.some(i => Number.isNaN(i))) {
		return inputFactors;
	}
	return null;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values
function randomIntInclusive(min, max) {
	return randomIntExclusive(min, max + 1);
}
function randomIntExclusive(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

window.randomIntExclusive = randomIntExclusive;