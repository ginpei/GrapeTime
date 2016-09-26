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
		this.attributes = {};  // FIXME: remove
		attributes = Object.assign(this.defaults, attributes);  // defaults is a new instance
		this._validateRequiredAttributes(attributes);
		this.set(attributes);
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
			let converted = this._convertSetValue(name, value);
			this.checkValidation(name, converted);
			this.attributes[name] = converted;
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
	 * @param {string} name
	 * @param {any} value
	 * @returns {any}
	 */
	_convertSetValue(name, value) {
		return value;
	}

	/**
	 * @param {object} [attributes]
	 */
	_validateRequiredAttributes(attributes) {
		if (this.constructor.allowOmittingAttributes !== false) {
			return;
		}

		let AttributeTypes = Model.AttributeTypes;
		let definedTypeNames = Object.keys(AttributeTypes);
		let specifiedTypes = this.constructor.attributeTypes;
		let specifiedNames = Object.keys(specifiedTypes);

		let requiredNames = specifiedNames.filter((name)=>{
			let definition = specifiedTypes[name];
			let optional = definedTypeNames.some(v=>definition===AttributeTypes[v].optional);
			return !optional;
		});

		requiredNames.forEach((name)=>{
			if (!(name in attributes)) {
				throw new Error(`The value of ${name} is required.`);
			}
		});
	}

	/**
	 * Throw an error when the value is not valid as the specified attribute.
	 * @param {string} name
	 * @param {any} value
	 */
	checkValidation(name, value) {
		const typeMap = {
			bool: { name: 'boolean' },
			func: { name: 'function' },
			number: { name: 'number' },
			object: { name: 'object' },
			string: { name: 'string' },
		};

		let types = Model.AttributeTypes;
		let definitions = this.constructor.attributeTypes;
		if (!definitions) {
			return;
		}

		let definition = definitions[name];
		if (!definition) {
			this._checkUndefinedAttributeValidation(name, value);
		}
		else if (definition === types.any) {
			// accepts any types
		}
		else if (definition instanceof types.InstanceOf) {
			this._checkConstructorValidation(name, value, definition);
		}
		else {
			let matched = false;
			Object.keys(typeMap).forEach((id)=>{
				if (definition === types[id] || definition === types[id].optional) {
					matched = true;
					this._checkTypeValidation(name, value, typeMap[id].name, definition === types[id].optional);
				}
			});

			if (!matched) {
				throw new Error(`Unknown definition. Make sure you use proper type definitions.`);
			}
		}
	}

	_checkUndefinedAttributeValidation(name, value) {
		if (this.constructor.allowUndefinedAttributes === false) {
			throw new Error(`The value of ${name} has to be defined in attributeTypes at the constructor.`);
		}
	}

	_checkTypeValidation(name, value, type, optional) {
		if (optional && (value === null || value === undefined)) {
			// it's OK
		}
		else if (typeof value !== type) {
			let actualType = (value === null ? 'null' : typeof value);
			throw new Error(`The value ${value} of ${name} has to be a ${type}, not a ${actualType}.`);
		}
	}

	_checkConstructorValidation(name, value, instanceOf) {
		let constructor = instanceOf.typeConstructor;
		if (!(value instanceof constructor)) {
			throw new Error(`The value ${value} of ${name} has to be a ${constructor.name}, not a ${value.constructor.name}.`);
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
	 * @returns {object}
	 */
	get defaults() {
		return {};
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

Model.AttributeTypes = {
	any: {},
	bool: { optional: {} },
	func: { optional: {} },
	number: { optional: {} },
	object: { optional: {} },
	string: { optional: {} },
	instanceOf: function(constructor) {
		return new Model.AttributeTypes.InstanceOf(constructor);
	},
	InstanceOf: function InstanceOf(constructor) {
		this.typeConstructor = constructor;
	},
};

if (typeof module !== 'undefined') {
	module.exports = Model;
}
