var screen_size;
var offset;
var INTERVAL = 600;
var RULER_LEN = 1000;
var CM_LEN = 50;
var ruler_width = 800;
var prev_left = 0;//used to set positions for the centimeter marks
var j = 1;//for animating the millimter marks
var prev_left_mm;
var ZERO_ANIM_INTER = 20;
var color=['lime','red','magenta','aqua','coral'];
$(document).ready(function(){
	screen_size = $(window).width();
	offset = screen_size/2;
	alignZero();
	setTimeout(function(){
		makeZeroSmall();
		setTimeout(function(){
			setRuler();
		},INTERVAL);
	},ZERO_ANIM_INTER);
});

function alignZero()
{
	$('.container').css('top',offset/3);
	$('.container').css('left',offset*0.9);
	$('.zeroAbove').css({"transition":"all 1s"});
	$('.zeroAbove').css({"-webkit-transition":"all 1s"});
}

function makeZeroSmall()
{
	setTimeout(function(){
		for(var i = 1;i<=14;i++)
		{
			var s_top = parseInt($('.zeroAbove .star:nth-child('+i+')').css('top'));
			var s_left = parseInt($('.zeroAbove .star:nth-child('+i+')').css('left'));
			$('.zeroAbove .star:nth-child('+i+')').css('top',s_top/3);
			$('.zeroAbove .star:nth-child('+i+')').css('left',s_left/3);
		}
		setTimeout(function(){
			$('.zeroAbove').css({"transform":"translate(-400px,200px)"});
			$('.zeroAbove').css({"-webkit-transform":"translate(-400px,200px)"});
		},ZERO_ANIM_INTER);
	},ZERO_ANIM_INTER);
}

function setRuler()
{
	$('.ruler').css('top',offset*0.60);
	$('.ruler').css('left',offset*0.30);
	$('.ruler').css('display','block');
	$('.horizLine').animate({"width":ruler_width+"px"});
	$('.markings').css('bottom','0px');
	$('.markings').css('left',RULER_LEN/20+"px");
	setMarkings(1);
}

function setMarkings(i)
{
	if(i<=6)
	{
		setTimeout(function(){
			$('.markings .centimeter:nth-child('+i+')').css('bottom','0px');	
			$('.markings .centimeter:nth-child('+i+')').css('left',prev_left+'px');
			$('.markings .centimeter:nth-child('+i+')').css('display','block');
			$('.markings .centimeter:nth-child('+i+')').animate({"height":"50px"});
			setTimeout(setMilliMarks(1,i),10*INTERVAL);
			prev_left = parseInt($('.markings .centimeter:nth-child('+i+')').css('left'))+120;
			setTimeout(setMarkings(i+1),10*INTERVAL);
		},INTERVAL);
	}
}

function setMilliMarks(j,i)
{
	if(j<=5)
	{
		if(j%5==1)prev_left_mm = 0;
		setTimeout(function(){
			$('.markings .centimeter:nth-child('+i+') .smaller .millimeter:nth-child('+j+')').css('bottom','-50px');
			$('.markings .centimeter:nth-child('+i+') .smaller .millimeter:nth-child('+j+')').css('left',prev_left_mm+20+'px');
			$('.markings .centimeter:nth-child('+i+') .smaller .millimeter:nth-child('+j+')').css('display','block');
			$('.markings .centimeter:nth-child('+i+') .smaller .millimeter:nth-child('+j+')').animate({"height":"20px"});
			//$('.markings .centimeter:nth-child('+i+') .smaller .millimeter:nth-child('+j+')').css({"background":color[i-1]});
			prev_left_mm+=20;
			setTimeout(setMilliMarks(j+1,i),INTERVAL/6);
		},INTERVAL/6);
	}
}