 
    
      	
  	function StringBuffer() {
		this.content = new Array;
	};
	StringBuffer.prototype.append = function(str) {
		this.content.push(str);
	};
	StringBuffer.prototype.prepend = function(str) {
		this.content.unshift(str);
	};
	StringBuffer.prototype.toString = function() {
		return this.content.join("");
	};	

(function($) {
	
	/****** 全局变量***********/
  		/****** 全局变量***********/
  	
  	
	
  	var PageInfo = {};
  	
  	
   PageInfo.init = function(option){
  		var FunUtil = {};//对内的工具类
	  	var HtmUtil = {};//对内的Html
	  	var PageObj	= {};//对外暴露的方法
	  	
	  	var $table =  this;
	  	var $head,$content,$foot;
	  	
	  	/*************HtmUtil 工具类************************** */
	  	
	  	HtmUtil.init = function(){
	  		var buf  	= new StringBuffer();
	  		
	  		buf.append('<div class="plug-table">         ');
			buf.append('   <div class="plug-table-head" style="width:100%"> ');
			buf.append('    <table style="width:100%">  <thead> </thead></table>              ');
			buf.append('   </div>                        ');
			buf.append('   <div class="plug-table-body"> ');
			buf.append('    <table style="width:100%"><thead> </thead>  <tbody> </tbody></table>              ');
			buf.append('   </div>                        ');
			buf.append('   <div class="plug-table-foot"> ');
			buf.append('    <table></table>              ');
			buf.append('   </div>                        ');
			buf.append('</div>							');
				  		
	  		return buf.toString();
	  	};
	  	
	  	HtmUtil.addTrs = function(option){
	  		var data 	= option.param.data;
	  		var columns = option.columns;
	  		var len4data= data.length;
	 		var len4col = columns.length;
	 		var buf  	= new StringBuffer();
	  		
	  		var id4index= FunUtil.indexMax(); 
	  		
	  		if(len4data === 0) return;
	 		
		 	for(var i =0 ;i<len4data;i++){
		 		
		 		var obj = data[i];
		 		
		 		buf.append('<tr  data-index="'+id4index+'">');  //主要是针对，delete  update  append prepend
		 		id4index  = FunUtil.indexNum(id4index);
		 		
		 		for(var j=0;j<len4col;j++){
					
					var value = "";
					
					try{ String.HasText(obj[columns[j].filed]) ? value = obj[columns[j].filed] : value = ""; }catch(e){ };
					try{ value = columns[j].formatter(obj,value); }catch(e){};
					
		 			buf.append('<td style="'+FunUtil.setcss({"columns":columns[j].width,"align":option.align})+'">'+value+'</td>')
		 		}
		 		
		 		buf.append('</tr>');
		 	}
	  		
	  		
	  		return buf.toString();
	  	};
	  	
	  	/*************FunUtil 工具类************************** */
	  	
	  	FunUtil.Glob = function(key,value){
	  		
	  		if(!String.HasText(value)) return $table.data(key);
	  		$table.data(key,value);
	  	};
	  	
		 
		 FunUtil.setcss = function(param){
		 	var width 	= param.columns;
		 	var align  = param.align;
		 	
		 	var setcss = "padding-left: 16px;width:"+(String.HasText(width) ? width:"50%")+";text-align:"+(String.HasText(align) ? align:"");
	 			
	 		return setcss;
		 };
		 
		
		FunUtil.setBaseOption	= function(option){
	  		
	  			/*self.data	= option.data;
			    self.colors	= option.colors;
			    self.columns= option.columns;*/
	  	};
	  	
	  	FunUtil.isFunction 		= function(option) {
	  		var fn = {};
	  		var method,data;
	  		
	  		try{
	  			for(var p in option){ method = p; data   = option[p]; return; }
	  			
	  			if(String.HasText(method)) fn = methods[method]();
	  		}catch(e){
	  			//TODO handle the exception
	  		}
	  		
	    	return (!!fn&&!fn.nodename&&fn.constructor!=String&&fn.constructor!=RegExp&&fn.constructor!=Array&&/function/i.test(fn+""));
		}
	  	
	  	//判断index 值
	  	
	  	FunUtil.indexNum	= function(index){
	  		var  list  = (index+"").split("-");
	  		var  len   = list.length;
	  		var  value = list[len-1];
	  		
	  		if(value == 9 || len ==1) {
				list.push("1")
		  	}else{
	  			list[list.length-1] = (parseInt(value)+1);
		  	};
	  		
	  		return list.join("-");
	  	}
	  	
	  	
	  	
	  	FunUtil.indexMax	= function(){
	  		
	  		var Map = FunUtil.cache4get().Map;
	  		var max = 0;
	  		
	  		for(var p in Map){
	  			
	  			max = Math.max(max,parseInt(p));
	  		};
	  		
	  		return (max+1);
	  	}
	  	//得到缓存数据
	  	FunUtil.cache4get = function(){
	  		
	  	  return $table.data("option");
	  	};
	  	FunUtil.cache4getLen = function(){
	  		
	  	  return $table.data("option").data.length;
	  	};
	  	
	  	/****************更新数据缓存****************/
	  	
	  	FunUtil.cache4init = function(option){
	  		var Map = {};
	  		
	  		var data = option.param;
	  		
	  		$(data).each(function(i,obj){
	  			Map[i] = obj;
	  		});
	  		
	  		option.Map = Map;  
	  		
	  		$table.data("option",option);
	  	};
	  	
	  	FunUtil.cache4append = function(option){
	  		var cache 	= FunUtil.cache4get();
	  		var Map 	= cache.Map;
	  		var data 	= cache.data;
	  		var obj 	= option.param.data[0];
	  		var id4index= (data.length +1);
	  		
	  		Map[id4index] = obj;
	  		
	  		cache.Map 	= Map;
	  		cache.data.push(obj);
	  		$table.data("option",cache);
	  	};
	  	
	  	FunUtil.cache4prepend = function(option){
	  		FunUtil.cache4append(option);
	  	};
	  	
	  	
	  	FunUtil.cache4update = function(option){
	  		FunUtil.cache4append(option);
	  		FunUtil.cache4del(option.param.id);
	  	};
	  	
	  	FunUtil.cache4del = function(str){
	  		var cache 	= FunUtil.cache4get();
	  		var Map		= cache.Map;
	  		
	  		delete Map[str];
	  		
	  		cache.Map  = Map;
	  		
	  	    $table.data("option",cache);
	  	};
	  	
	  	FunUtil.cache4load = function(option){
	  		FunUtil.cache4init(option);
	  	};
	  	
	  	/*************PageObj操作类************************************/
	  	
	  	PageObj.load 	= function(option){
	  		var data 	= option.param;
	  		var columns = option.columns;
	  		var len4data= data.length;
	 		var len4col = columns.length;
	 		var buf  	= new StringBuffer();
	  		
	  		if(len4data === 0) return;
	 		
		 	for(var i =0 ;i<len4data;i++){
		 		
		 		var obj = data[i];
		 		
		 		buf.append('<tr  data-index="'+i+'">');  //主要是针对，delete  update  append prepend
		 		
		 		for(var j = 0; j < len4col; j++){
					
					var value = "";
					
					
					try{ String.HasText(obj[columns[j].filed]) ? value = obj[columns[j].filed] : value = ""; }catch(e){ };
					
					try{ value = columns[j].formatter(obj,value); }catch(e){};
					
		 			buf.append('<td style="'+FunUtil.setcss({"columns":columns[j].width,"align":option.align})+'">'+value+'</td>');
		 			
		 		}
		 		
		 		buf.append('</tr>');
		 	}
		 		
	  		$content.html(buf.toString());
	  		
	  		FunUtil.cache4load(option);
	  	};
	  	
	  	
	  	/****
	  	 * param = {id:data-index,data:obj}
	  	 * 默认在最后  id=-1
	  	 * ********************/
	  	PageObj.append  = function(option){
	  		var param = option.param;
			var $this = $table.find("tr[data-index='"+param.id+"']");
	  		
	  		$this.after(HtmUtil.addTrs(option));
	  		
	  		 
	  		FunUtil.cache4append(option);
	  	};
	  	
	  	PageObj.prepend = function(option){
	  		var param = option.param;
			var $this = $table.find("tr[data-index='"+param.id+"']");
	  		
	  		$this.before(HtmUtil.addTrs(option));
	  		
	  		FunUtil.cache4prepend(option);
	  	};
	  	
	  	PageObj.del	= function(option){
	  		//删除列表以逗号分割
	  		
	  		var param = option.param;
	  		
	  		var $this = $table.find("tr[data-index='"+param.id+"']");
	  		
	  		$this.remove();
	  		
	  		FunUtil.cache4del(option);
	  	};
	  	
	  	PageObj.update	= function(option){
	  		
	  		PageObj.prepend(option);
	  		PageObj.del(option);
	  	};
	  	
	  	PageObj.init 	= function(option){
	  		
	  		$table.html(HtmUtil.init());//初始化结构
			
			$head 	= $table.find("div.plug-table-head table thead");
		  	$foot	= $table.find("div.plug-table-foot table tfoot");
		  	$content= $table.find("div.plug-table-body table tbody");
			
			
	  		var data 	= option.data;
	 		var columns = option.columns;
	 		var len4col = columns.length;
	 		var len4data= data.length;
	 		
	 		
	 		//首行
	 		var buf  = new StringBuffer();
	 		
	 		buf.append(" <tr>");
	 		
	 		for(var i =0 ;i<len4col;i++){
	 			var obj = columns[i];
	 			
	 			
	 			var str = '<th  data-field="'+obj.filed+'"  style="'+FunUtil.setcss({"columns":columns[i].width,"align":option.align})+'">'+obj.title+'</th>';
	 			
	 			if(String.HasText(obj.formatter)) str = ('<th data-formatter="'+obj.formatter.name+'" data-field="'+obj.filed+'"  style="'+FunUtil.setcss({"columns":columns[i].width,"align":option.align})+'">'+obj.title+'</th>');
	 			 
	 			buf.append(str);
	 		}
	 		
	 		buf.append(" </tr>");
	 		
	 		
	 		$head.html(buf.toString());
	 		
	 		//判断是否是固定高
	 		if(String.HasText(option.height)) $content.closest("div").css({ "overflow-y": "auto", "height": option.height });
	 		
	 		option.param = option.data;
	 		 
	 		PageObj.load(option);
	  	};
	   
		PageObj.pub 	= function(option){
			
			if(!String.HasText(option.columns)){
		  		
		  		var method,data;
		  		
		  		for(var p in option){ method = p; data   = option[p];  }
		  		 
		  		option = FunUtil.Glob("option"); ;
		  		option.param = data;//公共参数
		  		
		  		FunUtil.setBaseOption(option);
		  		
		  		PageObj[method](option);
		  	}else{
		  		
		  		FunUtil.setBaseOption(option);
			   	
			   	PageObj.init(option);
		  	}
		};
		
		PageObj.pub(option);
  	};
	
	$.fn.xdntable = function(option) {
  	
	  	
	  	//PageInfo.init(this,option);
	  	PageInfo.init.call(this,option);
 	};
})(jQuery);

