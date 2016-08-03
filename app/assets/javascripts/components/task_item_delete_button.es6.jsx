class TaskItemDeleteButton extends React.Component {
	render() {
		let task = this.state.task;
		return (
			<button onClick={this.button_onClick.bind(this)} className="pull-right">Delete</button>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			task: props.task,
		};
	}

	confirm() {
		let p = new Promise((resolve, reject)=>{
			let result = window.confirm('Are you sure?');
			if (result) {
				resolve();
			}
			else {
				reject();
			}
		});
		return p;
	}

	post() {
		window.Rails.sendRequest({
			method: 'DELETE',
			url: `/tasks/${this.props.task.id}`,
			callback: ()=>{
				this.props.onSave(this.props.task);
			},
		});
	}

	button_onClick() {
		this.confirm()
			.then(()=>{
				this.post();
			});
	}
}

TaskItemDeleteButton.propTypes = {
	onSave: React.PropTypes.func,
	task: React.PropTypes.object,
};
