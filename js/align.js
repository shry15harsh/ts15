$('document').ready(function(){
	$('.screen').css("transition-timing-function","cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.screen').css("transition","all 1s");
	$('.menuBack').css("transition-timing-function","cubic-bezier(0.910, 0.080, 0.450, 0.810)");	
	$('.menuBack').css("transition","all 1s");	
	$(".event-list").mCustomScrollbar({
		theme:"light"
	});
	$(".description-space").mCustomScrollbar({
		theme:"light"
	});
	$('.writeup .section:nth-child(5)').mCustomScrollbar({
		theme:"light"
	});
});

var click = 0;
var intial_top;
var initial_left;
var initial_width;

$('.arrowContainer').click(function(){
		$('.screen').fadeOut("slow",function(){
		$('.menuBack').fadeIn();
		$('.screen').css("transform","translateY(-100%)");
		$('.menuBack').css({"transform":"translateY(0%)"});
		$('.menuBack .navbar').css("position","fixed");
	});
});

/*$('.menu li').click(function(){
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
		/*if(num==1)
		{
			$(".backdrop").css({"display":"block"});
			$(".sections").css({"display":"block"});
			return;
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
});*/

$('.menu li').click(function(){
	var num = $(this).attr("data-number");
	num = parseInt(num);
	//all elements before this go somewhere up and vanish
	//all elements below this also vanish
	++click;
	click = click % 2;
	if(click==1)//list not collapsed
	{
		for(var i = 1;i<7;i++)
		{
			if(i!=num){
				$('.menu li:nth-child('+i+') #item').parent().slideUp("500");
			}
		}
		if(num==1)
		{
			//$(".backdrop").css({"display":"block"});
			//$(".sections").css({"display":"block"});
			//return;
		}
		$('.writeup .content li:nth-child('+num+')').fadeIn(800);
	}
	else
	{
		$('.writeup .content li:nth-child('+num+')').css('display','none');
		for(var i = 1;i<7;i++)
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
	
	$('.menuBack').fadeOut("slow",function(){
		$('.screen').fadeIn();
		$('.menuBack').css("transform","translateY(100%)");
		$('.screen').css({"transform":"translateY(0%)"});
	});
});

$('.navbar ul li').click(function(){
	if($(this).attr('data-section') == 'credits'){
		if(/\S/.test($('.navbar-content #'+$(this).attr('data-section')).html())){
		}
		else
		$('.navbar-content #'+$(this).attr('data-section')).html('<h1> Website Credits </h1><iframe src="credits/credit.html"></iframe>');
	}
	$('.navbar-content').css('opacity','1');
	$('.navbar-content').css('z-index','1000');
	$('.navbar-content .navbar-section').css('display','none');
	$('.navbar-content #'+$(this).attr('data-section')).css('display','block');
});

$('#close-button').click(function(){
	$('.navbar-content').css('opacity','0');
	$('.navbar-content').css('z-index','-1000');
	$('.navbar-content .navbar-section').css('display','none');
});