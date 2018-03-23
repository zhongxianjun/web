$(function(){
	var goods;
	var sizeArr = [];
	var tasteArr = [];
	var selGoodsI = 0;
	var res = '';
	//商品数据获取
	$.ajax({
		url:"data/goods.json",
		type:"get",
		async:false,
		dataType:"json",
		success:function(data){
			console.log(data);
			init(data);
		}
	});

	function init(data){
		goods = data ;

		//获取商品属性(包装和口味)
		var attrArr = [];
		for(var i in goods){
			attrArr.push(goods[i].att_name);
		}

		//拆解商品属性，获取包装信息，获取口味信息
		attrArr.forEach(function(val,i){
			var tempArr = val.split("|");

			//保存包装信息
			if($.inArray(tempArr[0],sizeArr) == -1){
				sizeArr.push(tempArr[0]);
			}

			//保存口味信息
			if($.inArray(tempArr[1],tasteArr) == -1){
				tasteArr.push(tempArr[1]);
			}
		});

		//生成包装结构
		setSizeHtml();

		//生成口味结构
		setTasteHtml();
		select();
	}

	function setSizeHtml(){
		var html = '';
		sizeArr.forEach(function(v,k){
			html += '<li>' + v + '</li>'
		});
		$(".size ul").html(html);
	}

	function setTasteHtml(){
		var html = '';
		tasteArr.forEach(function(v,k){
			html += '<li>' + v + '</li>'
		});
		$(".taste ul").html(html);
	}

	//选择功能
	function select(index = selGoodsI){
		var curGoods = goods[index];
		// console.log(curGoods);
		var domain = 'http://t.lld8839.com/';
		
		//商品图片
		$(".pic").html("<img src='" + domain + curGoods.att_img + "'>");

		//商品基础信息
		$(".detail p").html('价格:<span class="price">￥'+curGoods.att_price+'</span>可用消费券:<span class="quan">￥'+curGoods.att_reduce+'</span>pv:<span class="pv">'+curGoods.att_pv+'</span>库存:<span class="num">'+curGoods.att_kc+'</span>');
		res = ' 价格:￥'+curGoods.att_price+' 可用消费券:￥'+curGoods.att_reduce+' pv:'+curGoods.att_pv+' 库存:'+curGoods.att_kc;

		var attNameArr = curGoods.att_name.split("|");
		var curSize =  attNameArr[0];
		var curTaste = attNameArr[1];
		
		//当前包装选中
		$(".size ul li").each(function(){
			if($(this).text() === curSize){
				$(this).addClass('on').siblings().removeClass('on');
			}

		});

		//当前口味选中
		$(".taste ul li").each(function(){
			if($(this).text() === curTaste){
				$(this).addClass('on').siblings().removeClass('on');
			}
		});
	}

	//包装选择
	$(".size ul li").each(function(){
		$(this).click(function(){
			var sizeStr = $(this).text();
			var tasteStr = $(".taste ul li.on").text();
			var attName = sizeStr + "|" + tasteStr;
			// console.log(attName);
			var index = 0;
			for(var i=0;i<=goods.length-1;i++){
				if(attName === goods[i].att_name){
					index = i;
					break;
				}
			}
			selGoodsI = index;
			select(selGoodsI);
		});
	});

	//口味选择
	$(".taste ul li").each(function(){
		$(this).click(function(){
			var tasteStr = $(this).text();
			var sizeStr = $(".size ul li.on").text();
			var attrName = sizeStr + "|" + tasteStr;
			var index = 0;
			for(var i = 0; i <= goods.length-1; i++){
				if(attrName === goods[i].att_name){
					index = i;
					break;
				}
			}
			selGoodsI = index;
			select(selGoodsI);
		});
	});

	//确定按钮
	$(".ensure button").click(function(){
		alert(goods[selGoodsI].att_name + res);
	});

})