var screen_size;
var tot_size;//  = 4166;
var offset = 0;
var interval = 800;
$(document).ready(function(){
	screen_size = $(window).width();
	console.log(screen_size);
	offset = screen_size/2;
	$('.container').css('left',offset/2);
	$('.container').css('top',offset/4);
	setTimeout(function() 
	{
		copy10();
		setTimeout(function(){
			fadeones();
			setTimeout(function(){
				makeINF();
			},interval*1.5);
		}, interval*1.5);
	},interval);
});

function copy10()
{
	$('.oneBelow').css({"transform":"translateX(350px)"});
	$('.oneBelow').css({"-webkit-transform":"translateX(350px)"});
	$('.zeroBelow').css({"transform":"translateX(150px)"});
	$('.zeroBelow').css({"-webkit-transform":"translateX(150px)"});
	$('.oneAbove').css({"opacity":"0.3"});
	$('.zeroAbove').css({"opacity":"0.3"});
}

function fadeones()
{
	$('.oneAbove').css({"opacity":"0"});//refers to the original one
	$('.zeroAbove').css({"opacity":"1"});//refers to the original zero, we reset the opacity here
	$('.zeroBelow').css({"opacity":"1"});//refers to the copied zero, its opacity is already set to 1
	$('.oneBelow').css({"opacity":"0"});//refers to the copied one. Make it go completely hide
}

function makeINF()
{
	//var left = parseInt($('.constellation.o.fade').css('left'));
	//var left2 = parseInt($('.zero').css('left'));
	//var mid = (left2-left)/2;
	//$('.constellation.o.fade').css({"transform":"translateX("+(mid/2-10)+"px)"});
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