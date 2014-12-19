var screen_size;
var offset;
var INTERVAL = 600;
var RULER_LEN = 1000;
var PREV_LEFT = 0;//used to set positions for the marks
var ZERO_ANIM_INTER = 20;
var NUM_OF_MARKS = 36;
var RADIUS = [470,430,410];
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
		fadeMarks(1);
	}
}

function fadeMarks(i)
{
	if(i<=NUM_OF_MARKS)
	{
		setTimeout(function(){	
			$('.markings .centimeter:nth-child('+i+')').animate({"height":"0px"});
			setTimeout(fadeMarks(i+1),INTERVAL/8);
		},INTERVAL/4);
	}
	if(i>NUM_OF_MARKS)
	{
		rotateLine();
	}
}

function rotateLine()
{
	setTimeout(function(){
	$('.horizLine').css('transform','rotate(-45deg)');
	$('.ruler').css('transform','translateY(-100px)');
	$('.horizLine').css('opacity','0.4');
	setTimeout(showWaves(),INTERVAL/8);
	},INTERVAL/4);
}

function showWaves()
{
	var x = [0,15*NUM_OF_MARKS];
	
	//insert two circles here, absolute in position
	for(var i = 1;i<=2;i++)
	{
		$('.ruler .wifi').append('<div class = "circle"></div>');
	}
	
	//these two circles are for waves
	for(var i = 1;i<=6;i++)
	{
		$('.ruler .comm').append('<div class = "wave"></div>');
	}
	
	for(var i = 1;i<=2;i++)
	{
		$('.wifi .circle:nth-child('+i+')').css('display','block');	
		$('.wifi .circle:nth-child('+i+')').css('left',x[i-1]+'px');	
	}
	
	for(var i = 1;i<=6;i++)
	{		
		if(i<=3)//i.e. the ones down there, we have waves 1,2,3 down there
			{
				$('.comm .wave:nth-child('+i+')').addClass('wave2');
				$('.comm .wave:nth-child('+i+')').css('left',x[0]);
			}
		else
			{
				$('.comm .wave:nth-child('+i+')').addClass('wave1');
				$('.comm .wave:nth-child('+i+')').css('left',x[1]);
			}
	}
	
	var TX = WIDTH * (1-Math.cos(45*Math.PI/180)) / 2;
	var TY = WIDTH * Math.sin(45*Math.PI/180) / 2;
	$('.wifi').css('transform','translateY(-16px)');
	$('.comm').css('transform','translate(-210px,-250px)');
		
	for(var i = 1;i<=2;i++)
	{	
		$('.wifi .circle:nth-child('+i+')').css({"transform":"translate("+TX*Math.pow(-1,i+1)+"px,"+TY*Math.pow(-1,i+1)+"px)"});
		$('.wifi .circle:nth-child('+i+')').fadeIn(200);
	}
	
	for(var i = 1;i<=6;i++)
	{
		if(i<=3)//make them align to down
		{
			$('.comm .wave:nth-child('+i+')').css({"transform":"translate("+TX+"px,"+TY+"px)"});
		}
		else
		{
			$('.comm .wave:nth-child('+i+')').css({"transform":"translate("+(TX*-1)+"px,"+(TY*-1)+"px)"});
		}
	}
	
	$('.zeroAbove').css('opacity','0');
	
	for(var j = 1;j<=6;j++)
	{
		$('.comm .wave:nth-child('+j+')').animate({"height":RADIUS[(j-1)%3],"width":RADIUS[(j-1)%3]},{duration:100,queue:false});
		$('.comm .wave:nth-child('+j+')').fadeIn(800);								
	}
}