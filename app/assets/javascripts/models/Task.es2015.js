(function() {
	class Task {
		constructor(attributes={}) {
			[
				'created_at',
				'estimate_time',
				'id',
				'name',
				'necessary_time',
				'parent_id',
				'spent_time',
				'total_necessary_time',
				'total_spent_time',
				'updated_at',
				'working',
				'working_since',
			].forEach((v)=>this[v]=attributes[v]);

			if (attributes.children) {
				this.children = attributes.children.map((v)=>new Task(v));
			}
			else {
				this.children = [];
			}
		}
	}

	window.Task = Task;
})();
