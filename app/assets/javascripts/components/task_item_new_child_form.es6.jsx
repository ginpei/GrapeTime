class TaskItemNewChildForm extends React.Component {
	render() {
		let s = this.state;
		let parentTask = this.props.parentTask;

		let url = `/tasks/`;

		return (
			<form ref="form" onSubmit={this.form_onSubmit.bind(this)} action={url} method="post">
				<input type="hidden" name="task[parent_id]" value={this.props.parentTask.id} />
				<div class="field">
					Parent: {parentTask.name}
				</div>
				<div class="field">
					<label>Name: <input onChange={this.name_onChange.bind(this)} type="text" name="task[name]" value={s.name} /></label>
				</div>
				<div class="field">
					<label>Estimate time: <input onChange={this.estimateTime_onChange.bind(this)} type="number" name="task[estimate_time]" value={s.estimate_time} /></label>
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

	post() {
		this.sendRemoteForm(this.refs.form, (xhr, event)=>{
			if (event.type === 'error' || xhr.status !== 200) {
				console.log('error');
			}
			else {
				console.log(JSON.parse(xhr.responseText));
			}
		});
	}

	sendRemoteForm(elForm, callback=()=>{}) {
		let { url, method, data } = this.getFormData(elForm);

		let xhr = new XMLHttpRequest();
		xhr.onload = function(event) {
			callback(xhr, event);
		};
		xhr.onerror = function(event) {
			callback(xhr, event);
		};
		xhr.open(method, url);
		xhr.setRequestHeader('X-CSRF-Token', this.getCSRFToken());
		xhr.send(data);
	}

	getFormData(elForm) {
		let url = this.refs.form.getAttribute('action');
		let method = this.refs.form.getAttribute('method').toUpperCase();
		let data = new FormData(elForm);
		return { url, method, data };
	}

	getCSRFToken() {
		let el = document.querySelector('meta[name=csrf-token]');
		let token = el.getAttribute('content');
		return token;
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
		this.post();
	}
}

TaskItemNewChildForm.propTypes = {
	parentTask: React.PropTypes.object,
};
