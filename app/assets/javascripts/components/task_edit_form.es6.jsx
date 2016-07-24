class TaskEditForm extends React.Component {
	render() {
		var p = this.props;
		var s = this.state;

		var url = `/tasks/${p.id}`;

		return (
			<form ref="form" onSubmit={this.form_onSubmit.bind(this)} action={url} method="patch">
				<div class="field">
					<label>Name: <input onChange={this.name_onChange.bind(this)} type="text" name="task[name]" value={s.name} /></label>
				</div>
				<div class="field">
					<label>Spent time: <input onChange={this.spent_time_onChange.bind(this)} type="number" name="task[spent_time]" value={s.spent_time} /></label>
				</div>
				<div class="field">
					<label>Necessary time: <input onChange={this.necessary_time_onChange.bind(this)} type="number" name="task[necessary_time]" value={s.necessary_time} /></label>
				</div>
				<div class="field">
					<button roll="submit">Submit</button>
				</div>
			</form>
		);
	}

	constructor(props) {
		super(props);
		this.state = Object.assign({}, this.props);
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
		var { url, method, data } = this.getFormData(elForm);

		var xhr = new XMLHttpRequest();
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
		var url = this.refs.form.getAttribute('action');
		var method = this.refs.form.getAttribute('method').toUpperCase();
		var data = new FormData(elForm);
		return { url, method, data };
	}

	getCSRFToken() {
		var el = document.querySelector('meta[name=csrf-token]');
		var token = el.getAttribute('content');
		return token;
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

// TaskEditForm.defaultProps = {
// 	name: '',
// 	necessary_time: 0,
// };

TaskEditForm.propTypes = {
	id: React.PropTypes.number,
	name: React.PropTypes.string,
	necessary_time: React.PropTypes.number,
	spent_time: React.PropTypes.number,
};
