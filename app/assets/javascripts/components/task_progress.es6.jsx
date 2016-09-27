let React = require('react');

class TaskProgress extends React.Component {
	render () {
		let p = this.props;
		let percentage = p.value / p.max * 100;
		let style = {
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

module.exports = TaskProgress;
