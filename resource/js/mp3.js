 	 var PageInfo = {};
	
	PageInfo.init = function(){
		
		var HtmUtil = {};
		var FunUtil = {};
		var PageObj = {};
		
		
		FunUtil.common4init = function(){
	 			
	 			String.HasText = function(str) {
					try{
					
					if (typeof(str) == "undefined") return false;
					if (str == null) return false;
					if (str == 'null') return false;
					if (str == 'undefined') return false;
				
					if (typeof(str) == 'string')
						str = str.replace(/(^\s*)|(\s*$)/g, '');
					if (str === '') return false;
					
					}catch(e){
						return false;
					}
					return true;
				};
				
				String.getActualLength = function() {
			        return this.replace(/[^\x00-\xff]/g,"xx").length;
			    };
		};
		
		FunUtil.common4Guid = function() {
	        var e;
	        var m_r_r_s ="";
	        if (m_r_r_s.length > 0)
	            return m_r_r_s;
	        var t = "";
	        return t && t.length > 0 ? m_r_r_s = t : (e = (new Date).getUTCMilliseconds(),
	        m_r_r_s = Math.round(2147483647 * Math.random()) * e % 1e10,
	        
	        m_r_r_s)
    	}
		
		
		
	 
		
	 
		FunUtil.request = function(param){
			//param{type,data,callback4success,callback4error};
			
			
			var execuFun = {};
			
			execuFun.jsonp = function(){
				 
			   
			   $.ajax({  
			        url:param.data.url,  
			        dataType:'jsonp',  
			        charset: "utf-8",
	                jsonpCallback: param.data.callname,
			        success:function(result) {  
			        	if(String.HasText(param.callback)) param.callback(result);
			        },  
			        timeout:3000  
			    });  
			};
			
			
			execuFun.get = function(){
				
			   $.ajax({  
			        url:param.data.url,  
			        dataType:'post',  
			        charset: "utf-8",
			        success:function(result) {  
			        	if(String.HasText(param.callback)) param.callback(result);
			        },  
			        timeout:3000  
			    });  
			
			}
			
			
			execuFun[param.type]();
		};
		
		PageObj.init4menu = function(){
			
			var $main = $("#music-main-body-menu");
			var $item = $main.find("div.music-main-body-menu-item");
			
			$item.unbind("click").bind("click",function(){
				
				$item.removeClass("active");
				$(this).addClass("active");
				
				
				
				
			var url = "http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=003T8bSi1ADxDl&g_tk=938407465&jsonpCallback=albuminfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
			var callback = function(data){
				
				 console.log(data);
			};
			
			FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"albuminfoCallback"},"callback":callback})
			
				//console.log(FunUtil.common4pvid());
				
			});
			
			
			
		};
		
		PageObj.init4center = function(){
			
			var $main 	= $("#music-main-body-center");
		    var $table	= $("#music-main-body-center-table");
		    var $play  = $("#music-main-foot-play");
		    
		   	var swiper = new Swiper('.swiper-container', {
			        nextButton: '.swiper-button-next',
			        prevButton: '.swiper-button-prev',
			        pagination: '.swiper-pagination',
			        paginationType: 'fraction'
			});
			// 获取songid
			var url = "http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=003ABX6Y0EqDPC&g_tk=938407465&jsonpCallback=albuminfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
			var callback = function(data){
				
				$table.xdntable({
	 				height:"auto",
	 				align:"left",
	 				colors:[],
			 		columns:[		 {title:"",	width:"10%",filed:""},
			 						 {title:"歌名",	width:"40%",filed:"songname",formatter:function(obj,value){return '<div class="music-song" data-songid="'+obj.songid+'" data-smid="'+obj.songmid+'">'+value+'</div>'}},
					 				 {title:"歌手",	width:"30%",filed:"singer",formatter:function(obj,value){return obj.singer[0].name}},
					 				 {title:"时间",	width:"20%",filed:"interval",formatter:function(obj,value){return ("0"+parseInt(value/60) +":"+value%60)}},
					 	 	],
			 		data:data.data.list
				});
				
				$main.find("div.music-song").unbind("click").bind("click",function(){
					var $this = $(this);
					
					//var src = "http://stream17.qqmusic.qq.com/"+(parseInt($this.data("songid"))+3e7)+".mp3";
					var src = "http://ws.stream.qqmusic.qq.com/C200"+$this.data("smid")+".m4a?vkey="+localStorage.getItem("key")+"&guid="+localStorage.getItem("guid")+"&fromtag=30";
					
					$play.attr("src",src).attr("autoplay","autoplay");
					
					
					var url = "http://c.y.qq.com/tplcloud/fcgi-bin/fcg_reportlsting_web.fcg?musicid="+$this.data("songid")+"&isexit=false&g_tk=938407465&_r="+(new Date()).valueOf();
					
					FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"albuminfoCallback"}})
					
				});
				
				
			};
			
			
			
			FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"albuminfoCallback"},"callback":callback})
			
			
			
			
		};
		
		
		PageObj.init4pub = function(){
			FunUtil.common4init();
			
			var guid = FunUtil.common4Guid();
			
			var url = "http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid="+guid+"&g_tk=938407465&jsonpCallback=jsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0";
			FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"jsonCallback"},"callback":function(data){
				localStorage.setItem("key",data.key);
				localStorage.setItem("guid",guid);
				
				PageObj.init4menu();
				PageObj.init4center();
			}});
			
			
		};
		
		
		PageObj.init4pub();
		
	};
	
	PageInfo.init();
