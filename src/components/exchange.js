
import React,{ Component } from 'react';
//引入 react-router 模块，获取 link 组件
import $ from 'jquery';
//import './swiper.min.js';
import { Link } from 'react-router';
import { Header } from './header';
class Exchange extends Component{
	// 使用 link 代替 a 标签
	render(){
		return (
			<Header />
		);
	}
}
export { Exchange };