let React = require('react');

class TaskItemEditForm extends React.Component {
	render() {
		let task = this.props.task;
		let s = this.state;

		let url = `/tasks/${task.id}`;

		return (
			<form ref="form" onSubmit={this.form_onSubmit.bind(this)} action={url} method="patch">
				<div className="field">
					<label>Name: <input onChange={this.name_onChange.bind(this)} type="text" name="task[name]" value={s.name} /></label>
				</div>
				<div className="field">
					<label>Spent time: <input onChange={this.spent_time_onChange.bind(this)} type="number" name="task[spent_time]" value={s.spent_time} /></label>
				</div>
				<div className="field">
					<label>Necessary time: <input onChange={this.necessary_time_onChange.bind(this)} type="number" name="task[necessary_time]" value={s.necessary_time} /></label>
				</div>
				<div className="field">
					<button>Submit</button>
				</div>
			</form>
		);
	}

	constructor(props) {
		super(props);
		let task = props.task;
		this.state = {
			name: task.name,
			necessary_time: task.necessary_time,
			spent_time: task.spent_time,
		}
	}

	post() {
		window.Rails.post(this.refs.form, (xhr, event)=>{
			if (event.type === 'error' || xhr.status !== 200) {
				console.error('error', event);
			}
			else {
				let responseData = JSON.parse(xhr.responseText);
				let task = responseData.data;
				this.props.onSave(task);
			}
		});
	}

	name_onChange(event) {
		this.setState({
			name: event.target.value,
		});
	}

	necessary_time_onChange(event) {
		this.setState({
			necessary_time: Number(event.target.value),
		});
	}

	spent_time_onChange(event) {
		this.setState({
			spent_time: Number(event.target.value),
		});
	}

	form_onSubmit(event) {
		event.preventDefault();
		this.post();
	}
}

// TaskItemEditForm.defaultProps = {
// 	name: '',
// 	necessary_time: 0,
// };

TaskItemEditForm.propTypes = {
	onSave: React.PropTypes.func,
	task: React.PropTypes.object,
};

module.exports = TaskItemEditForm;
