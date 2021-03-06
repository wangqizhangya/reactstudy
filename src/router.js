import React,{ Component } from 'react';
//引入 react-router 模块
import { Router, Route, hashHistory } from 'react-router';
//引入组件
import { Home } from './components/page';
import { Sendflow } from './components/sendflow';
import { Exchange } from './components/exchange';
import { Notice } from './components/noticethings';

import { Signgift } from './components/signgift';
class App extends Component{
	// history 是设置 Router 组件的值，hashHistory 是处理路由的函数
	// Route 是定义一组路由，当路由匹配后展示设置的 component 组件
	render(){
		return (<Router history={ hashHistory }>
			<Route path="/" component={ Home }/>
			<Route path="/sendflow" component={ Sendflow }/>
			<Route path="/exchange" component={ Exchange }/>
			<Route path="/notice" component={ Notice }/>
			<Route path="/signgift" component={ Signgift }/>
		</Router>);
	}
}
export { App };