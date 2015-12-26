import React from 'react';

class PhotoManageTrash extends React.Component {
	render() {
		let style = {
			bottom: `-${this.props.choiced ? 0.8 : 1.2}rem`
		}
		return (
			<div className="recycles">
				<span className="recycle" style={style}></span>
				<span className="recycle" style={style}></span>
			</div>
		);
	}
}
PhotoManageTrash.defaultProps = {
	choiced: false
}
PhotoManageTrash.propTypes = {
	choiced: React.PropTypes.bool.isRequired
}
export default PhotoManageTrash; 