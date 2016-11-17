 	 var PageInfo = {};
	
	PageInfo.init = function(){
		
		var HtmUtil = {};
		var FunUtil = {};
		var PageObj = {};
		
		HtmUtil.ranking = function(data){
			var buf = [];
			var len = data.length;
			
			for(var i = 0 ;i<len; i++){
				var obj = data[i];
				
				if(obj.topID ==4 || obj.topID == 30 || obj.topID == 201) continue
				
				buf.push('<div class="music-ranking-head-item '+(i==3?"active":"")+'"  data-topid="'+obj.topID+'">'+obj.ListName.split("·")[1]+' </div>');
				
			};
			
			return buf.join("");
			
		};
		
		HtmUtil.select4model = function(data){
			var buf = [];
			var len = data.length;
			
			
			buf.push('<div class="muscic-select-model">');
			buf.push('	<div class="muscic-select-model-title">热门推荐</div>');
			buf.push('	<div class="muscic-select-model-content">');
			
			for(var i =0 ;i<len ;i++){
				var obj = data[i];
				
				buf.push('		<div class="muscic-select-model-item" data-dissid="'+obj.dissid+'">');
				buf.push('			<div class="muscic-select-model-item-pic">');
				buf.push('				<img src="'+obj.imgurl+'" />');
				buf.push('			</div>');
				buf.push('			<div class="muscic-select-model-item-name">'+obj.dissname+'</div>');
				buf.push('			<div class="muscic-select-model-item-author">'+obj.author+'</div>');
				buf.push('		</div>');
			}
			
			
			buf.push('	</div>');
			buf.push('</div>');
			
			return buf.join("");
		};
		
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
			
			execuFun[param.type]();
		};
	
		FunUtil.common4url = function(data){
			
			var execuFun = {};
			
			
			execuFun.hot = function(){
				//获取热门 dissid 集合
				
				var i 	= (Math.random() + "").replace("0.", "");
          		var url = "https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?format=jsonp&tpl=v12&page=other&callback=GetRecomListCallback" + i + "&rnd=" + i;
       
				FunUtil.request({"type":"jsonp","data":{"url":url,"callname":("MusicJsonCallback")},"callback":data.callback});
				
			};
			execuFun.blend = function(){
				//根据dissid  获取专辑（拼凑的专辑）  返回对像有 songid songmid + albummid
				var url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid="+data.disstid+"&format=jsonp&g_tk=938407465&jsonpCallback=playlistinfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
				FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"playlistinfoCallback"},"callback":data.callback});
			}
			
			execuFun.ukey = function(){
				//随机生成 guid 和key
				
				var guid = FunUtil.common4Guid();
			
				var url = "http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid="+guid+"&g_tk=938407465&jsonpCallback=jsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0";
				FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"jsonCallback"},"callback":function(parm){
					localStorage.setItem("key",parm.key);
					localStorage.setItem("guid",guid);
					
					data.callback();
				}});
			};
			
			execuFun.albummid = function(){
				/*
				 * 根据albummid 获取专辑音乐（原始的专辑）
				 * 获取songid+songmid
				 * */
				var url = "http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid="+data.albummid+"&g_tk=938407465&jsonpCallback=albuminfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
				//var src = "http://ws.stream.qqmusic.qq.com/C200"+$this.data("smid")+".m4a?vkey="+localStorage.getItem("key")+"&guid="+localStorage.getItem("guid")+"&fromtag=30";
				FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"albuminfoCallback"},"callback":data.callback})
			
			};
			
			execuFun.ranking = function(){
				//获取所有排行榜类型  主要是topid
				
				var url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1&jsonCallback=jsonCallback";
				
				FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"jsonCallback"},"callback":data.callback})
			};
			
			execuFun.rankingsong = function(){
				/*
				 * 获取排行榜前100首歌曲
				 *  热歌(占时忽略)、新歌topid=27、网络歌曲、内地、港台、日本
				 * 这个接口逻辑稍微有些复杂
				 * date 有两种类型， （热歌  当前日期- 1天）（当前年费_（第几周-1））
				 * 默认加载0到100条（自己写）
				 * */
				var param = "";
				var d= new Date();
				if(data.topid == 27) {
					param =	d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()-1);
				}else{
					param = d.getFullYear()+"_"+(FunUtil.common4getweek()-1);
					
				}
				
				var url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date="+param+"&topid="+data.topid+"&type=top&song_begin=0&song_num=100&g_tk=5381&jsonpCallback=MusicJsonCallbacktoplist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
				FunUtil.request({"type":"jsonp","data":{"url":url,"callname":"MusicJsonCallbacktoplist"},"callback":data.callback})
			
			};
			
			execuFun[data.type]();
		};
	 	
	 	FunUtil.common4getweek = function(){
	 		/*得到当前是当年第几周*/
		    var totalDays = 0;
		    now = new Date();
		    years = now.getYear()
		    if (years < 1000)
		        years += 1900
		    var days = new Array(12);
		    days[0] = 31;
		    days[2] = 31;
		    days[3] = 30;
		    days[4] = 31;
		    days[5] = 30;
		    days[6] = 31;
		    days[7] = 31;
		    days[8] = 30;
		    days[9] = 31;
		    days[10] = 30;
		    days[11] = 31;
		     
		    //判断是否为闰年，针对2月的天数进行计算
		    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
		        days[1] = 29
		    } else {
		        days[1] = 28
		    }
		 
		    if (now.getMonth() == 0) {
		        totalDays = totalDays + now.getDate();
		    } else {
		        var curMonth = now.getMonth();
		        for (var count = 1; count <= curMonth; count++) {
		            totalDays = totalDays + days[count - 1];
		        }
		        totalDays = totalDays + now.getDate();
		    }
		    //得到第几周
		    var week = Math.round(totalDays / 7);
		    return week;
	 		
	 		
	 	}
		
		FunUtil.common4show = function(type){
			
 			var list = ["select","play","hot","ranking"];
			var len  = list.length;
			
			for(var i =0;i<len;i++){
				 if(list[i] == type ){
				 	$("#music-"+list[i]).show();
				 
				 }else{
				 	$("#music-"+list[i]).hide();
				 }
			}
			
		};
		
		FunUtil.common4paly = function(url){
			
			$("#music-main-foot-play").attr("src",url).attr("autoplay","autoplay");
			
			
		};
	 	
	 	PageObj.init4ranking = function(){
	 		FunUtil.common4show("ranking");
	 		
	 		var $main 	= $("#music-ranking");
	 		var $head 	= $main.find("div.music-ranking-head");
	 		var $table 	= $("#music-ranking-table");
	 		
	 		var execuFun = {};
	 		
	 		execuFun.getList = function(param){
	 			
	 			var callback = function(data){
	 				
	 				var list = data.songlist;
	 				var result = [];
	 				var len = list.length;
	 				
	 				for(var i=0;i<len;i++) result.push(list[i].data);
	 				 
	 				$table.xdntable({
			 				height:"auto",
			 				align:"left",
			 				colors:[],
					 		columns:[		 {title:"",	width:"2%",filed:""},
					 						 {title:"歌名",	width:"48%",filed:"songname",formatter:function(obj,value){return '<div class="muscic-play-item" class="music-song" data-songid="'+obj.songid+'" data-smid="'+obj.songmid+'" data-albummid="'+obj.albummid+'">'+value+'</div>'}},
							 				 {title:"歌手",	width:"30%",filed:"singer",formatter:function(obj,value){return obj.singer[0].name}},
							 				 {title:"时间",	width:"20%",filed:"interval",formatter:function(obj,value){return ("0"+parseInt(value/60) +":"+value%60)}},
							 	 	],
					 		data:result
					});
					
					$table.find("div.muscic-play-item").unbind("click").bind("click",function(){
	 					
	 					var $this = $(this);
	 					$table.find("div.color-blud").removeClass("color-blud");
	 					$this.addClass("color-blud");
	 					
	 					var src = "http://ws.stream.qqmusic.qq.com/C200"+$this.data("smid")+".m4a?vkey="+localStorage.getItem("key")+"&guid="+localStorage.getItem("guid")+"&fromtag=30";
					
						FunUtil.common4paly(src);
	 					
	 				});
	 				
	 			};
	 			
				FunUtil.common4url({"type":"rankingsong","topid":param.topid,"callback":callback});		
	 			
	 		};
	 		
	 		
	 		var callback = function(data){
	 			
	 			
	 			$head.html(HtmUtil.ranking(data[0].List));
	 			$head.find("div.music-ranking-head-item").unbind("click").bind("click",function(){
	 				$head.find("div.active").removeClass("active");
	 				var $this = $(this);
	 				
	 				$this.addClass("active")
	 				execuFun.getList({"topid": $this.data("topid")});
	 			});
	 			
	 			$head.find("div.active").trigger("click");
	 			
	 		};
	 		
	 		
	 		FunUtil.common4url({"type":"ranking","callback":callback});
	 		
	 		
	 		
	 		
	 	};
	 	
	 	PageObj.init4play = function(param){
	 		FunUtil.common4show("play");
	 		
	 		var $main = $("#music-play");
	 		var $table = $("#muisc-play-table");
	 		
	 		var execuFun = {};
	 		//混合
	 		execuFun.blend 		= function(){
	 			
	 			var callback = function(data){
	 				$main.find("div.muisc-play-head").html();
	 				
	 				var list = data.cdlist[0].songlist;
	 				
	 				$table.xdntable({
			 				height:"auto",
			 				align:"left",
			 				colors:[],
					 		columns:[		 {title:"",	width:"2%",filed:""},
					 						 {title:"歌名",	width:"48%",filed:"songname",formatter:function(obj,value){return '<div class="muscic-play-item" class="music-song" data-songid="'+obj.songid+'" data-smid="'+obj.songmid+'" data-albummid="'+obj.albummid+'">'+value+'</div>'}},
							 				 {title:"歌手",	width:"30%",filed:"singer",formatter:function(obj,value){return obj.singer[0].name}},
							 				 {title:"时间",	width:"20%",filed:"interval",formatter:function(obj,value){return ("0"+parseInt(value/60) +":"+value%60)}},
							 	 	],
					 		data:list
					});
	 				
	 				
	 				$table.find("div.muscic-play-item").unbind("click").bind("click",function(){
	 					
	 					var $this = $(this);
	 					$table.find("div.color-blud").removeClass("color-blud");
	 					$this.addClass("color-blud");
	 					
	 					var src = "http://ws.stream.qqmusic.qq.com/C200"+$this.data("smid")+".m4a?vkey="+localStorage.getItem("key")+"&guid="+localStorage.getItem("guid")+"&fromtag=30";
					
						FunUtil.common4paly(src);
	 					
	 				});
	 				
	 				
	 			};
	 			
	 			FunUtil.common4url({"type":"blend","disstid":param.disstid,"callback":callback});
	 			
	 			
	 		};
	 		//原始
	 		execuFun.primeval 	= function(){
	 			
	 			
	 			
	 			
	 			
	 		};
	 		
	 		
	 		
	 		//根据专辑ID  获取歌曲集合
	 		
	 		 
	 		
	 		execuFun[param.type]();
	 	};
		
		PageObj.init4menu = function(){
			
			var $main = $("#music-main-body-menu");
			var $item = $main.find("div.music-main-body-menu-item");
			
			$item.unbind("click").bind("click",function(){
				var $this = $(this);
				
				$item.removeClass("active");
				$this.addClass("active");
				try{
					
				PageObj["init4"+$this.data("type")]();
				}catch(e){
					//TODO handle the exception
				}
			});
			$main.find("div.active").trigger("click");
			
			
		};
		
		
		PageObj.init4select = function(){
			FunUtil.common4show("select");
			var $main = $("#music-select");
			var $hot  = $("#muscic-select-model");
			
			var callback = function(data){
				$hot.html(HtmUtil.select4model(data.data.hotdiss.list));
				
				$hot.find("div.muscic-select-model-item").unbind("click").bind("click",function(){
					
					PageObj.init4play({"type":"blend","disstid":$(this).data("dissid")});
					
				});
			};
			
			FunUtil.common4url({"type":"hot","callback":callback});
		};
		
		
		
		PageObj.init4hot = function(){};
		PageObj.init4sort = function(){};
		PageObj.init4type = function(){};
		PageObj.init4self = function(){};
		
		
		
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
			
		};
		
		
		PageObj.init4pub = function(){
			FunUtil.common4init();
			
			FunUtil.common4url({"type":"ukey","callback":function(){
				PageObj.init4menu();
				PageObj.init4center();
			}});
		};
		
		
		PageObj.init4pub();
		
	};
	
	PageInfo.init();
