var screen_size;
var offset;

var INTERVAL = 600;
var RULER_LEN = 1000;
var PREV_LEFT = 0;//used to set positions for the marks
var ZERO_ANIM_INTER = 200;
var NUM_OF_MARKS = 36;
var WIDTH = 15*NUM_OF_MARKS;

var alphas = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','Z'];

var audioElement;

$(document).ready(function(){
	audioElement = new Audio();//document.createElement('audio');
    audioElement.src = 'lighters.mp3';//setAttribute('src', 'lighters.mp3');
	
	
	audioElement.addEventListener("canplaythrough", function() {
		audioElement.play();
		//alert('hey');
		init();
	//Calculating screen size and offset
	
	});
});

function init(){
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
								$('.txt').css('top',offset*0.20);
								$('.txt').html('Zero was invented in India');
								$('.txt').fadeIn();
								$('.txt').css('color','white');
								$('.zero').fadeIn();
								setTimeout(function(){
									$('.txt').css('opacity','0');
									setTimeout(function(){
										$('.txt').css('font-size','1.5em');
										$('.txt').css('letter-spacing','0px');
										$('.txt').html('Ruler is a basic instrument to measure and draw straight lines.<br> It was invented in Indus Valley Civilisation.');
										$('.txt').css('top',offset*0.65);
										$('.txt').css('left',offset*0.90);
										moveZero();
									},1000);
								},2000);
							},1000);
						},1000);
						clearInterval(intId);
					}
				}else{
					--fourPos[startFrom];
				}
			},40);
		},1000);
	},5000);	
}

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
		$('.txt').css('opacity','1');
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
		$('.txt').css('top',offset*0.41);
		$('.txt').css('left',offset*0.39);
		setTimeout(function(){showWaves();},INTERVAL);
	},1700);
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
	
	setTimeout(function(){
		$('.horizLine').animate({"opacity":"0"});
		for(var i=1;i<=2;i++)
		{
			$('.Wifi:nth-child('+i+')').fadeIn();
		}
		setTimeout(function(){
			$('.horizLine').animate({"opacity":"0"});
			$('.txt').css('opacity','1');
		},1000);
	},2000);
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
		$('.earth').css('transform','scale(9,9)');
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
		setTimeout(function(){
			$('.txt').css('left',offset*0.7);
			$('.txt').css('top',offset*0.15);
			displayRest();
		},1200);
	},1000);
}

function displayRest()
{
	$('.earth').animate({'opacity':0});
	$('.zeroBelow').fadeIn();
	setTimeout(function(){
		$('.zeroBelow').css('left','-100px');
		$('.txt').animate({'opacity':1});
		$('.txt').html('Decimal system was invented in India');
		setTimeout(function(){
			$('.oneBelow').fadeIn();
			$('.zeroAbove').fadeIn();
			$('.txt').animate({'opacity':0});
			copy10();
		},2000);
	},2000);
}

function copy10()
{
	$('.container').css('transform','translateX(-5%)');
	$('.container').css('-webkit-transform','translateX(-5%)');
	$('.oneBelow').css({"transform":"translateX(410px)"});
	$('.oneBelow').css({"-webkit-transform":"translateX(410px)"});
	$('.zeroBelow').css({"transform":"translateX(150px)"});
	$('.zeroBelow').css({"-webkit-transform":"translateX(150px)"});
	setTimeout(function(){
		$('.txt').animate({'opacity':1});
		$('.txt').html('Binary system was invented in India');
		setTimeout(function(){
			$('.txt').animate({'opacity':0});	
			fadeOnes();
		},2000);
	},1000);
}

function fadeOnes()
{
	$('.oneAbove').animate({'opacity':0});
	$('.oneBelow').animate({'opacity':0});
	//$('.zeroAbove').css({"opacity":"1"});
	setTimeout(function(){
		makeINF();
	},1000);
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
	
	$('.txt').animate({'opacity':1});
	$('.txt').css('left',offset*0.6);
	$('.txt').html('There are infinite innovations made in India.');
	
	setTimeout(function(){
		$('.txt').animate({'opacity':0});
		//$('.oneAbove').animate({'opacity':1});
		//$('.oneBelow').animate({'opacity':1});
		
		/*for(var i=1;i<=14;++i){
		  var l = $('.zeroAbove .star:nth-child('+i+')').position().left;
		  var t = $('.zeroAbove .star:nth-child('+i+')').position().top;
		  $('.zeroAbove .star:nth-child('+i+')').animate({'left':l/1.2},20);
		  $('.zeroAbove .star:nth-child('+i+')').animate({'top':t/1.2},20);
		  
		  l = $('.zeroBelow .star:nth-child('+i+')').position().left;
		  t = $('.zeroBelow .star:nth-child('+i+')').position().top;
		  $('.zeroBelow .star:nth-child('+i+')').animate({'left':l/1.2},20);
		  $('.zeroBelow .star:nth-child('+i+')').animate({'top':t/1.2},20);
		}
		
		for(i=1;i<=5;i++){
		  var l= $('.oneBelow .star:nth-child('+i+')').position().top;
		  $('.oneBelow .star:nth-child('+i+')').animate({'top':l*1.5},20);
		  
		  l= $('.oneAbove .star:nth-child('+i+')').position().top;
		  $('.oneAbove .star:nth-child('+i+')').animate({'top':l*1.5},20);
		}*/
		
		setTimeout(function(){
			$('.container').animate({'opacity':0});
			$('.txt').html('One is');
			setTimeout(function(){
				$('.txt').animate({'opacity':'1'});
				showTS();
			},2000);
		},1000);
		/*setTimeout(function(){
			$('.container').css('transform','translateY(20%) rotate(90deg)');
			$('.oneAbove').css('transform','translate(35%,53%)');
			
			$('.oneBelow').css('transform-origin','200% 80%');
			$('.oneBelow').css('transform','translate(-69%,65%) rotate(90deg)');
			
			setTimeout(function(){
				for(var i=2;i<=4;++i){
					$('.zeroAbove .star:nth-child('+i+')').css('opacity','0');
					$('.zeroBelow .star:nth-child('+(i+7)+')').css('opacity','0');
				}
				$('.txt').animate({'opacity':'1'});
				showTS();
			},1000);
		},1000);*/
		
	},2000);
}

function showTS(){
	setTimeout(function(){
		$('.txt').animate({'opacity':0});
		$('.ts').fadeIn();
		setTimeout(function(){
			$('.ts').css('top','100px');
			$('.constellation').css('display','none');
			$('.earth').css('display','none');
			$('.mainText').fadeIn();
		},2000);
	},3000);
}