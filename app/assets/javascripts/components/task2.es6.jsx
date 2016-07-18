class Task2 extends React.Component {
  render() {
		var p = this.props;

		var itemClassName = `task-item js-taskItem is-task-opened`;
		if (p.working) {
			itemClassName += ' is-working';
		}

		var children = (p.children||[]).map((v)=>{
			return (<Task2
				name={v.name}
				children={v.children || []}
			/>)
		});

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
						{p.totalSpentTimeString}
						+progress(task.progress)
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
				<div className="task-item-children js-task-children">
					{children}
				</div>
				<div className="task-item-formAddChild js-task-formAddChild">
					+new_form(task)
				</div>
				+start_form(task)
				+stop_form(task)
			</div>
    );
  }
}

Task2.propTypes = {
  children: React.PropTypes.instanceOf(Array),
  id: React.PropTypes.node,
  name: React.PropTypes.string,
  progress: React.PropTypes.number,
  working: React.PropTypes.bool,
  task: React.PropTypes.instanceOf(Object),
};
