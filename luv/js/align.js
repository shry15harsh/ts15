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
				rotateZeroes();
			},interval*1.5);
		}, interval*1.5);
	},interval);
});

function copy10()
{
	$('.one').css({"transform":"translateX(350px)"});
	$('.zero').css({"transform":"translateX(150px)"});
	$('.fade').css({"opacity":"0.3"});
}

function fadeones()
{
	$('.one').css({"opacity":"0"});
	$('.container .constellation:nth-child(1)').css({"opacity":"0"});//refers to the original one
	$('.container .constellation:nth-child(2)').css({"opacity":"1"});//refers to the original zero, we reset the opacity here
	$('.container .constellation:nth-child(4)').css({"opacity":"1"});//refers to the copied zero, it is already set to 1
	$('.container .constellation:nth-child(3)').css({"opacity":"0"});//refers to the copied one. Make it go completely hide
}

function rotateZeroes()
{
	/*for(var i=1;i<=14;i++)
	{
		var l = parseInt($('.constellation.o .star:nth-child('+i+')').css('left'));
		var t = parseInt($('.constellation.o .star:nth-child('+i+')').css('top'));
		$('.constellation.o .star:nth-child('+i+')').css("left",l*1.5);
		$('.constellation.o .star:nth-child('+i+')').css("top",t*1.5-30);
	}*/
	//var left = parseInt($('.constellation.o.fade').css('left'));
	//var left2 = parseInt($('.zero').css('left'));
	//var mid = (left2-left)/2;
	//$('.constellation.o.fade').css({"transform":"translateX("+(mid/2-10)+"px)"});
	$('.container .constellation:nth-child(2)').css({"transform":"translateX(10px)"});
	$('.zero').css({"transform":"translateX(140px)"});
		$('.container .constellation:nth-child(2) .star5').css({"transform":"translate(4px,4px)"});
		$('.zero  .star12').css({"transform":"translate(-4px,-4px)"});
}