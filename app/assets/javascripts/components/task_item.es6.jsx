class TaskItem extends React.Component {
  render() {
		var p = this.props;

		var itemClassName = `task-item js-taskItem is-task-opened`;
		if (p.working) {
			itemClassName += ' is-working';
		}
    return (
			<div className={itemClassName}>
				<div className="task-item-body js-task-body">
					<button className="btn-text task-item-toggle js-task-toggle">
						<Icon name="plus-square-o" className="task-item-toggle-open"></Icon>
						<Icon name="minus-square-o" className="task-item-toggle-close"></Icon>
					</button>
					<span className="btn-link task-item-name js-task-work">
						{p.name}
						<Icon name="play-circle" className="task-item-startIcon"></Icon>
						<Icon name="stop-circle" className="task-item-stopIcon"></Icon>
					</span>
					<a className="task-item-times" href="/tasks/#{task.id}">
						{p.total_spent_time}
						<TaskProgress value={p.total_spent_time} max={p.total_necessary_time} />
					</a>
					<button className="btn-icon task-item-button task-item-edit js-task-edit">
						<Icon name="pencil-square-o"></Icon>
					</button>
					<button className="btn-icon task-item-button task-item-add js-task-addChildTask">
						<Icon name="plus"></Icon>
					</button>
				</div>
				<div className="task-item-formEdit js-task-formEdit">
					<div className="pull-right">
						<a className="js-task-delete" data-confirm="Are you sure?" data-method="delete"><button>Delete</button></a>
					</div>
					+edit_form(task)
				</div>
				<TaskList className="task-item-children js-task-children" tasks={p.children} />
				<div className="task-item-formAddChild js-task-formAddChild">
					+new_form(task)
				</div>
				+start_form(task)
				+stop_form(task)
			</div>
    );
  }
}

TaskItem.propTypes = {
  children: React.PropTypes.instanceOf(Array),
  id: React.PropTypes.node,
  name: React.PropTypes.string,
  progress: React.PropTypes.number,
  task: React.PropTypes.instanceOf(Object),
  total_necessary_time: React.PropTypes.number,
  total_spent_time: React.PropTypes.number,
  working: React.PropTypes.bool,
};