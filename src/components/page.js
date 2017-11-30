import React,{ Component } from 'react';
//引入 react-router 模块，获取 link 组件
import { Link } from 'react-router';

class Home extends Component{
	componentDidMount() {
        fetch("/eec/productCase/listBanner?page=1&rows=20").then(res=>{
            
        })
    }
	// 使用 link 代替 a 标签
	render(){
		return (
			<div>
				Home , 
				<Link to="/about">see about</Link>
			</div>
		);
	}
}

class About extends Component{
	// 使用 link 代替 a 标签
	render(){
		return (
			<h1>my svon</h1>
		);
	}
}
export { Home , About };