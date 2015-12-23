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
		this.setState({
			photos: photos,
			deleteArr: [],
			cancel: false
		});
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
	clearDeleteArr() {
		this.setState({
			deleteArr: [],
			cancel: true
		});
	}
	renderBox3D() {
		console.log(this.state.deleteArr);
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
			    	delArr={this.deleteArray.bind(this)} 
			    	cancel={this.state.cancel}
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
		return React.Children.map(this.props.photos, (val, i) => {
			return (
				<li key={i} style={{
					backgroundImage: `url(${val})`,
					left: `${i%3}rem`,
					top: `${parseInt(i/3)}rem`
				}} data-index={i}></li>
			);
		});
	}
	handleTouch(ev) {
		let index = parseInt(ev.target.dataset.index),
			status = this.props.delArr(index);
		if(status) {
			this.state.choiced.push(index);
		}
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
	componentWillUnmount() {
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
