class Task extends Model {
	/**
	 * @param {object} [attributes]
	 */
	constructor(attributes={}) {
		super(attributes);
		this._prepareChildren();
	}

	/**
	 * @see #children
	 */
	_prepareChildren() {
		let children;
		if (this.children) {
			children = this.children.map((v)=>new Task(v));
		}
		else {
			children = [];
		}
		this.set('children', children);
	}

	/**
	 * @returns {string}
	 */
	get urlBase() {
		return '/tasks';
	}

	// get totalSpentTimeString() {
	// 	return this.toTimeString(this.total_spent_time);
	// }

	// get totalNecessaryTimeString() {
	// 	return this.toTimeString(this.total_necessary_time);
	// }

	// get progress() {
	// 	var rate;
	// 	if (this.total_necessary_time) {
	// 		rate = (this.total_spent_time / this.total_necessary_time);
	// 	}
	// 	else {
	// 		rate = 0;
	// 	}
	// 	return rate;
	// }
}

/**
 * @param {HTMLFormElement} elForm
 * @returns {object}
 */
Task.createAttributesFromForm = function(elForm) {
	let formData = new FormData(elForm);
	let attributes = {};
	for (let i of formData) {
		let name = i[0];
		let value = i[1];
		attributes[name] = value;
	}
	return attributes;
};
