(function(win) {
	
	'use strict';
	var already = false; // 是否已初始化
	var config = null; // 缓存config参数
	// 方法列表
	var METHODS = [ 'device.image.getCamera', 'device.image.getImage',
			'biz.contact.selectContact', 'biz.contact.selectContactMulti',
			'device.map.getLocation', 'device.map.getCurrentLocation', 
			'biz.message.sendShortMessage','biz.contact.joinGroupChat','biz.contact.makeCall','biz.contact.consultService','biz.contact.share','biz.message.setAppTitle','biz.chat.createChat','yqx.biz.user.showUserDetail' ];
	
	var yqx = {				
		ios : (/iphone|ipad|ipod/).test(navigator.userAgent.toLowerCase()),
		android : (/android/).test(navigator.userAgent.toLowerCase()),
		_callback : {},
		_callobject : {},
		// 这里对用户传进来的参数进行过滤
		config : function(obj) {
			if (!obj) {
				return;
			}
			// TODO: 参数名待确认
			config = {
				corpId : obj.corpId,
				agentId : obj.agentId || -1,
				timeStamp : obj.timeStamp,
				nonceStr : obj.nonceStr,// 保留签名的字段
				jsApiList : obj.jsApiList
			// ，需要使用的jsapi列表，注意：不要带yqx

			};
			if (obj.agentId) {
				config.agentId = obj.agentId;
			}
		},

		
		ready : function(callback) {
			// 总控
			var fn = function(bridge) {
				if (!bridge) {
					return console.log('bridge初始化失败')
				}
				// callback(bridge);
				// TODO: 判断config，进行权限校验
				if (config === null) {
					// console.log('没有配置yqx.config')
					callback(bridge);
				} else {
					// console.log('配置了yqx.config', config)
					// 权限校验
					if (yqx.ios) {

					} else if (yqx.android) {

					}
				}
				// callback(bridge);
				// 第一次初始化后要做的事情
				if (already === false) {
					already = true;
					// 自定义事件

					if (config === null) {
						var conf = {
							url : encodeURIComponent(window.location.href),
							js : JSSDK_VERSION,
							cid : config && config.corpId || ''
						};
						// 打点
						yqx.biz.util.ut({
							key : 'yqx_open_js_monitor',
							value : JSON.stringify(conf),
							onSuccess : function(res) {
								// console.log('yqx_open_js_monitor ut打点成功',
								// res);
							}
						});
					}
				}
			};
			// 已经完成初始化的情况
			if (yqx.ios) {
				// _generator("biz.util.getCamera",callback);
			} else if (yqx.android) {

			}
			// 初始化主流程
			if (yqx.ios) {

			} else if (yqx.android) {

			} else {
				return console.log('很抱歉，尚未支持您所持设备');
			}

		}

	}

	// 注册命名空间,"device.notification.alert"生成yqx.device.notification.alert
	var ns = function(method, fn) {
		var arr = method.split('.');
		var namespace = yqx;
		for (var i = 0, k = arr.length; i < k; i++) {
			if (i === k - 1) {
				namespace[arr[i]] = fn;
			}
			if (typeof namespace[arr[i]] === 'undefined') {
				namespace[arr[i]] = {};
			}
			namespace = namespace[arr[i]];
		}
	};
	var _init;
	win._init = function(){
		var ua=navigator.userAgent.toLowerCase()
		if (/iphone|ipad|ipod/.test(ua)) {
			 var iframe = document.createElement('iframe');
			 iframe.setAttribute('src', 'js-call://WebContainer');
			 document.documentElement.appendChild(iframe);
			 iframe.parentNode.removeChild(iframe);
			 iframe = null;
		} else if (/android/.test(ua)) {
			if(window.WebContainer) { 
				navigator.WebContainer = window.WebContainer;
			}
		} else if (/desktop/.test(ua)) {
			
		} else {
			alertMsg("请从客户端打开");
		}
			
		
	}
	// 设置默认属性
	function setDefaultValue(obj, defaults, flag) {
		for ( var i in defaults) {
			if (flag) {
				obj[i] = defaults[i];
			} else {
				obj[i] = obj[i] !== undefined ? obj[i] : defaults[i];
			}
		}
	}

	var _generator;
	win._generator = function(method, param) {
		// 门神位置
		// if (typeof WebViewJavascriptBridge === 'undefined') {
		// return console.log('WebViewJavascriptBridge未定义，请在云企信APP打开该页面');
		// }
		// 开始干活
		yqx._callobject = param || {};
		var p = param || {};
		var successCallback = function(res) {
			console.log('默认dd.ready成功回调', method, res);
		};
		var failCallback = function(err) {
			console.log('默认失败回调', method, err)
		};
		var cancelCallback = function() {
		};
		if (p.onSuccess) {
			successCallback = p.onSuccess;
			delete p.onSuccess;
		}
		if (p.onFail) {
			failCallback = p.onFail;
			delete p.onFail;
		}
		// 统一回调处理
		var callback = function(response) {
			// console.log('统一响应：', response);
			var data = response || {};
			var code = data.errorCode;
			var result = data.result;
			if (code === '0') {
				successCallback && successCallback.call(null, result);
			} else if (code === '-1') {
				cancelCallback && cancelCallback.call(null, result);
			} else {
				failCallback && failCallback.call(null, result, code);
			}
		};
		
		if (method == "backId" || !isNaN(method)) {
			setTimeout(function() {
				callback({
					errorCode : '0',
					errorMessage : '成功',
					result : yqx._callback
				});
				// 回传给客户端，可选
				responseCallback && responseCallback({
					errorCode : '0',
					errorMessage : '成功'
				});
			}, 10)
			return;
		}
		
		var watch = false; // 是否为监听操作， 如果是监听操作，后面要注册事件
		// 前端包装
		switch (method) {
		case 'device.image.getCamera':
			watch = true;
			break;
		case 'device.image.getImage':
			watch = true;
			break;
		case 'device.getLocation':
			watch = true;
			break;
		case 'biz.contact.selectContact':
			watch = true;
			break;
		case 'device.getCurrentLocation':
			watch = true;
			break;
			
		case 'biz.chat.createChat':
			watch = true;
			break;
		case 'biz.conference.createConference':
				watch = true;
				break;
		case 'biz.user.showUserDetail':
			watch = true;
			break;
			
		case 'biz.message.sendShortMessage':
			watch = true;
			break;
		case 'biz.message.setAppTitle':
			watch = true;
		case 'biz.contact.joinGroupChat':
			watch = true;
			break;
		case 'biz.contact.makeCall':
			watch = true;
			break;
		case 'biz.contact.consultService':
			watch = true;
			break;
		case 'biz.contact.share':
			watch = true;
			break;
		
		}
		
		// 判断回调
		  {
			// 消息接入：android和iOS区分处理
			 if (yqx.ios||yqx.android) {
			 	
				var arr = method.split('.');
				var suff = arr.pop();
				var pre = arr.join('.');
				var params = p || {};
				params.onSuccess = successCallback;
				params.onFail = failCallback;
				// console.log(method, p, callback)
				
				if (watch) {
					
					if (suff == "getCurrentLocation") {
						 alert("getCurrentLocation之前 ");
						navigator.WebContainer.getCurrentLocation("backId",
								"_appCallbackLocation");
						 alert("getCurrentLocation 之后");
					} else if (suff == "getLocation") {
						navigator.WebContainer.getLoction("backId",
								"_appCallbackLocation");
					} else if (suff == "selectContact") {
						 alert("backId ");
						navigator.WebContainer.selectContact("backId",
								"_appCallbackLocation");
					} else if (suff == "getImage") {
						navigator.WebContainer.getImage("suff", "backId",
								"_appCallbackLocation");
					} else if (suff == "getCamera") {
						navigator.WebContainer.getCamera("backId",
								"_appCallbackLocation");
					} else if (suff == "createChat") {
						navigator.WebContainer.createChat();
					} else if (suff == "createConference") {
						navigator.WebContainer.createConference();
					} else if (suff == "showUserDetail") {
						navigator.WebContainer.showUserDetail(p.userId);
					} else if (suff == "sendShortMessage") {
						navigator.WebContainer.sendShortMessage();
					} else if (suff == "setAppTitle") {
						
						var timestamp = (new Date()).valueOf();
						console.log(timestamp);
						callAppFunction("setAppTitle",timestamp,p.params);
					} else if (suff == "joinGroupChat") {
						var timestamp = (new Date()).valueOf();
						console.log(timestamp);
						callAppFunction("joinGroupChat",timestamp,p.params);
					} else if (suff == "makeCall") {
						var timestamp = (new Date()).valueOf();
						console.log(timestamp);
						callAppFunction("makeCall",timestamp,p.params);
					} else if (suff == "consultService") {
						var timestamp = (new Date()).valueOf();
						console.log(timestamp);
						callAppFunction("consultService",timestamp,p.params);
					} else if (suff == "share") {
						var timestamp = (new Date()).valueOf();
						console.log(timestamp);
						callAppFunction("share",timestamp,p.params);
					} 
					
				} else {
					navigator.WebContainer.suff("backId",
							"_appCallbackLocation");
				}
			}

		}
	}
	// 动态生成api
	METHODS.forEach(function(method) {
		ns(method, function(param) {
			win._generator(method, param);
		});
	});

	yqx.__ns = ns;

	win.yqx = yqx;

	yqx.device = {}; // 第二级域名
	yqx.biz = {}; // 第二级域名

	yqx.biz.message = {}; // 第三级域名
	yqx.biz.contact = {}; // 第三级域名	
	yqx.biz.chat = {}; // 第三级域名
	yqx.biz.conference = {}; // 第三级域名
	yqx.biz.user = {}; // 第三级域名
	yqx.biz.util = {}; // 第三级域名

	yqx.device.map = {}; // 第三级域名
	yqx.device.image = {}; // 第三级域名
	
	function callAppFunction(methods, methodid, paramss) {
		//alert('callAppFunction调用测试' + methods + methodid+paramss);
		
		
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			var parameters = {
				method : methods,
				methodId : methodid,
				params : paramss
			}

//			alert("handlerInterface调用");

			var dic = {
				'handlerInterface' : "appFunction",
				'function' : "callAppFunction",
				'parameters' : parameters
			};
//			alert("2");
			window.webkit.messageHandlers.appFunction.postMessage(dic);
//			alert("3");

		} else {
			appFunction.callAppFunction(methods, methodid, JSON
					.stringify(paramss));

		}
	}

	/**
	 * 1.获取地理位置
	 */
	yqx.device.getLocation = function(backFunc) {

		win._generator("device.getLocation", backFunc);

	}
	/**
	 * 2.获取当前地理位置
	 */
	yqx.device.getCurrentLocation = function(backFunc) {

		win._generator("device.getCurrentLocation", backFunc);
	}
	/**
	 * 3.获取通讯录单选功能
	 */
	yqx.biz.contact.selectContact = function(backFunc) {

		win._generator("biz.contact.selectContact", backFunc);

	}
	/**
	 * 4.获取通讯录多选功能
	 */
	yqx.biz.contact.selectContactMulti = function(backFunc) {
		win._generator("biz.contact.selectContactMulti", backFunc);
	}
	/**
	 * 5.获取拍照图片功能
	 */

	yqx.device.image.getImage = function(backFunc) {
		win._generator("device.image.getImage", backFunc);

	}
	/**
	 * 6.获取拍照功能
	 */
	yqx.device.image.getCamera = function(backFunc) {
		win._generator("device.image.getCamera", backFunc);
	}
	/**
	 * 7.关闭app功能
	 */
	yqx.biz.util.closeApp = function(backFunc) {

		win._generator("biz.util.closeApp", backFunc);

	}
	/**
	 * 8.发起会话接口
	 */
	yqx.biz.chat.createChat = function(backFunc) {

		win._generator("biz.chat.createChat", backFunc);
	}
	/**
	 * 9.发起电话会议接口
	 */
	yqx.biz.conference.createConference = function(backFunc) {

		win._generator("biz.conference.createConference", backFunc);
	}
	/**
	 * 10.获取名片详情接口
	 */
	yqx.biz.user.showUserDetail = function(backFunc) {

		win._generator("biz.user.showUserDetail", backFunc);
	}
	/**
	 * 11.群发短信接口
	 */
	yqx.biz.message.sendShortMessage = function(backFunc){

		win._generator("biz.message.sendShortMessage", backFunc);
	}
	/**
	 * 12.设置头部标题
	 */
	yqx.biz.message.setAppTitle = function(backFunc) {
		
		win._generator("biz.message.setAppTitle", backFunc);
		
	}
	/**
	 * 13.加入群聊
	 */
	yqx.biz.contact.joinGroupChat = function(backFunc) {
		
		win._generator("biz.contact.joinGroupChat", backFunc);
		
	}
	/**
	 * 14.打电话
	 */
	yqx.biz.contact.makeCall = function(backFunc) {

		win._generator("biz.contact.makeCall", backFunc);
	}
	/**
	 * 15.咨询客服
	 */
	yqx.biz.contact.consultService = function(backFunc) {

		win._generator("biz.contact.consultService", backFunc);
	}
	/**
	 * 16.分享
	 */
	yqx.biz.contact.share = function(backFunc) {

		win._generator("biz.contact.share", backFunc);
	}
	// 国际范儿
	if (typeof module === 'object' && module
			&& typeof module.exports === 'object') {
		module.exports = yqx;
	} else if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(function() {
			return yqx;
		})
	}

}(this));

/**
 * 统一的回调
 */

appFunctionCallback=function(method,  methodId,  success,  data){
	
//	if(success){
//		
//		_appCallbackLocation(method,data);
//	}
}

_appCallbackLocation = function(backId, Loction) {
	yqx._callback = Loction;
	_generator("backId", yqx._callobject);
	delete yqx._callobject;
}
