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
