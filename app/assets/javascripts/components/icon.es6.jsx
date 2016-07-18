class Icon extends React.Component {
  render () {
    return (
			<i className={`fa fa-${this.props.name} ${this.props.className}`}></i>
    );
  }
}

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string,
};
