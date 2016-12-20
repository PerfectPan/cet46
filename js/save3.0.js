//控制自适应
!(function(doc, win) {
    var docEle = doc.documentElement,//获取html元素
        event = "onorientationchange" in window ? "orientationchange" : "resize",//判断是屏幕旋转还是resize;
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 100 * (width / 1125) + "px");//设置html的fontSize，随着event的改变而改变。
        };
     
    win.addEventListener(event, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
 
}(document, window));

$(document).ready(function(){
	
	//获取考生信息
	$.ajax({
		type:"POST",
		url:"http://wx.hduhelp.com/app/index.php?i=2&c=entry&do=getTicket&m=cet_all_1_1&openid="+$("#openId").val()+"&time=1780858637",
		dataType:"json",
		success:function(data){
			$("#name").attr("value",data.data.name);
			$("#number").attr("value",data.data.ticket);
			if ($("#number").val().length==15) $("#save img").attr("src","http://qiniu.hduhelp.com/cet/img/modify.png");
		}
	});
	 //保存准考证
	$("#save img").click(function(){
		if ($("#number").val().length!=15)
		{
			$("#tip").show(30);
		}
		else
		{
			$("#tip").hide();	
			$.ajax({
				url:"http://wx.hduhelp.com/app/index.php?i=2&c=entry&do=saveTicket&m=cet_all_1_1&openid="+$("#openId").val()+"&time=1780858637",
				type:"POST",
				data:{
					name:$("#name").val(),
					ticket:$("#number").val()
				},
				dataType:"json",
				success:function(data){
					$("#save img").attr("src","http://qiniu.hduhelp.com/cet/img/modify.png");
					alert(data.msg);
				},
				error:function(){
					
				}
			})
		}
	})
//查询考试成绩

	$("#search img").click(function(){
		$.ajax({
			type:"GET",
			url:"http://wx.hduhelp.com/app/index.php?i=2&c=entry&do=canGetScore&m=cet_all_1_1",
			dataType:"json",
			success:function(data){
				alert(data["msg"]);
			}
		});
	})
})
