let React = require('react');
let Icon = require('./icon.es6.jsx');
let TaskItemWorkButton = require('./task_item_work_button.es6.jsx');
let TaskProgress = require('./task_progress.es6.jsx');

class TaskItemBody extends React.Component {
	render() {
		let task = this.props.task;

		return (
			<div className="task-item-body js-task-body">
				<button onClick={this.toggle_onClick.bind(this)} className="btn-text task-item-toggle">
					<Icon name="plus-square-o" className="task-item-toggle-open"></Icon>
					<Icon name="minus-square-o" className="task-item-toggle-close"></Icon>
				</button>
				<TaskItemWorkButton onToggle={this.playButton_onToggle.bind(this)} task={task} />
				<a className="task-item-times" href="/tasks/#{task.id}">
					({this.toHMS(task.total_spent_time)})
					<TaskProgress value={task.total_spent_time} max={task.total_necessary_time} />
				</a>
				<button onClick={this.toggleEditForm_onClick.bind(this)} className="btn-icon task-item-button task-item-edit">
					<Icon name="pencil-square-o"></Icon>
				</button>
				<button onClick={this.toggleChildForm_onClick.bind(this)} className="btn-icon task-item-button task-item-add">
					<Icon name="plus"></Icon>
				</button>
			</div>
		);
	}

	/**
	 * @param {number} total
	 * @returns {string} "h:mm:ss"
	 */
	toHMS(total) {
		let sec = total % 60;
		let min = Math.floor((total - sec) / 60) % 60;
		let hr = Math.floor((total - sec - min * 60) / 60 / 60);
		let s = `${hr}:${this.toDoubleDecimal(min)}:${this.toDoubleDecimal(sec)}`;
		return s;
	}

	/**
	 * @param {number} n
	 * @returns {string}
	 * @example
	 * console.log(this.toDoubleDecimal(9));  // => "09"
	 * console.log(this.toDoubleDecimal(10));  // => "10"
	 */
	toDoubleDecimal(n) {
		return `0${n}`.slice(-2);
	}

	toggle_onClick(event) {
		this.props.onToggle('opened');
	}

	playButton_onToggle(event, task) {
		this.props.onToggleWorking(event, task);
	}

	toggleEditForm_onClick(event) {
		this.props.onToggle('editing');
	}

	toggleChildForm_onClick(event) {
		this.props.onToggle('editingChild');
	}
}

TaskItemBody.propTypes = {
	onToggle: React.PropTypes.func,
	onToggleWorking: React.PropTypes.func,
	task: React.PropTypes.object,
};

module.exports = TaskItemBody;
