let React = require('react');
let Task = require('../models/Task.es6.js');
let TaskNewItemFormArea = require('./task_new_item_form_area.es6.jsx');

class TaskListArea extends React.Component {
	render() {
		return (
			<div>
				<TaskNewItemFormArea onSave={this.newItemFormArea_onSave.bind(this)} />
			</div>
		);
		// return (
		// 	<div>
		// 		<TaskNewItemFormArea onSave={this.newItemFormArea_onSave.bind(this)} />
		// 		<TaskList tasks={this.state.taskData} />
		// 	</div>
		// );
	}

	constructor(props) {
		super(props);
		this.state = {
			taskData: props.taskData.map(v=>new Task(v)),
		};
	}

	newItemFormArea_onSave(event, task) {
		let taskData = this.state.taskData;
		taskData.push(task);
		this.setState({ taskData: taskData });
	}
}

TaskListArea.propTypes = {
	taskData: React.PropTypes.array,
};

module.exports = TaskListArea;
