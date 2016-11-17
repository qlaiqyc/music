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
	}		
	
	FunUtil.common4pvid = function(){
		var e;
      	var m_r_r_s ="";
        var t = "";
        return t && t.length > 0 ? m_r_r_s = t : (e = (new Date).getUTCMilliseconds(),
        m_r_r_s = Math.round(2147483647 * Math.random()) * e % 1e10, m_r_r_s)
		
	};
	
	FunUtil.common4ukey = function(callback){
		var url = "http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=3046871496&g_tk=938407465&jsonpCallback=jsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0";
		var param = {"type":"jsonp","data":{"url":url},"callback":callback};
		
		FunUtil.request(param);
		
	};
	
	FunUtil.common4getACSRFToken = function(){
		var  o = {
			        set: function(e, o, t, c, i) {
			            if (i) {
			                var r = new Date;
			                r.setTime(r.getTime() + 36e5 * i)
			            }
			            return document.cookie = e + "=" + escape(o) + "; " + (i ? "expires=" + r.toGMTString() + "; " : "") + (c ? "path=" + c + "; " : "path=/; ") + (t ? "domain=" + t + ";" : "domain=" + n.DCCookieDomain + ";"),
			            !0
			        },
			        get: function(e) {
			            var n, o = function(e) {
			                if (!e)
			                    return e;
			                for (; e != unescape(e); )
			                    e = unescape(e);
			                for (var n = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], o = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], t = 0; t < n.length; t++)
			                    e = e.replace(new RegExp(n[t],"gi"), o[t]);
			                return e
			            }
			            ;
			            return o((n = document.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)"))) ? unescape(n[2]) : "")
			        },
			        del: function(e, o, t) {
			            document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (t ? "path=" + t + "; " : "path=/; ") + (o ? "domain=" + o + ";" : "domain=" + n.DCCookieDomain + ";")
			        },
			        getACSRFToken: function() {
			            function e(e) {
			                for (var n = 5381, o = 0, t = e.length; t > o; ++o)
			                    n += (n << 5) + e.charCodeAt(o);
			                return 2147483647 & n
			            }
			            return e(o.get("skey") || o.get("qqmusic_key"))
			        }
			};
			
		return o.getACSRFToken();	
	};
	
	FunUtil.request = function(param){
		//param{type,data,callback4success,callback4error};
		
		
		var execuFun = {};
		
		execuFun.jsonp = function(){
			//var defurl = "http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=0031vLVS24xr5E&g_tk=1965013919&jsonpCallback=albuminfoCallback&loginUin=374413739&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8"
			//c.y.qq.com/splcloud/fcgi-bin/fcg_getsonglistenstatistic.fcg
			
			var defurl = "http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=0031vLVS24xr5E";//&g_tk=1965013919&inCharset=utf8&outCharset=utf-8"
			
			if(String.HasText(param.data.url)) defurl = param.data.url;
			
			/*$.ajax({  
		        url:defurl,  
		        dataType:'jsonp',  
		        data:'',  
		        charset: "utf-8",
                jsonpCallback: "albuminfoCallback",
		        success:function(result) {  
		        	if(String.HasText(param.callback)) callback(result);
		        },  
		        timeout:3000  
		    });  */
		   
		   	var data = {};
		   	data.data ={};
		    data.data.g_tk = FunUtil.common4getACSRFToken(),
            data.startTime = +new Date,
            data.endTime = 0,
            
            defurl = "bk.i.y.qq.com" == location.host ? defurl.replace("i.y.qq.com", "bk.i.y.qq.com") : defurl,
            defurl = defurl + (defurl.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + FunUtil.common4getACSRFToken(),
		   	
		   	data.url = defurl;
		   
		   $.ajax({  
		        url:defurl,  
		        dataType:'jsonp',  
		        data:data,  
		        charset: "utf-8",
                jsonpCallback: "jsonCallback",
		        success:function(result) {  
		        	if(String.HasText(param.callback)) param.callback(result);
		        },  
		        timeout:3000  
		    });  
		};
		
		
		execuFun.get = function(){
			
			var defurl = "http://wspeed.qq.com/w.cgi?appid=1000217&releaseversion=yqq1&commandid=play_error_yqq&resultcode=0&touin=0&tmcost=0&frequency=1&detail=OnPlayBegin,songid=109187830.%20&rmd=1478958201271";
			try{
				if(String.HasText(param.data.url)) defurl = param.data.url;	   
			}catch(e){
				//TODO handle the exception
			}
		   $.ajax({  
		        url:defurl,  
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
			
			var callback = function(data){
				//
				var url = "http://wspeed.qq.com/w.cgi?appid=1000217&releaseversion=yqq1&commandid=play_error_yqq&resultcode=0&touin=0&tmcost=0&frequency=1&detail=OnPlayBegin,songid=109187830.%20&rmd=1478958201271";
				 
				
				FunUtil.request({"type":"jsonp"});
				var turl = "http://pingfore.qq.com/pingd?dm=y.qq.com&url=/portal/player.html&rdm=y.qq.com&rurl=/portal/player.html&rarg=-&pvid=5939951214&scr=1366x768&scl=24-bit&lang=zh-cn&java=1&pf=Win32&tz=-8&flash=22.0%20r0&ct=-&vs=tcsso.3.1.5&ext=rf%3DADTAGsearch%3Btm%3D4&hurlcn=ad%3Dy.qq.com%3Bau%3D/portal/player.html&rand=78942&reserved1=1505&tt=";
				
				FunUtil.request({"type":"jsonp","data":{"url":"https://tajs.qq.com/stats?sId=58495963&_=1478959492468"},})
				
				var href  = "http://dl.stream.qqmusic.qq.com/C200003eIfnb2U2var.m4a?vkey=" + data.key + "&guid=" + FunUtil.common4pvid();
				$("#h5audio_media").attr("src",href);
				FunUtil.request({"type":"jsonp","data":{"url":turl},})
			};
                   
			FunUtil.common4ukey(callback);
		    
		    //
			//console.log(FunUtil.common4pvid());
			
		});
		
		
		
	};
	
	
	PageObj.init4pub = function(){
		FunUtil.common4init();
		PageObj.init4menu();
	};
	
	
	PageObj.init4pub();
	
};



PageInfo.init();

