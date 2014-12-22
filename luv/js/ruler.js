var screen_size;
var offset;
var INTERVAL = 600;
var RULER_LEN = 1000;
var PREV_LEFT = 0;//used to set positions for the marks
var ZERO_ANIM_INTER = 20;
var NUM_OF_MARKS = 36;
var WIDTH = 15*NUM_OF_MARKS;
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
			$('.zeroAbove').css({"transform":"translate(-300px,200px)"});
			$('.zeroAbove').css({"-webkit-transform":"translate(-300px,200px)"});
		},ZERO_ANIM_INTER);
	},ZERO_ANIM_INTER);
}

function setRuler()
{
	$('.ruler').css('top',offset*0.60);
	$('.ruler').css('left',offset*0.50);
	$('.ruler').css('display','block');
	$('.horizLine').animate({"width":15*(NUM_OF_MARKS)+"px"});
	$('.markings').css('bottom','0px');
	makeMarks();
	//rotateLine();//comment this out later on
}

function makeMarks()
{
	for(var i = 1;i<=NUM_OF_MARKS;i++)
	{
		$('.ruler .markings').append('<div class = "centimeter"></div>');
	}
	for(var i = 1;i<=NUM_OF_MARKS;i++)
	{
		$('.markings .centimeter:nth-child('+i+')').css('left',PREV_LEFT);
		PREV_LEFT+=15;
	}
	setMarks(1);
}

function setMarks(i)
{
	if(i<=NUM_OF_MARKS)
	{
		setTimeout(function(){	
			$('.markings .centimeter:nth-child('+i+')').css('display','block');
			if(i%6==1){
				$('.markings .centimeter:nth-child('+i+')').animate({"height":"50px"});
			}
			else{
				$('.markings .centimeter:nth-child('+i+')').animate({"height":"20px"});
			}
			setTimeout(setMarks(i+1),INTERVAL/8);
		},INTERVAL/4);
	}
	if(i>NUM_OF_MARKS)
	{
		fadeMarks();
	}
}

function fadeMarks()
{
	setTimeout(function(){
		for(var i = 1;i<=NUM_OF_MARKS;i++)
		{
			$('.markings .centimeter:nth-child('+i+')').animate({"height":"0px"},{queue:false});
		}
		if(i>NUM_OF_MARKS){rotateLine()};
	},INTERVAL/4);
}

function rotateLine()
{
	setTimeout(function(){
	$('.horizLine').css('transform','rotate(-45deg)');
	$('.ruler').css('transform','translateY(-100px)');
	$('.horizLine').css('opacity','0.4');
	$('.zeroAbove').css('opacity','0');
	},INTERVAL/2);
	setTimeout(showWaves(),INTERVAL);
}

function showWaves()
{
	var x = [155,15*NUM_OF_MARKS-10];
	var y = [125,-245];
	for(var i = 1;i<=2;i++)
	{
		var iota = Math.pow(-1,i+1);
		$('.comm .Wifi:nth-child('+i+')').css('left',x[i-1]);
		$('.comm .Wifi:nth-child('+i+')').css('top',y[i-1]);
		$('.comm .Wifi:nth-child('+i+')').css({"transform":"scale(0.5,"+iota*0.5+") rotate("+45*iota+"deg)"});
		$('.comm .Wifi:nth-child('+i+')').css({"-webkit-transform":"scale(0.5,"+iota*0.5+") rotate("+45*iota+"deg)"});
	}
	for(var i =1;i<=2;i++)
	{
		$('.comm .Wifi:nth-child('+i+')').fadeIn(1000);
	}
	for(var i =1;i<=2;i++)
	{
		$('.comm .Wifi:nth-child('+i+')').fadeOut(1000*6);
	}
	setTimeout(function(){$('.ruler').animate({"opacity":"0"});
		//circle to draw an Earth
	},6050);
}