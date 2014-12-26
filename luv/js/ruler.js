var screen_size;
var offset;
var INTERVAL = 600;
var RULER_LEN = 1000;
var PREV_LEFT = 0;//used to set positions for the marks
var ZERO_ANIM_INTER = 200;
var NUM_OF_MARKS = 36;
var WIDTH = 15*NUM_OF_MARKS;
$(document).ready(function(){
	screen_size = $(window).width();
	offset = screen_size/2;
	$('.container').css('left',offset/2);
	$('.container').css('top',offset/4);
	$('.zero').css('top',offset/3);
	$('.zero').css('left',offset);
	for(var i = 1;i<=5;i++)
	{
		$('.section .txt').append('<div class = "para"></div>');
	}
	for(var i = 1;i<=5;i++)
	{
		$('.txt .para:nth-child('+i+')').text("India India India. Here's some test script.");
	}

	$('.txt .para:nth-child(1)').css('top',offset*0.30);
	$('.txt .para:nth-child(1)').css('left',offset*0.50);
	$('.txt .para:nth-child(1)').fadeIn();
	var l = parseInt($('.txt .para:nth-child(1)').css('left'));
	$('.txt .para:nth-child(1)').animate({"left":l+50});
	
	setTimeout(function(){makeZeroSmall();},INTERVAL*4);
});

function makeZeroSmall()
{
	$('.zero').css({"transform":"translate(-370px,150px) scale(0.5,0.5)"});
	$('.zero').css({"-webkit-transform":"translate(-370px,150px) scale(0.5,0.5)"});
	$('.txt .para:nth-child(1)').animate({"opacity":"0"});
	setRuler();
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
		$('.txt .para:nth-child(2)').css('top',offset*0.65);
		$('.txt .para:nth-child(2)').css('left',offset*0.90);
		$('.txt .para:nth-child(2)').fadeIn().delay(200);
		var l = parseInt($('.txt .para:nth-child(2)').css('left'));
		$('.txt .para:nth-child(2)').animate({"left":l+50});
		setTimeout(function(){$('.txt .para:nth-child(2)').animate({"opacity":"0"});},2500);
		fadeMarks();
	}
}

function fadeMarks()
{
	setTimeout(function(){
		$('.zero').fadeOut();
		for(var i = 1;i<=NUM_OF_MARKS;i++)
		{
			$('.markings .centimeter:nth-child('+i+')').animate({"height":"0px"},{queue:false});
		}
		if(i>NUM_OF_MARKS){rotateLine()};
	},3000);
}

function rotateLine()
{
	setTimeout(function(){
	$('.horizLine').css('transform','rotate(-45deg)');
	$('.ruler').css('transform','translateY(-100px)');
	$('.horizLine').css('-webkit-transform','rotate(-45deg)');
	$('.ruler').css('-webkit-transform','translateY(-100px)');
	},700);
	setTimeout(showWaves(),700+INTERVAL);
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
		$('.comm .Wifi:nth-child('+i+')').fadeIn(100);
	}
	$('.horizLine').animate({"opacity":"0"});
	$('.txt .para:nth-child(3)').css('top',offset/2);
	$('.txt .para:nth-child(3)').css('left',offset);
	$('.txt .para:nth-child(3)').fadeIn(200).delay(200);
	var l = parseInt($('.txt .para:nth-child(3)').css('left'));
	$('.txt .para:nth-child(3)').animate({"left":l+50});
	setTimeout(function(){$('.txt .para:nth-child(3)').animate({"opacity":"0"});},4521);
	setTimeout(function(){
		for(var i =1;i<=2;i++)
		{
			$('.comm .Wifi:nth-child('+i+')').fadeOut(600);
		}
	},4525);
	setTimeout(function()
	{
			moveRocket();
	},5100);
}

function moveRocket()
{
	$('.space').css('display','block');
	setTimeout(function(){displayOne()},5100);
}

function displayOne()
{
	$('.space .rocket').animate({"top":"-250px"},{duration:300,queue:false});
	$('.space .earth').fadeOut();
	$('.oneAbove').animate({"opacity":"1"},{duration:300,queue:false});
}