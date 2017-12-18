
import React,{ Component } from 'react';
//引入 react-router 模块，获取 link 组件
import $ from 'jquery';

import { Link } from 'react-router';

class Notice extends Component{
	constructor(props){
		super(props);
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
	        noticelog:'2',
	        show:false,
	        nodata:true
	        
      	};
	}
	
	componentDidMount() {
		
	  
	  	const _this=this;
	    $.get('/littlec-signin/v1/signin/remarkRule?token='+this.state.token+'&model=3',function(res){
	    	if(JSON.parse(res).data){
	    		
				_this.setState({
					noticelog:JSON.parse(res).data,
					nodata:false
				})
			
				
			}else if(JSON.parse(res).error_msg=='token error'){
				_this.setState({
					show:true,
					nodata:true
					
				})
				
    			var t=setTimeout(function(){
//  				this.state.show=false;
    			},2000)
			}
	
			
	    }.bind(this))
        	

   }
	setToolbar(){
		var tools = [];
		for(var i in this.state.noticelog) {
			
       		tools.push(<div key={i} >{     			
       			this.state.noticelog[i].map((item)=>
				<div className="txts" key={i}>{i}{item}</div>
				)
   			}</div>);
    	}    
		
		return tools;
	}
	render(props){
		
//		const listTxt=this.state.noticelog.map((item)=>
//			<div class="txts"></div>
//		)
		
		
		return (
			<div className="notice">
				<h5>注意事项</h5>
				{this.state.nodata==false?(
				
					
						this.setToolbar()
					
					
					
					
				):(
					<div className="noData">暂无数据</div>
				)}
				
			</div>
		);
	}
}
export { Notice };
