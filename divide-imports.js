export class DivisionProblem {
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}
	get X() {
		return this._x;
	}
	get Y() {
		return this._y;
	}
	get Answer() {
		return this._x * this._y;
	}
};

export function getRange(min, max) {
	return [...Array(max + 1).keys()].map(k => k + min);
};