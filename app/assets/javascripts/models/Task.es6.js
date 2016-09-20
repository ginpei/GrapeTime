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
	 * @see Model#_importAttributes
	 */
	_importAttributes(attributes) {
		if (typeof attributes.estimate_time === 'string') {
			attributes.estimate_time = Number(attributes.estimate_time);
		}

		if (typeof attributes.created_at === 'string') {
			attributes.created_at = new Date(attributes.created_at);
		}

		if (typeof attributes.updated_at === 'string') {
			attributes.updated_at = new Date(attributes.updated_at);
		}

		this.set(attributes);
	}

	/**
	 * @see #children
	 */
	_prepareChildren(attributes) {
		let children;
		children = attributes.children.map((v)=>new Task(v));
		this.set('children', children);
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
	created_at: Model.AttributeTypes.instanceOf(Date),
	estimate_time: Model.AttributeTypes.number,
	id: Model.AttributeTypes.number,
	name: Model.AttributeTypes.string,
	necessary_time: Model.AttributeTypes.number,
	parent_id: Model.AttributeTypes.any,  // FIXME: to accept undefined or number
	spent_time: Model.AttributeTypes.number,
	total_necessary_time: Model.AttributeTypes.number,
	total_spent_time: Model.AttributeTypes.number,
	updated_at: Model.AttributeTypes.instanceOf(Date),
	working: Model.AttributeTypes.bool,
};

Task.allowUndefinedAttributes = false;

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
