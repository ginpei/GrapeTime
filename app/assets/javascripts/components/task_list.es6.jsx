class TaskList extends React.Component {
	render() {
		var className = `task-list ${this.props.className || ''}`;
		var children = this.props.tasks.map(v=><TaskItem key={v.id} task={v} />);
		return (
			<div className={className}>
				{children}
			</div>
		);
	}

	get defaultProps() {
		return {
			tasks: [],
		};
	}
}

TaskList.propTypes = {
  tasks: React.PropTypes.instanceOf(Array),
};
