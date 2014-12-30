var screen_size;
var offset;

var INTERVAL = 600;
var RULER_LEN = 1000;
var PREV_LEFT = 0;//used to set positions for the marks
var ZERO_ANIM_INTER = 200;
var NUM_OF_MARKS = 36;
var WIDTH = 15*NUM_OF_MARKS;

var alphas = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','Z'];

$(document).ready(function(){
	//Calculating screen size and offset
	screen_size = $(window).width();
	offset = screen_size/2;
	
	//Setting current scene text and its position
	$('.txt').html('Everything starts with <b><span>Zero</span></b>');
	
	$('.txt').css('top',offset*0.30);
	$('.txt').css('left',offset*0.60);
	$('.txt').fadeIn();
	
	$('.zero').css('top', offset*0.30);
	$('.zero').css('left',offset*0.94);
	
	setTimeout(function(){
		$('.txt').css('color','transparent');
		$('.txt span').css('color', 'white');
		$('.txt').css('left',offset*0.50);
		
		var fourPos = ['35','14','27','24'];
		var startFrom = 3;
		
		setTimeout(function(){
			//To 0 animation
			var intId = setInterval(function(){
				$('.txt span').html(alphas[fourPos[0]]+alphas[fourPos[1]]+alphas[fourPos[2]]+alphas[fourPos[3]]);
				if(fourPos[startFrom]==0){
					--startFrom;
					if(startFrom==-1){
						setTimeout(function(){
							$('.txt span').fadeOut();
							setTimeout(function(){
								//$('.txt span').html('<b>0</b>');
								//$('.txt span').fadeIn();
								$('.txt').css('display','none');
								$('.txt').css('color','white');
								$('.zero').fadeIn();
								setTimeout(function(){
									moveZero();
								},1000);
							},1000);
						},1000);
						clearInterval(intId);
					}
				}else{
					--fourPos[startFrom];
				}
			},20);
		},1000);
	},2000);	
	
	//setTimeout(function(){makeZeroSmall();},INTERVAL*4);
	/*
	//Setting container position
	$('.container').css('left',offset/2);
	$('.container').css('top',offset/4);
	*/
	
	//$('.zero').fadeIn();
	//moveZero();
});

function moveZero()
{
	$('.zero').css({"transform":"translate(-320px,200px)"});
	$('.zero').css({"-webkit-transform":"translate(-320px,200px)"});
	setRuler();
}

function setRuler()
{
	$('.ruler').css('top',offset*0.60);
	$('.ruler').css('left',offset*0.50);
	$('.ruler').css('display','block');
	$('.horizLine').animate({"width":15*(NUM_OF_MARKS-1)+"px"});
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
			if(i%5==1){
				$('.markings .centimeter:nth-child('+i+')').animate({"height":"50px"});
			}
			else{
				$('.markings .centimeter:nth-child('+i+')').animate({"height":"20px"});
			}
			setTimeout(setMarks(i+1),INTERVAL/8);
		},INTERVAL/4);
	}
	else if(i>NUM_OF_MARKS)
	{
		$('.txt').css('font-size','1.5em');
		$('.txt').css('letter-spacing','0px');
		$('.txt').html('Ruler is a basic instrument to measure and draw straight lines.<br> It was invented in Indus Valley Civilisation.');
		$('.txt').css('top',offset*0.65);
		$('.txt').css('left',offset*0.90);
		$('.txt').fadeIn().delay(200);
		var l = parseInt($('.txt').css('left'));
		$('.txt').animate({"left":l+50});
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
		if(i>NUM_OF_MARKS){
			$('.txt').css('opacity','0');
			rotateLine();
		}
	},3000);
}

function rotateLine()
{
	setTimeout(function(){
		$('.horizLine').css('transform','translateY(-100px) rotate(-45deg)');
		$('.horizLine').css('-webkit-transform','translateY(-100px) rotate(-45deg)');
		$('.txt').css('top',offset*0.4);
		$('.txt').css('left',offset*0.40);
		setTimeout(function(){showWaves();},INTERVAL);
	},700);
}

function showWaves()
{
	//var x = [155,15*NUM_OF_MARKS-10];
	//var y = [125,-245];
	
	/* **************************************
														HorizLine/Ruler
	<------------ ruler.left ---------------> ==================================
	As Ruler rotated by 45 degree
	left position is now extended by ruler.width - ruler.width * cos45
	
	var x = $('.ruler').position().left + ((parseInt($('.ruler').css('width'))) *(0.29))/2;
	
	Did not work though.
	**************************************** */
	
	
	$('.txt').html('Invention of Wireless Radio Transmission is accredited to Sir Jagadish Chandra Bose');
	$('.horizLine').animate({"opacity":"0"});
	
	setTimeout(function(){
		$('.txt').css('opacity','1');
		setTimeout(function(){
			for(var i=1;i<=2;i++)
			{
				$('.Wifi:nth-child('+i+')').fadeIn(100);
			}
		},1000);
	},1000);
	var msg = $('.txt').html();
	var msg_letters = msg.split("");
	$('.txt').html('');

	for(var i=0;i<msg_letters.length;++i){
		$('.txt').append('<span>'+msg_letters[i]+'</span>');
	}
	
	setTimeout(function(){
		var findex = 1;
		var rindex = msg_letters.length;
		var lettersHideId = setInterval(function(){
			if(findex==rindex){
				clearInterval(lettersHideId);
				for(var i =1;i<=2;i++)
				{
					$('.Wifi:nth-child('+i+')').fadeOut(600);
				}
				earthGoRound();
			}
			else{
				if(findex<39){
					$('.txt span:nth-child('+findex+')').css('color','transparent');
					++findex;
				}
				if(rindex>39){
					$('.txt span:nth-child('+rindex+')').css('color','transparent');
					--rindex;
				}
			}
		},20);
	},7000);
}

function earthGoRound(){
	$('.txt').animate({'opacity':'0'});
	$('.earth').fadeIn();
	setTimeout(function(){
		$('.txt').html('ISRO has successfully launched Chandrayaan and Mangalayaan missions.');
		$('.txt').css('left',offset*0.2);
		$('.txt').css('top',offset*0.2);
		$('.rocket').fadeIn();
		$('.rocket').animate({'top':'400px'});
		$('.earth').css('transform','scale(10,10)');
		setTimeout(function(){
			$('.txt').animate({'opacity':'1'});
			setTimeout(function(){
				displayOne();
			},1000);
		},2000);
	},1500);
}

function displayOne()
{
	$('.txt').animate({'opacity':'0'});
	$('.rocket').css('top','0px');
	$('.oneAbove').fadeIn();
	setTimeout(function(){
		$('.rocket').css("opacity","0");
		setTimeout(displayRest(),1200);
	},1000);
}

function displayRest()
{
	$('.earth').fadeOut();
	$('.zeroAbove').fadeIn();
	$('.zeroBelow').fadeIn();
	$('.oneBelow').fadeIn();
	setTimeout(function() {
		copy10();
		setTimeout(function(){
			fadeOnes();
			setTimeout(function(){
				makeINF();
			},1300);
		}, 1400);
	},1500);
}

function copy10()
{
	$('.oneBelow').css({"transform":"translateX(350px)"});
	$('.oneBelow').css({"-webkit-transform":"translateX(350px)"});
	$('.zeroBelow').css({"transform":"translateX(150px)"});
	$('.zeroBelow').css({"-webkit-transform":"translateX(150px)"});
	$('.oneAbove').css({"opacity":"0.3"});
	$('.zeroAbove').css({"opacity":"0.3"});
}

function fadeOnes()
{
	$('.oneAbove').fadeOut();//refers to the original one
	$('.oneBelow').fadeOut();//refers to the copied one. Make it go completely hide
	$('.zeroAbove').css({"opacity":"1"});
}

function makeINF()
{
	$('.zeroAbove').css({"transform":"translateX(10px)"});
	$('.zeroBelow').css({"transform":"translateX(140px)"});
	$('.zeroAbove .star5').css({"transform":"translate(4px,4px)"});
	$('.zeroBelow  .star12').css({"transform":"translate(-4px,-4px)"});
	
	//for Chrome
	$('.zeroAbove').css({"-webkit-transform":"translateX(10px)"});
	$('.zeroBelow').css({"-webkit-transform":"translateX(140px)"});
	$('.zeroAbove .star5').css({"-webkit-transform":"translate(4px,4px)"});
	$('.zeroBelow  .star12').css({"-webkit-transform":"translate(-4px,-4px)"});
}