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
		this.attributes = {};
		for (let name in attributes) {
			this[name] = attributes[name];
			this.attributes[name] = attributes[name];  // FIXME
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

	/**
	 * @param {function} [callback]
	 */
	save(callback) {
		var options = {
			callback: callback,
			data: { task: this.attributes },
			method: (this.id ? 'PATCH' : 'POST'),
			url: this.url,
		};
		this._sendRequest(options);
	}

	/**
	 * @param {string} options.method `"POST"`, `"PATCH"`, ...
	 * @param {string} options.url
	 * @param {object} [options.data]
	 * @param {function} [options.callback]
	 * @returns {XMLHttpRequest}
	 */
	_sendRequest(options={}) {
		if (!options.callback) {
			options.callback = ()=>{};
		}

		let xhr = new XMLHttpRequest();

		xhr.onload = function(event) {
			options.callback(xhr, event);
		};
		xhr.onerror = function(event) {
			options.callback(xhr, event);
		};

		xhr.open(options.method, options.url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('X-CSRF-Token', this.getCSRFToken());
		xhr.send(JSON.stringify(options.data));

		return xhr;
	}

	/**
	 * @returns {string}
	 */
	getCSRFToken() {
		return window.Rails.getCSRFToken();
	}

	/**
	 * @returns {string}
	 */
	get url() {
		let url = '/tasks';
		if (this.id) {
			url += `/${this.id}`;
		}
		return url;
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
