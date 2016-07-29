class Task {
	/**
	 * @param {object} [attributes]
	 */
	constructor(attributes={}) {
		this._importAllAttributes(attributes);
		this._prepareChildren();
	}

	/**
	 * @param {object} [attributes]
	 */
	_importAllAttributes(attributes) {
		for (let name in attributes) {
			this[name] = attributes[name];
		}
	}

	/**
	 * @see #children
	 */
	_prepareChildren() {
		if (this.children) {
			this.children = this.children.map((v)=>new Task(v));
		}
		else {
			this.children = [];
		}
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
