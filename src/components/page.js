
import React,{ Component } from 'react';
//引入 react-router 模块，获取 link 组件
import $ from 'jquery';
//import './swiper.min.js';
import { Link } from 'react-router';
import { createStore } from 'redux';
//import './clint.js';
//父组件
class Home extends Component{
	constructor(props){
		super(props)
		this.state={
		    bannerList:[],
		    checked:true
		        
	    };
	}
	counter(state = 0, action) {
	  switch (action.type) {
	  case 'INCREMENT':
	    return state + 1;
	  case 'DECREMENT':
	    return state + 2;
	  default:
	    return state +3;
	  }
	}
	onChildChanged(newState) {
	    this.setState({
	      checked: newState
	    });
	}
	componentDidMount() {
		
//      $.get("/eec/productCase/listBanner?page=1&rows=20",function(data){
//      	this.setState({
//		        bannerList:JSON.parse(data).bannerList
//	      	})
//
//
//      }.bind(this))
        	
//      
// 		var mySwiper = new Swiper ('.swiper-container', {
//			speed: 1000,
//			autoplay:1000,
//			loop: true,
//			observer:true,
//			observeParents:true,
//			autoplayDisableOnInteraction : false,
//			watchActiveIndex:true,
//		    direction: 'horizontal',
//		    slidesPerView:1,
//		    paginationClickable: true,
//		    centeredSlides: true
//
//	   
//		})
		let store = createStore(this.counter);
		store.subscribe(() =>
		  	console.log(store.getState())
		);
		store.dispatch({ type: 'INCREMENT' });
		// 1
		store.dispatch({ type: 'INCREMENT' });
		// 2
		store.dispatch({ type: 'DECREMENT' });
		// 1
   }
	goMenu(){
		
//      	yqx.biz.message.setAppTitle({
//          	params:{'title':'haha'},
//          	onSuccess: function(data) {
//          	
//          		
//                  log.i('fetch message success: ' + JSON.stringify(data));
//              },
//              onFail: function(err) {
//                  log.e('fetch message err: ' + JSON.stringify(err));
//              }
//          });
      
		
	}
	
	render(){
//		const listBanner=this.state.bannerList.map((item)=>
//			<div className="swiper-slide" key={item.banner_logo}><a><img src={item.banner_logo} /></a></div>
//		)
		return (
			<div className="index">
				<Link to="/notice" className="noticething">
				注意事项
				</Link>
				<img className="icon" onClick={this.goMenu.bind(this)} src={require("../img/banner5.jpg")} />
				<Link to="/sendflow" className="sendFlow">
					<span>签到送积分</span>
				</Link>
				<Link to="/exchange" className="exchange2">
					<span>积分兑换</span>
				</Link>
				<Child1 text="Toggle me" checked={this.state.checked}/>
				<Child2 text="Toggle me" initialChecked={this.state.checked} callbackParent={this.onChildChanged.bind(this)}/>
			</div>
		);
	}
}
//子组件//父组件向子组件传值
class Child1 extends Component{
	render(){
		const checked=this.props.checked;
		const text=this.props.text;
		return (
			<label>{text}:<input type="checkbox" checked={checked} /></label>
		);
	}
}
//子组件//子组件向父组件传值

class Child2 extends Component{
	constructor(props){
		super(props)
		this.state={
		   
		    checked:this.props.initialChecked
		        
	    };
	    console.log(this.state.checked)
	}
	onTxtChange(){
		console.log(this.state.checked);
		var newState=!this.state.checked;
		this.setState({
	      checked:newState
	    });
	    this.props.callbackParent(newState);
	}
	render(){
		 // 组件自身的状态数据
		
		const checked=this.state.checked;
		 // 从【父组件】获取的值
		const text=this.props.text;
		return (
			<label>{text}:<input type="checkbox" checked={checked} onChange={this.onTxtChange.bind(this)}/></label>
		);
	}
}
export { Home };