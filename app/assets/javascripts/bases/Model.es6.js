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
	 * @params {string} name
	 * @retutns {any}
	 */
	get(name) {
		return this.attributes[name];
	}

	/**
	 * TODO: events
	 * @param {string} name
	 * @param {any} value
	 * @example
	 * model.set('foo', 123);
	 * console.log(model.attributes.foo);  // => 123
	 * console.log(model.get('foo'));  // => 123
	 * @example
	 * model.set({
	 *   foo: 123,
	 *   bar: 234,
	 * });
	 * console.log(model.get('foo'));  // => 123
	 * console.log(model.get('bar'));  // => 234
	 */
	set(name, value) {
		if (typeof name === 'string') {
			this.checkValidation(name, value);
			this.attributes[name] = value;
		}
		else {
			let attributes = name;
			for (let name in attributes) {
				let value = attributes[name];
				this.set(name, value);
			}
		}
	}

	/**
	 * Throw an error when the value is not valid as the specified attribute.
	 * @param {string} name
	 * @param {any} value
	 */
	checkValidation(name, value) {
		let definitions = this.constructor.attributeTypes;
		if (!definitions) {
			return;
		}

		let definition = definitions[name];
		if (!definition) {
			return;
		}
		else if (typeof definition === 'string') {
			this._checkTypeValidation(name, value, definition);
		}
		else if (typeof definition === 'function') {
			this._checkConstructorValidation(name, value, definition);
		}
	}

	_checkTypeValidation(name, value, type) {
		if (typeof value !== type) {
			throw new Error(`The value ${value} of ${name} has to be a ${type}.`);
		}
	}

	_checkConstructorValidation(name, value, constructor) {
		if (!(value instanceof constructor)) {
			throw new Error(`The value ${value} of ${name} has to be a ${constructor.name}.`);
		}
	}

	/**
	 * @param {function} [callback]
	 */
	save(callback) {
		let options = this._createSaveOptions(callback);
		let xhr = this._sendRequest(options);
		xhr.addEventListener('load', (event)=>{
			let attr = JSON.parse(xhr.responseText).data;
			this.set(attr);
		});
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
