import React from 'react';

class PhotoManageHeader extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	toggle: false
	    };
	}
	handleDelete(ev) {
		this.props.deleteFn();
	}
	handleChoice(ev) {
		let {cancelFn} = this.props,
			{toggle} = this.state;
		//如果现在为'选中'，则下步为取消
		if(toggle) {
			//因为进行了删除，届时传入的choiced为false
			//那时会设置toggle状态，故而这里没有重设
			cancelFn();
		}else {
			//这里处理的是用户手动取消删除的操作
			this.setState({
				toggle: !toggle
			});	
		}				
	}
	componentWillReceiveProps(nextProps) {
		//如果没有图片选中，则设置按钮'选则'状态
		if(!nextProps.choiced) {
			this.setState({
				toggle: false
			});
		}
	}
	render() {
		let {choiced} = this.props,
			{toggle} = this.state;
		return (
			<header>
				{(()=>{
					if(choiced) {
						return (
		    				<a href="javascript:;" className="btn"
		    					onTouchEnd={this.handleDelete.bind(this)}>删除</a>
						);
					}
				})()}
		        <label>相机相册</label>
		        <a href="javascript:;" className="btn"
		        	onTouchEnd={this.handleChoice.bind(this)}>{toggle ? '取消' : '选择'}</a>
		    </header>
		);
	}
}
PhotoManageHeader.defaultProps = {
	choiced: false
}
PhotoManageHeader.propTypes = {
	choiced: React.PropTypes.bool.isRequired,
	deleteFn: React.PropTypes.func.isRequired,
	cancelFn: React.PropTypes.func.isRequired
}
export default PhotoManageHeader;