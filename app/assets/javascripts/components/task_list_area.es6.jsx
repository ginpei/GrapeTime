let React = require('react');
let Task = require('../models/Task.es6.js');

class TaskListArea extends React.Component {
	render() {
		let items = this.state.taskData.map(v=><li key={v.id}>{v.name}</li>);
		return (
			<ul>{items}</ul>
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
