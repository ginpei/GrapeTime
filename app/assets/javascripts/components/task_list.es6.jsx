class TaskList extends React.Component {
	render() {
		var className = `task-list ${this.props.className || ''}`;

		var children = this.props.tasks.map((v)=>{
			return (<TaskItem
				children={v.children || []}
				id={v.id}
				key={v.id}
				name={v.name}
				progress={v.progress}
				task={v.task}
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
