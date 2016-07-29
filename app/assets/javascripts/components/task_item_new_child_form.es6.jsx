class TaskItemNewChildForm extends React.Component {
	render() {
		let s = this.state;
		let parentTask = this.props.parentTask;

		let url = `/tasks/`;

		let parentIdField;
		let parentNameField;
		if (parentTask) {
			parentIdField = (
				<input type="hidden" name="parent_id" value={parentTask.id} />
			);
			parentNameField = (
				<div class="field">
					Parent: {parentTask.name}
				</div>
			);
		}

		return (
			<form ref="form" onSubmit={this.form_onSubmit.bind(this)} action={url} method="post">
				{parentIdField}
				{parentNameField}
				<div class="field">
					<label>Name: <input onChange={this.name_onChange.bind(this)} type="text" name="name" value={s.name} /></label>
				</div>
				<div class="field">
					<label>Estimate time: <input onChange={this.estimateTime_onChange.bind(this)} type="number" name="estimate_time" value={s.estimate_time} /></label>
				</div>
				<div class="field">
					<button roll="submit">Submit</button>
				</div>
			</form>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			estimate_time: 0,
			name: '',
		};
	}

	save(callback) {
		let attributes = Task.createAttributesFromForm(this.refs.form);
		let task = new Task(attributes);
		task.save((xhr, event)=>{
			let responseData = JSON.parse(xhr.responseText);
			let taskData = responseData.data;
			task.id = taskData.id;
			if (callback) {
				callback(task);
			}
		});

		this.reset();

		return task;
	}

	reset() {
		// estimate time becomes empty...
		this.refs.form.reset();
	}

	name_onChange(event) {
		this.setState({
			name: event.target.value,
		});
	}

	estimateTime_onChange(event) {
		this.setState({
			estimate_time: Number(event.target.value),
		});
	}

	form_onSubmit(event) {
		event.preventDefault();
		this.save((task)=>{
			this.props.onSave(event, task);
		});
	}
}

TaskItemNewChildForm.propTypes = {
	onSave: React.PropTypes.func,
	parentTask: React.PropTypes.object,
};
