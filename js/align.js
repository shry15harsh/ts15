$('document').ready(function(){
	
});

var click = 0;

$('.arrowContainer').click(function(){
	$('.screen').css("transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.menuBack').css({"transition":"all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)","opacity":"0"});
	
	$(".menuBack").fadeIn("100",function(){
		$('.screen').css({"transform":"translateY(-110%)"});
		$('.menuBack').css({"transform":"translateY(-110%)"});
		$('.menuBack').animate({"opacity":"1"});
		$('.menuBack .navbar').css('position','fixed');
	});
});

$('.menu li').click(function(){
	var num = $(this).attr("data-number");
	num = parseInt(num);
	//all elements before this go somewhere up and vanish
	//all elements below this also vanish
	++click;
	click = click % 2;
	if(click==1)//list not collapsed
	{
		for(var i = 1;i<6;i++)
		{
			if(i!=num){
				$('.menu li:nth-child('+i+') #item').parent().slideUp("500");
			}
		}
		$('.writeup .content li:nth-child('+num+')').fadeIn(800);
	}
	else
	{
		$('.writeup .content li:nth-child('+num+')').css('display','none');
		for(var i = 1;i<6;i++)
		{
			if(i!=num){
				$('.menu li:nth-child('+i+') #item').parent().slideDown("500");
			}
		}
	}
});

$('.home .up').click(function(){
	//reverse the animation
	//squeeze this Window and bring the cover down
	$('.screen').css("transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.screen').css("-webkit-transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.menuBack').css("transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('menuBack').css("-webkit-transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	
	
	$('.menuBack').fadeOut("100",function(){
		$('.menuBack').animate({"opacity":"0"},{duration:30,queue:false});
		$('.screen').css({"transform":"translateY(0)"});
		$('.screen').css({"-webkit-transform":"translateY(0)"});
	});
	
	
});

$('.navbar .circle').hover(function(){
	$(this).children(".icon").css({"color":"#222"});
	$(this).parent().children(".short").addClass("expand");
	var block_width = parseInt($(this).parent().css('width'));
	$(this).css("marginLeft",block_width*0.15+'px');
	},function(){
		$(this).children(".icon").css({"color":"black"});
		$(this).parent().children(".short").removeClass("expand");
		$(this).css("margin-left","0%");
	});