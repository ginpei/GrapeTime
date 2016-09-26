class Task extends Model {
	/**
	 * @param {object} [attributes]
	 */
	constructor(attributes={}) {
		super(attributes);
		this.attributes.children = [];

		// create getters
		// TODO: implement at Model according to attributeTypes
		[
			'created_at',
			'estimate_time',
			'id',
			'name',
			'necessary_time',
			'parent_id',
			'spent_time',
			'updated_at',
			'working',
		].forEach((name)=>{
			let getter = function(name) {
				return this.get(name);
			}.bind(this, name);

			Object.defineProperty(this, name, { get: getter });
		});

		this._prepareChildren(attributes);
	}

	/**
	 * @see Model#_convertSetValue
	 */
	_convertSetValue(name, value) {
		var result;
		if (name === 'estimate_time' && typeof value === 'string') {
			result = Number(value);
		}
		else if (name === 'necessary_time' && typeof value === 'string') {
			result = Number(value);
		}
		else if (name === 'created_at' && typeof value === 'string') {
			result = new Date(value);
		}
		else if (name === 'updated_at' && typeof value === 'string') {
			result = new Date(value);
		}
		else {
			result = value;
		}
		return result;
	}

	/**
	 * @see #children
	 */
	_prepareChildren(attributes) {
		if (attributes.children) {
			let children = this.get('children');
			attributes.children.map((v)=>children.push(new Task(v)));
		}
	}

	get defaults() {
		return {
			children: [],
			parent_id: null,
			spent_time: 0,
		}
	}

	/**
	 * @returns {string}
	 */
	get baseUrl() {
		return '/tasks';
	}

	get children() {
		return this.get('children');
	}

	get total_spent_time() {
		let time = this.get('spent_time');
		this.children.forEach((child)=>{
			time += child.total_spent_time;
		});
		return time;
	}

	get total_necessary_time() {
		let time = this.get('necessary_time');
		this.children.forEach((child)=>{
			time += child.total_necessary_time;
		});
		return time;
	}

	// get totalSpentTimeString() {
	// 	return this.toTimeString(this.total_spent_time);
	// }

	// get totalNecessaryTimeString() {
	// 	return this.toTimeString(this.total_necessary_time);
	// }

	// get progress() {
	// 	let rate;
	// 	if (this.total_necessary_time) {
	// 		rate = (this.total_spent_time / this.total_necessary_time);
	// 	}
	// 	else {
	// 		rate = 0;
	// 	}
	// 	return rate;
	// }
}

Task.attributeTypes = {
	children: Model.AttributeTypes.instanceOf(Array),
	created_at: Model.AttributeTypes.instanceOf(Date, { optional: true }),
	estimate_time: Model.AttributeTypes.number,
	id: Model.AttributeTypes.number.optional,
	name: Model.AttributeTypes.string,
	necessary_time: Model.AttributeTypes.number,
	parent_id: Model.AttributeTypes.any,  // FIXME: to accept undefined or number
	spent_time: Model.AttributeTypes.number,
	updated_at: Model.AttributeTypes.instanceOf(Date, { optional: true }),
};

Task.allowUndefinedAttributes = false;
Task.allowOmittingAttributes = false;

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
	attributes.necessary_time = attributes.estimate_time;
	return attributes;
};
