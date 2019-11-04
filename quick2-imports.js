export class MultiplicationProblem {
	#x;
	#y;
	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}
	get X() {
		return this.#x;
	}
	get Y() {
		return this.#y;
	}
	get Answer() {
		return this.#x * this.#y;
	}
};

export function getRange(min, max) {
	return [...Array(max + 1).keys()].map(k => k + min);
};