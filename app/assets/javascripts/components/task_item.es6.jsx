class TaskItem extends React.Component {
  render() {
		let p = this.props;

		let itemClassName = this._getItemClassName();

    return (
			<div className={itemClassName}>
				<div className="task-item-body js-task-body">
					<button onClick={this.toggle_onClick.bind(this)} className="btn-text task-item-toggle">
						<Icon name="plus-square-o" className="task-item-toggle-open"></Icon>
						<Icon name="minus-square-o" className="task-item-toggle-close"></Icon>
					</button>
					<span className="btn-link task-item-name js-task-work">
						{p.name}
						<Icon name="play-circle" className="task-item-startIcon"></Icon>
						<Icon name="stop-circle" className="task-item-stopIcon"></Icon>
					</span>
					<a className="task-item-times" href="/tasks/#{task.id}">
						({this.toHMS(p.total_spent_time)})
						<TaskProgress value={p.total_spent_time} max={p.total_necessary_time} />
					</a>
					<button onClick={this.toggleEditForm_onClick.bind(this)} className="btn-icon task-item-button task-item-edit">
						<Icon name="pencil-square-o"></Icon>
					</button>
					<button onClick={this.toggleChildForm_onClick.bind(this)} className="btn-icon task-item-button task-item-add">
						<Icon name="plus"></Icon>
					</button>
				</div>
				<div className="task-item-formEdit js-task-formEdit">
					<div className="pull-right">
						<a className="js-task-delete" data-confirm="Are you sure?" data-method="delete"><button>Delete</button></a>
					</div>
					<TaskEditForm id={p.id} name={p.name} necessary_time={p.necessary_time} spent_time={p.spent_time} />
				</div>
				<TaskList className="task-item-children js-task-children" tasks={p.children} />
				<div className="task-item-formAddChild js-task-formAddChild">
					+new_form(task)
				</div>
				{/*
				+start_form(task)
				+stop_form(task)
				*/}
			</div>
    );
  }

	_getItemClassName() {
		let p = this.props;
		let s = this.state;
		let itemClassName = `task-item js-taskItem`;

		if (s.opened) {
			itemClassName += ' is-task-opened';
		}

		if (s.editing) {
			itemClassName += ' is-task-editingOwn';
		}

		if (s.editingChild) {
			itemClassName += ' is-editing-addChild';
		}

		if (p.working) {
			itemClassName += ' is-working';
		}

		return itemClassName;
	}

	constructor(props) {
		super(props);
		this.state = {
			opened: true,
			editing: false,
			editingChild: false,
		};
	}

	/**
	 * @param {number} total
	 * @returns {string} "h:mm:ss"
	 */
	toHMS(total) {
		let sec = total % 60;
		let min = Math.floor((total - sec) / 60) % 60;
		let hr = Math.floor((total - sec - min * 60) / 60 / 60);
		let s = `${hr}:${this.toDoubleDecimal(min)}:${this.toDoubleDecimal(sec)}`;
		return s;
	}

	/**
	 * @param {number} n
	 * @returns {string}
	 * @example
	 * console.log(this.toDoubleDecimal(9));  // => "09"
	 * console.log(this.toDoubleDecimal(10));  // => "10"
	 */
	toDoubleDecimal(n) {
		return `0${n}`.slice(-2);
	}

	toggle_onClick(event) {
		this.setState({ opened: !this.state.opened });
	}

	toggleEditForm_onClick(event) {
		this.setState({ editing: !this.state.editing });
	}

	toggleChildForm_onClick(event) {
		this.setState({ editingChild: !this.state.editingChild });
	}
}

TaskItem.propTypes = {
	children: React.PropTypes.instanceOf(Array),
	id: React.PropTypes.node,
	name: React.PropTypes.string,
	necessary_time: React.PropTypes.number,
	progress: React.PropTypes.number,
	spent_time: React.PropTypes.number,
	task: React.PropTypes.instanceOf(Object),
	total_necessary_time: React.PropTypes.number,
	total_spent_time: React.PropTypes.number,
	working: React.PropTypes.bool,
};
