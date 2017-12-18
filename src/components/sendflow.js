
import React,{ Component } from 'react';
import '../sass/sendflow.scss';
import $ from 'jquery';
//import './swiper.min.js';
import { Link } from 'react-router';

class Sendflow extends Component{
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
		    remarktxt:'',
		    nodata:true
      	};
	}
	componentDidMount() {
		
        $.get('/littlec-signin/v1/signin/remarkRule?token='+this.state.token+'&model=2',function(data){
        	console.log(JSON.parse(data))
        	
			if(JSON.parse(data).data){
				this.setState({
			       remarktxt:JSON.parse(data).data,
			       nodata:false
		        
	      		})
				
			}else{
				this.setState({
			      	nodata:true
			       
		        
	      		})
				
			}

        }.bind(this))
        	

   }
	setToolbar(){
		var tools = [];
		for(var i in this.state.remarktxt) {
			
       		tools.push(<div key={i} >{     			
       			this.state.remarktxt[i].map((item,index)=>
				<div className="txts" key={index}>{i}{item}</div>
				)
   			}</div>);
    	}    
		
		return tools;
	}
	render(){
		return (
			<div className="sendflow">
				<div className="banner">
	   				<img src={require("../img/banner4.jpg")} />   
				</div>
				<div className="mainsendflow">
					<h3>签到送积分换流量</h3>
					{this.state.nodata==false?(
				
					
						this.setToolbar()
					
					
					
					
					):(
						<div className="noData">暂无数据</div>
					)}
				
					
					<Link to="/signgift" className="rightSign">
						立即签到
					</Link>
				</div>
			</div>
		);
	}
}
export { Sendflow };