// JavaScript Document
$(function(){
	
	/*轮播图*/
	//隐藏第一张以外的图片
	$('#banner>ul>li:gt(0)').hide();
	var n=0;
	var len=$('#banner ul li').length;  //获取的是li的长度 数量
	var t;
	function play(){
		//alert(n)
		$('#banner ul li').eq(n).show().siblings().hide();
			//给当前的span增加on样式，移除
		$('#num span').eq(n).addClass('on').siblings().removeClass('on');
	}
	function autoPlay(){
		//自动播放
		t=setInterval(function(){
			//alert(1)	
			n++;
			if(n>=len){
				n=0;
			}
			play();
		},2000)
	}
	//alert(len)
	autoPlay(); //调用自动播放函数
	
	//鼠标经过banner停止播放，移开继续播放
	$('#banner').hover(function(){
		clearInterval(t)
	},function(){
		autoPlay();
	})
	//点击下一张
	$('#next').click(function(){
			n++;
			if(n>=len){
				n=0;
			}
			play();
	})
	//点击上一张
	$('#prev').click(function(){
			if(n<=0){
				n=len;	
			}
			n--;	
		 play();
	})
	//点击数字显示相应的图片
	$('#num span').each(function(index) {
        //alert(index)
		$(this).click(function(){
			//alert(index)	
			n=index;
			play();
		})
    });
})