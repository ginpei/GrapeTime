class TaskItem extends React.Component {
	render() {
		let task = this.state.task;

		let itemClassName = this._getItemClassName();

		return (
			<div className={itemClassName}>
				<TaskItemBody onToggle={this.itemBody_onToggle.bind(this)} task={task} />
				<div className="task-item-formEdit js-task-formEdit">
					<div className="pull-right">
						<a className="js-task-delete" data-confirm="Are you sure?" data-method="delete"><button>Delete</button></a>
					</div>
					<TaskEditForm onSave={this.taskEditForm_onSave.bind(this)} task={task} />
				</div>
				<TaskList className="task-item-children js-task-children" tasks={task.children} />
				<div className="task-item-formAddChild js-task-formAddChild">
					<TaskItemNewChildForm parentTask={task} />
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
			task: props.task,
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

	itemBody_onToggle(type) {
		var nextState = {};
		nextState[type] = !this.state[type];
		this.setState(nextState);
	}

	taskEditForm_onSave(task) {
		this.setState({
			editing: false,
			task: task,
		});
	}
}

TaskItem.propTypes = {
	task: React.PropTypes.object,
};
