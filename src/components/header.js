import React,{ Component } from 'react';

import $ from 'jquery';

import { Link } from 'react-router';

class Header extends Component{
	constructor(props){
		super(props)
		var _url=window.location.search;
	  	function getQueryObjects(url) {
	 		url = url == null ? window.location.href : url;
	        var search = url.substring(url.lastIndexOf("?") + 1);
	        var obj = {};
	        var reg = /([^?&=]+)=([^?&=]*)/g;
	        search.replace(reg, function(rs, $1, $2) {
	            var name = decodeURIComponent($1);
	            var val = decodeURIComponent($2);
	            val = String(val);
	            obj[name] = val;
	            return rs;
	        });
	        return obj
		}
		this.state={
	        token:getQueryObjects(_url).token,
	        lastcredit:'0',
		    totalcredit:'0',
		    usedcredit:'',
		    continuedSigninTimes:'0', 
			signBackground:'' 
      	};
	}
	componentDidMount() {
		
        $.get('/littlec-signin/v1/signin/getSignin?token='+this.state.token,function(data){
			console.log(data.signin)
			if(data.signin){
				this.setState({
			        lastcredit:data.signin.leftCredit,
			        totalcredit:data.signin.totalCredit,
			        usedcredit:data.signin.creditForFee,
			        continuedSigninTimes:data.signin.continuedSigninTimes,
			        signBackground:''
		        
	      		})
//				_this.$store.commit('SET_sign','1')
//				_this.lastcredit=res.body.signin.leftCredit;
//				_this.totalcredit=res.body.signin.totalCredit;
//				_this.usedcredit=res.body.signin.creditForFee;
//				_this.continuedSigninTimes=res.body.signin.continuedSigninTimes
				if(data.signin.isToday=='1'){
					this.setState({
				        signBackground:'1'
		        
	      			})
//					_this.signBackground='1'
//					_this.$store.commit('SET_bg','1')
				}else{
					this.setState({
				        signBackground:'2'
		        
	      			})
//					_this.signBackground='2'
//					_this.$store.commit('SET_bg','2')
//					console.log(_this.$store.state.signBackground);
				}
				
			}else{
				this.setState({
			        signBackground:'2'
		        
      			})
//				_this.signBackground='2'
//				_this.$store.commit('SET_sign','2')
//				_this.$store.commit('SET_bg','2')
			}
			

        }.bind(this))
        	

   }
	render(){
		return (
			<div className="header">
				<Link to="/changelog" className="changelogs">
					积分明细
				</Link>
				<div className="headermain">
					<p>
						<span>总积分:</span>
						<span className="totaljifen">{this.state.totalcredit}</span>
					</p>
			
				</div>
				{this.state.signBackground=='1'?(
				
					
					<div className="signstate">
						<img src={require("../img/bg_jf.png")} />
						<span className="totaljifen">{this.state.lastcredit}</span>
					</div>
					
					
					
					
					):(
						<img src={require("../img/btn_qd_nm@2x.png")}  className="icon1" />	
					)}
				
				
				<span className="days">已连续签到<b>{this.state.continuedSigninTimes}</b>天</span>
			</div>
		);
	}
}
export { Header };