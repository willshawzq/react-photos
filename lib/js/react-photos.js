class PhotoManage extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	photos: props.photos,
	    	deleteArr: []
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
			deleteArr: []
		});
	}
	deleteArray(index) {
		this.state.deleteArr.push(index);
	}
	clearDeleteArr() {
		this.state.deleteArr = [];
	}
	render() {
		return (
			<article className="photo-page">
				<PhotoManageHeader deletePhotos={this.deletePhotos.bind(this)} clearDeleteArr={this.clearDeleteArr.bind(this)}/>
			    <PhotoList photos={this.state.photos} delArr={this.deleteArray.bind(this)} />
			    <PhotoManageFooter />
			    <PhotoManageTrash />
			    <Box3DView />
			</article>
		);
	}
}
class PhotoList extends React.Component {
	renderChildren() {
		return React.Children.map(this.props.photos, (val, i) => {
			return (
				<li style={{
					backgroundImage: `url(${val})`,
					left: `${i%3}rem`,
					top: `${parseInt(i/3)}rem`
				}} data-index={i}></li>
			);
		})
	}
	handleTouch(ev) {
		this.props.delArr(ev.target.dataset.index);
	}
	render() {
		return (
			<section className="wrap">
		    	<ul className="picList" onTouchEnd={this.handleTouch.bind(this)}>
		    		{this.renderChildren()}
		        </ul>
		    </section>
		);		
	}
}
class Box3DView extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	}
	renderDiv(index) {
		if(index > 9) return;
		return <div style={{
			backgroundPosition: `-0.${index}rem 0`
		}}>{this.renderDiv(++index)}</div>
	}
	render() {
		return (
		<div className="box-3D">
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
