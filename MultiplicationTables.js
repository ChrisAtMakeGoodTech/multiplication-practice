const button = document.getElementById('button');

button.addEventListener('click', function () {
	const xMin = document.getElementById('xMin');
	const xMax = document.getElementById('xMax');
	const yMin = document.getElementById('yMin');
	const yMax = document.getElementById('yMax');

	createTable(xMin.valueAsNumber, xMax.valueAsNumber, yMin.valueAsNumber, yMax.valueAsNumber);
	document.getElementById('range').style.display = 'none';
});

function createTable(xMin, xMax, yMin, yMax) {
	const xRange = getRange(xMin, xMax);
	const yRange = getRange(yMin, yMax);

	const container = document.getElementById('container');

	const bodyRows = xRange.reduce((t, i) => t + yRange.reduce((t, j) => t + getCell(i, j), '') + '</tr>', '');

	const output = `
	<table class="table is-bordered is-striped is-hoverable">
	<tbody>${bodyRows}</tbody>
	</table>
	`;

	container.innerHTML = output;

	container.querySelectorAll('input').forEach(input => {
		input.addEventListener('focus', () => {
			input.classList.remove('is-success');
			input.classList.remove('is-warning');
		});
		input.addEventListener('blur', () => { validateAnswer(input); });
		input.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				if (validateAnswer(input)) {
					let a = +input.getAttribute('data-a');
					let b = +input.getAttribute('data-b');
					if (b === xMax) {
						a++;
						b = xMin;
					} else {
						b++;
					}
					if (a < xMax) {
						container.querySelector(`input[data-a="${a}"][data-b="${b}"]`).focus();
					}
				}
			}
		});
	});
}


function validateAnswer(input) {
	if (input.value === input.getAttribute('data-answer')) {
		input.classList.add('is-success');
		input.classList.remove('is-warning');
		return true;
	} else {
		input.classList.remove('is-success');
		input.classList.add('is-warning');
		return false;
	}
}

function getCell(a, b) {
	return `<td>
	<label class="label">${a} x ${b} =</label>
	<div class="control">${getQuestion(a, b)}</div>
	</td>`;
}

function getQuestion(a, b) {
	return `<input class="input" data-answer="${a * b}" data-a="${a}" data-b="${b}" />`;
}

function getRange(min, max) {
	return [...Array(max).keys()].map(k => k + min);
}