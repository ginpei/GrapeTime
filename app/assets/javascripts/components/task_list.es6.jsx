class TaskList extends React.Component {
	render() {
		var className = `task-list ${this.props.className || ''}`;

		var children = this.props.tasks.map((v)=>{
			return (<TaskItem
				children={v.children || []}
				id={v.id}
				key={v.id}
				name={v.name}
				necessary_time={v.necessary_time}
				progress={v.progress}
				spent_time={v.spent_time}
				task={v.task}
				total_necessary_time={v.total_necessary_time}
				total_spent_time={v.total_spent_time}
				working={v.working}
			/>)
		});

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
