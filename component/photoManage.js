import React from 'react';
import PhotoManageHeader from './photoManageHeader';
import PhotoList from './photoList';
import PhotoManageFooter from './photoManageFooter';
import PhotoManageTrash from './photoManageTrash';
import Box3DView from './box3DView';

class PhotoManage extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	photos: props.photos, //传入的相片数组
	    	choicedPhotos: []     //选中的相片数组
	    };
	 }
	componentWillMount() {
	    //在渲染之前设置页面的根元素的字体大小，即设置rem对应的数值
	    //这里使用的是rem的方式做的自适应
		document.querySelector("html").style.fontSize = document.documentElement.clientWidth / 3 + "px";
	}
	deletePhotos() {
		let {photos, choicedPhotos} = this.state;
    	//对总数据进行操作，删除选中的元素
		choicedPhotos.forEach((val) => {
			photos.splice(val, 1);
		});
    	//在重新render之前，先完成动画效果
		this.deleteAnimation();
    	//这里监听trianstioned事件对应时间点不对，后面看能否改写css动画
		setTimeout(()=>{
			this.setState({
				photos: photos,
				choicedPhotos: []
			});
		}, 900);
	}
	addChoicedPhoto(index) {
		//通过获取header组件中的状态，目前不知这种写法有何弊端
		let status = this.refs.header.state.toggle;
		if(status) {
      	//重新render，展示选中效果
			this.state.choicedPhotos.push(index);
			this.setState({
				choicedPhotos: this.state.choicedPhotos
			});
		}
	}
	removeChoicedPhoto(index) {
		let {choicedPhotos} = this.state,
			i = choicedPhotos.indexOf(index);
		choicedPhotos.splice(i , 1);
		this.setState({
			choicedPhotos: choicedPhotos
		});
	}
	deleteAnimation(fn) {
		let oBoxes = document.querySelectorAll(".box-3D");
		for(let i = 0, len = oBoxes.length; i < len; i++) {
			oBoxes[i].classList.add('to-delete');
		}
		let oEecys = document.querySelector(".recycles");
		oEecys.classList.add('drop');
		oBoxes[0].addEventListener("transitionend",fn,false);
	}
	clearDeleteArr() {
		let oBoxes = document.querySelectorAll(".box-3D");
		for(let i = 0, len = oBoxes.length; i < len; i++) {
			oBoxes[i].classList.remove("show");
		}
		setTimeout(()=>{
			this.setState({
				choicedPhotos: []
			});
		}, 800);
	}
	renderBox3D() {
		return this.state.choicedPhotos.map((val, i) => {
			return <Box3DView
						key={i}
						index={val}
						backgroundImage={this.state.photos[val]}
						removeFn={this.removeChoicedPhoto.bind(this)}
				    />
		});
	}
	render() {
    	let {
          photos,
          choicedPhotos
        } = this.state,
        choiced = !!choicedPhotos.length;

		return (
			<article className="photo-page">
				<PhotoManageHeader
					ref="header"
              		choiced={choiced}
					deleteFn={this.deletePhotos.bind(this)}
					cancelFn={this.clearDeleteArr.bind(this)}
				/>
			    <PhotoList
			    	photos={photos}
			    	choiced={choicedPhotos}
			    	choicedFn={this.addChoicedPhoto.bind(this)}
			    />
			    <PhotoManageFooter />
			    <PhotoManageTrash
			    	choiced={choiced}
			    />
			    {this.renderBox3D()}
			</article>
		);
	}
}
PhotoManage.defaultProps = {
	photos: []
}
PhotoManage.propTypes = {
	choiced: React.PropTypes.array
}
export default PhotoManage; 