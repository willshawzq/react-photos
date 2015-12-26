import React from 'react';

class Box3DView extends React.Component {
	componentDidMount() {
		//这里原本用的是window.requestAnimationFrame，但偶尔会出现第一次点击没动画的情况；
		setTimeout(()=>{
			this.refs.box.classList.add("show");
		}, 30);
	}
	renderDiv(index) {
		if(index > 9) return;
		return <div style={{
			backgroundPosition: `-0.${index}rem 0`
		}}>{this.renderDiv(++index)}</div>
	}
	handleClick() {
		this.refs.box.classList.remove("show");
		setTimeout(()=>{
			this.props.removeFn();
		}, 500);
	}
	render() {
		let {backgroundImage,index} = this.props;
		return (
			<div className="box-3D" ref="box"
				onClick={this.handleClick.bind(this)}
				style={{
					backgroundImage: `url(${backgroundImage})`,
					left: `${index%3}rem`,
					top: `${parseInt(index/3) + .45}rem`,
				}}>
				<div>
			    	{this.renderDiv(1)}
			    </div>
			</div>
		);
	}
}
Box3DView.defaultProps = {
	
}
Box3DView.propTypes = {
	index: React.PropTypes.number.isRequired,
	backgroundImage: React.PropTypes.string.isRequired,
}
export default Box3DView;