let React = require('react');
let Task = require('../models/Task.es6.js');
let TaskItemBody = require('./task_item_body.es6.jsx');
let TaskItemNewForm = require('./task_item_new_form.es6.jsx');
let TaskItemDeleteButton = require('./task_item_delete_button.es6.jsx');
let TaskItemEditForm = require('./task_item_edit_form.es6.jsx');
// let TaskList = require('./task_list.es6.jsx');  // recursive!

class TaskItem extends React.Component {
	render() {
		let TaskList = require('./task_list.es6.jsx');

		let task = this.state.task;

		let itemClassName = this._getItemClassName();

		return (
			<div className={itemClassName}>
				<TaskItemBody onToggle={this.itemBody_onToggle.bind(this)} onToggleWorking={this.itemBody_onToggleWorking.bind(this)} task={task} />
				<div className="task-item-formEdit js-task-formEdit">
					<TaskItemDeleteButton onSave={this.taskItemDeleteButton_onSave.bind(this)} task={task} />
					<TaskItemEditForm onSave={this.taskEditForm_onSave.bind(this)} task={task} />
				</div>
				<TaskList className="task-item-children js-task-children" tasks={task.children} />
				<div className="task-item-formAddChild js-task-formAddChild">
					<TaskItemNewForm onSave={this.taskNewChildForm_onSave.bind(this)} parentTask={task} />
				</div>
				{/*
				+start_form(task)
				+stop_form(task)
				*/}
			</div>
		);
	}

	_getItemClassName() {
		let p = this.props;
		let s = this.state;
		let itemClassName = `task-item js-taskItem`;

		if (s.opened) {
			itemClassName += ' is-task-opened';
		}

		if (s.editing) {
			itemClassName += ' is-task-editingOwn';
		}

		if (s.editingChild) {
			itemClassName += ' is-editing-addChild';
		}

		if (s.task.working) {
			itemClassName += ' is-working';
		}

		return itemClassName;
	}

	constructor(props) {
		super(props);

		let task = props.task;
		if (!(task instanceof Task)) {
			task = new Task(task);
		}

		this.state = {
			task: task,
			opened: true,
			editing: false,
			editingChild: false,
		};
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

	itemBody_onToggle(type) {
		let nextState = {};
		nextState[type] = !this.state[type];
		this.setState(nextState);
	}

	itemBody_onToggleWorking(event, task) {
		task.working = !task.working;
		this.setState({ task: task });
	}

	taskItemDeleteButton_onSave(task) {
		this.props.onDestroy(task);
	}

	taskEditForm_onSave(task) {
		this.setState({
			editing: false,
			task: task,
		});
	}

	taskNewChildForm_onSave(child) {
		let task = this.state.task;
		task.children.push(child);
		this.setState({
			editingChild: false,
			task: task,
		});
	}
}

TaskItem.propTypes = {
	task: React.PropTypes.object,
};

module.exports = TaskItem;
