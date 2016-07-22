class TaskEditForm extends React.Component {
	render() {
		var p = this.props;
		var s = this.state;

		var url = `/tasks/${p.id}`;

		return (
			<form onSubmit={this.form_onSubmit.bind(this)} action={url} method="patch" data-remote="true">
				<div class="field" method="patch" data-remote="true">
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
		// event.preventDefault();
		console.log(this.state);
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
