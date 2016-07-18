class TaskProgress extends React.Component {
	render () {
		var p = this.props;
		var percentage = p.value / p.max * 100;
		var style = {
			width: `${percentage}%`,
		};
		return (
			<span className="task-item-progress">
				<span className="task-item-progress-bar" style={style}></span>
			</span>
		);
	}
}

TaskProgress.defaultProps = {
	max: 0,
	value: 0,
};

TaskProgress.propTypes = {
	value: React.PropTypes.number,
	max: React.PropTypes.number,
};
