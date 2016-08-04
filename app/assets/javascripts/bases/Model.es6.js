/**
 * @example
 * class Item extends Model {
 *   get baseUrl() {
 *   	return '/items';
 *   }
 * }
 */
class Model {
	/**
	 * @param {object} [attributes]
	 */
	constructor(attributes={}) {
		this._importAllAttributes(attributes);
	}

	/**
	 * @param {object} [attributes]
	 */
	_importAllAttributes(attributes) {
		this.attributes = {};
		for (let name in attributes) {
			this.attributes[name] = attributes[name];

			let getter = function(name) {
				return this.attributes[name];
			}.bind(this, name);

			if (!(name in this)) {
				Object.defineProperty(this, name, { get: getter });
			}
		}
	}

	/**
	 * TODO: events
	 */
	set(name, value) {
		this.attributes[name] = value;
	}

	/**
	 * @param {function} [callback]
	 */
	save(callback) {
		let options = this._createSaveOptions(callback);
		this._sendRequest(options);
	}

	/**
	 * @param {function} callback
	 * @returns {object}
	 */
	_createSaveOptions(callback) {
		let options = {
			callback: callback,
			data: { task: this.attributes },  // FIXME
			method: (this.id ? 'PATCH' : 'POST'),
			url: this.url,
		};

		return options;
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

		let xhr = this._createXhr();

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
	 * @returns {XMLHttpRequest}
	 */
	_createXhr() {
		return new XMLHttpRequest();
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
	get id() {
		return this.attributes.id;
	}

	/**
	 * @returns {string}
	 */
	get url() {
		let url = this.baseUrl;
		if (this.id) {
			url += `/${this.id}`;
		}
		return url;
	}

	/**
	 * @returns {string}
	 */
	get baseUrl() {
		let message = '`baseUrl` needs to be implemented.';
		throw new Error(message);
	}
}

if (typeof module !== 'undefined') {
	module.exports = Model;
}
