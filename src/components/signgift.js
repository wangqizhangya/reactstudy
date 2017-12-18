
import React,{ Component } from 'react';
import '../sass/signgift.scss';
import $ from 'jquery';
//import './swiper.min.js';
import { Link } from 'react-router';
import { Header } from './header';
class Signgift extends Component{
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
		    s1:'',
	   		s2:'',
	   		s3:'',
	   		s4:'',
	   		data2:[],
	   		remarktxt:'',
	   		token:getQueryObjects(_url).token,
	   		nodata:true
      	};
	}
	componentDidMount() {
		
        $.get('/littlec-signin/v1/signin/remarkRule?token='+this.state.token+'&model=0',function(data){
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
			<div className="indexsign" ref="index">
				<div className="indexbanner">
					<Header />
				</div>
				<div className="mainsign">
					<div className="activeRule">
						<h2>活动规则：</h2>
						{this.state.nodata==false?(
				
					
						this.setToolbar()
					
					
					
					
					):(
						<div className="noData">暂无数据</div>
					)}
					</div>
			
				</div>
				<Link to="/exchange" className="excflow">
					兑换流量
				</Link>
			</div>	
		);
	}
}
export { Signgift };