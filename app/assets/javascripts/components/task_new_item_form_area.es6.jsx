let React = require('react');
let TaskItemNewForm = require('./task_item_new_form.es6.jsx');

class TaskNewItemFormArea extends React.Component {
	render() {
		let s = this.state;

		let url = '/tasks/';

		let formWrapperClassName = 'task-new_area';
		if (s.opening) {
			formWrapperClassName += ' is-task-new_area-opened';
		}

		return (
			<div>
				<p>
					<button onClick={this.openForm_onClick.bind(this)}>New Task</button>
				</p>
				<div className={formWrapperClassName}>
					<TaskItemNewForm ref="form" onSave={this.form_onSave.bind(this)} />
				</div>
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			opening: false,
		};
	}

	reset() {
		this.refs.form.reset();
	}

	openForm_onClick(event) {
		this.setState({ opening: !this.state.opening });
	}

	form_onSave(event, task) {
		this.reset();
		this.props.onSave(event, task);
	}
}

TaskNewItemFormArea.propTypes = {
	onSave: React.PropTypes.func,
};

module.exports = TaskNewItemFormArea;
