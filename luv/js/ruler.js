var screen_size;
var offset;
var INTERVAL = 800;
var RULER_LEN = 1000;
var CM_LEN = 50;
var ruler_width = 800;
var prev_left = 0;//used to set positions for the centimeter marks
$(document).ready(function(){
	screen_size = $(window).width();
	offset = screen_size/2;
	alignZero();
	setTimeout(function(){
		makeZeroSmall();
		setTimeout(function(){
			setRuler();
		},3*INTERVAL);
	},0.10*INTERVAL);
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
			$('.zeroAbove .star:nth-child('+i+')').css('top',s_top/2);
			$('.zeroAbove .star:nth-child('+i+')').css('left',s_left/2);
		}
		setTimeout(function(){
			$('.zeroAbove').css({"transform":"translate(-400px,200px)"});
			$('.zeroAbove').css({"-webkit-transform":"translate(-400px,200px)"});
		},INTERVAL);
	},INTERVAL);
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
			var prev_left_mm = 0;
			for(var j = 1;j<=5;j++)
			{
				$('.markings .centimeter .smaller .millimeter:nth-child('+j+')').css('bottom','-50px');
				$('.markings .centimeter .smaller .millimeter:nth-child('+j+')').css('left',prev_left_mm+20+'px');
				$('.markings .centimeter .smaller .millimeter:nth-child('+j+')').css('display','block');
				$('.markings .centimeter .smaller .millimeter:nth-child('+j+')').animate({"height":"20px"});
				prev_left_mm+=20;
			}
			prev_left = parseInt($('.markings .centimeter:nth-child('+i+')').css('left'))+120;
			setMarkings(i+1);
		},INTERVAL/2);
	}
}

			