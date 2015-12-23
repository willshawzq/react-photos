class PhotoManage extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	photos: props.photos,
	    	deleteArr: [],
	    	cancel: false
	    };
	 }
	componentWillMount() {
		document.querySelector("html").style.fontSize=document.documentElement.clientWidth/3+"px";
	}
	deletePhotos() {
		let {photos, deleteArr} = this.state;
		deleteArr.forEach((val) => {
			photos.splice(val, 1);
		});
		this.deleteAnimation();
		setTimeout(()=>{
			this.setState({
				photos: photos,
				deleteArr: [],
				cancel: false
			});
		}, 5000);
	}
	deleteArray(index) {
		//通过获取header组件中的状态，目前不知这种写法有何弊端
		let status = this.refs.header.state.choice;
		if(status) {
			this.state.deleteArr.push(index);
			this.setState({
				deleteArr: this.state.deleteArr
			});
		}
	}
	deleteAnimation() {
		let oBoxes = document.querySelectorAll(".box-3D");
		for(let i = 0, len = oBoxes.length; i < len; i++) {
			oBoxes[i].classList.add('to-middle');
		}
	}
	clearDeleteArr() {
		let oBoxes = document.querySelectorAll(".box-3D");
		for(let i = 0, len = oBoxes.length; i < len; i++) {
			oBoxes[i].classList.remove("show");
		}
		setTimeout(()=>{
			this.setState({
				deleteArr: []
			});
		}, 800);
	}
	renderBox3D() {
		return this.state.deleteArr.map((val, i) => {
			return <Box3DView
						key={i}
						index={val}
						backgroundImage={this.state.photos[val]}
				   />
		});
	}
	render() {
		return (
			<article className="photo-page">
				<PhotoManageHeader 
					ref="header" 
					deletePhotos={this.deletePhotos.bind(this)} 
					clearDeleteArr={this.clearDeleteArr.bind(this)}
				/>
			    <PhotoList 
			    	photos={this.state.photos} 
			    	delArr={this.state.deleteArr}
			    	cancel={this.state.cancel}
			    	delArrFn={this.deleteArray.bind(this)}
			    />
			    <PhotoManageFooter />
			    <PhotoManageTrash />
			    {this.renderBox3D()}
			</article>
		);
	}
}
class PhotoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	renderChildren() {
		let {cancel, delArr} = this.props;
		return React.Children.map(this.props.photos, (val, i) => {
			let exits = delArr.includes(i);
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
		this.props.delArrFn(index);
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
class Box3DView extends React.Component {
	componentDidMount() {
		window.requestAnimationFrame(()=>{
			this.refs.box.classList.add("show");
		});
	}
	renderDiv(index) {
		if(index > 9) return;
		return <div style={{
			backgroundPosition: `-0.${index}rem 0`
		}}>{this.renderDiv(++index)}</div>
	}
	render() {
		let {backgroundImage,index} = this.props;
		return (
			<div className="box-3D" ref="box"
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
class PhotoManageHeader extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	choice: false
	    };
	}
	handleDelete(ev) {
		this.props.deletePhotos();
	}
	handleChoice(ev) {
		let {choice} = this.state;
		if(choice) {
			this.props.clearDeleteArr();
		}
		this.setState({
			choice: !choice
		});
	}
	render() {
		let {choice} = this.state;
		return (
			<header>
				{(()=>{
					if(choice) {
						return (
		    				<a href="javascript:;" className="btn" 
		    					onTouchEnd={this.handleDelete.bind(this)}>删除</a>
						);
					}
				})()}
		        <label>相机相册</label>
		        <a href="javascript:;" className="btn" 
		        	onTouchEnd={this.handleChoice.bind(this)}>{choice ? '取消' : '选择'}</a>
		    </header>
		);
	}
}
class PhotoManageFooter extends React.Component {
	render() {
		return (
			<footer>
		    	<a href="javascript:;" className="active">相机相册</a>
		        <a href="javascript:;">所有相册</a>
		    </footer>
		);
	}
}
class PhotoManageTrash extends React.Component {
	render() {
		return (
			<div>
				<span className="recycle"></span>
				<span className="recycle"></span>	
			</div>
		);
	}
}
