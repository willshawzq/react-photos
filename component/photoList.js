import React from 'react';

class PhotoList extends React.Component {
	renderChildren() {
		let {choiced} = this.props;
		return React.Children.map(this.props.photos, (val, i) => {
			let exits = choiced.includes(i);
			return (
				<li key={i} style={{
					backgroundImage: !exits ? `url(${val})` : 'none',
					left: `${i%3}rem`,
					top: `${parseInt(i/3)}rem`
				}} data-index={i}></li>
			);
		});
	}
	handleTouch(ev) {
		let index = parseInt(ev.target.dataset.index);
		this.props.choicedFn(index);
	}
	render() {
		return (
			<section className="wrap">
		    	<ul
		    		className="picList"
		    		onTouchEnd={this.handleTouch.bind(this)}
		    	>
		    		{this.renderChildren()}
		        </ul>
		    </section>
		);
	}
}
PhotoList.defaultProps = {
	photos: [],
	choiced: []
}
PhotoList.propTypes = {
	photos: React.PropTypes.array.isRequired,
	choiced: React.PropTypes.array,
	choicedFn: React.PropTypes.func.isRequired
}
export default PhotoList;