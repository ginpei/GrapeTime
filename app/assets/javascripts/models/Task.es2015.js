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

		/**
		 * @param {number} all Time length as seconds.
		 * @returns {string} "hh:mm:ss"
		 */
		toTimeString(all) {
			var sec = all % 60;
			var min = Math.floor((all - sec) / 60) % 60;
			var hr = Math.floor((all - sec - min * 60) / 60 / 60);
			var s = `${hr}:${this.toDoubleDecimal(min)}:${this.toDoubleDecimal(sec)}`;
			return s;
		}

		toDoubleDecimal(n) {
			return `0${n}`.slice(-2);
		}

		get totalSpentTimeString() {
			return this.toTimeString(this.total_spent_time);
		}

		get totalNecessaryTimeString() {
			return this.toTimeString(this.total_necessary_time);
		}

		get progress() {
			var rate;
			if (this.total_necessary_time) {
				rate = (this.total_spent_time / this.total_necessary_time);
			}
			else {
				rate = 0;
			}
			return rate;
		}
	}

	window.Task = Task;
})();
