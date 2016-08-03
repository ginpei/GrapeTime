/**
 * @example
 * class Item extends Model {
 *   get urlBase() {
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
			Object.defineProperty(this, name, { get: getter });
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
		let options = {
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
		let url = this.urlBase;
		if (this.id) {
			url += `/${this.id}`;
		}
		return url;
	}

	/**
	 * @returns {string}
	 */
	get urlBase() {
		let message = '`urlBase` needs to be implemented.';
		throw new Error(message);
	}
}

if (typeof module !== 'undefined') {
	module.exports = Model;
}
