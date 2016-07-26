class TaskList extends React.Component {
	render() {
		var className = `task-list ${this.props.className || ''}`;
		var children = this.state.tasks.map(v=>{
			return <TaskItem onDestroy={this.item_onDestroy.bind(this)} key={v.id} task={v} />;
		});
		return (
			<div className={className}>
				{children}
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks,
		};
	}

	item_onDestroy(task) {
		let updatedTasks = this.state.tasks.filter(v=>v!==task);
		this.setState({
			tasks: updatedTasks,
		});
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
