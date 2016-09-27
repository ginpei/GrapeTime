let React = require('react');
let TaskNewItemFormArea = require('./task_new_item_form_area.es6.jsx');
let TaskList = require('./task_list.es6.jsx');

class TaskListArea extends React.Component {
	render() {
		return (
			<div>
				<TaskNewItemFormArea onSave={this.newItemFormArea_onSave.bind(this)} />
				<TaskList tasks={this.state.taskData} />
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			taskData: props.taskData,
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
