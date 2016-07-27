class TaskItemWorkButton extends React.Component {
	render() {
		let task = this.props.task;

		return (
			<span onClick={this.button_onClick.bind(this)} className="btn-link task-item-name">
				{task.name}
				<Icon name="play-circle" className="task-item-startIcon"></Icon>
				<Icon name="stop-circle" className="task-item-stopIcon"></Icon>
			</span>
		);
	}

	button_onClick(event) {
		this.props.onToggle(event, this.props.task);
	}
}

TaskItemWorkButton.propTypes = {
	onToggle: React.PropTypes.func,
	task: React.PropTypes.object,
};
