var colorlev1=["#ef5350","#9575CD","#64B5F6","#81C784","#DCE775","#FFF176"];
//var colorlev1=["#43a047","#ff7043","#00bcd4","#d7ccc8"];//greens are "#96B566","#BCE27F",
var colorlev2=[];
var colorlev3=[];
var category_change=false;
var ccount=0,counter=0;
var colorIndex = 1;
var colorIndexli=1;

function shadeColor(color,percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

$(document).ready(function(e){
	//fill arrays colorlev2 and colorlev3
	var color_hash = colorlev1.length;
	for(var i = 0;i<color_hash;i++)
	{
		colorlev2[i] = shadeColor(colorlev1[i],6);
		colorlev3[i] = shadeColor(colorlev1[i],12);
	}
	var colorIndex=1;
	$(".active-category").animate({"font-size":"40px","color":"white","letter-spacing": "2px","background-color": "black","font-weight": "400"},100);
	var iter = 0;
	$(".fakes").each(function(){
		$(this).css({"left":colorIndex/2+"%","background-color":shadeColor("#009688",6*iter),"z-index":100-colorIndex+""});
		colorIndex++;
		iter++;
	});
	requestAnimationFrame(main);
});

function populateEventList(size,eventList)
{

	$(".event-list ul").empty();
	for(var i = 0;i<size;i++)
	{
		$(".event-list ul").append( "<li data-detail= "+ eventList[i]['event_id'] +">" + eventList[i]['event_name'] + "</li>");
	}

	var color = colorlev2[(colorIndex)%4];
	$(".event-list li").each(function(){
			$(this).css({"backgroundColor":shadeColor(color,35),"box-shadow":"3px 3px 0.5px rgba(0,0,0,0.7)"});
	});
}

function getRequest(category)
{
	//category refers to the category that has been clicked
	//send a JSON here regarding the events list from here
	//return the JSON object to the calling function
	var category_request = 
	{
		category_id:parseInt(category.attr("data-detail")),
	}
	$.post(
		"/category_event",
		category_request,
		function(data,status){
			var population = Object.keys(data).length;
			populateEventList(population,data);
	});
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function getEvent(eventName,present,c)
{
	var information;
	var event_request = 
	{
		event_id:parseInt(eventName.attr("data-detail")),
	}
	//console.log(event_request);
	$.post(
		"/select_event",
		event_request,
		function(data,status){
			information=data;
			$(".space-active").animate({"top":"60%","opacity":"0"},500,function(){
			///////////////////insertion json
				//filtering div having display none presntly
				c.children("h").text("");
				c.css({"display":"block"});
				//children() selecting required child insert json data here
				c.children("h1").html(information.event_name);
				c.attr({"data-detail":data+""});
				c.children("p").html(information.description);
				if(information.url!="")
				{
					c.children("h").text("Problem Statement");
					c.children(".url").text(information.url);
					c.children(".url").attr({"href":"http://"+information.url+""});
				}
				c.animate({"top":"15%"},200,function(){
					$(this).addClass("space-active");
					$(this).attr({"data-detail":present.attr("data-detail")+""});
				});
				$(this).removeClass("space-active");
				
				var screen_color = present.css("backgroundColor");//in rgb format
				$(".description-space").animate({"background-color":screen_color},300);
				$(this).css({"display":"none","top":"0","opacity":"1"});
			});
	});
}

function main(){
		$(".category-list li").on("click", function(){
			var place=$(this);
			var c=$(this).index()+1;
			if($(this).attr("data-detail")=="1" && counter==0)
			{
				
				
				getRequest(place);

				$(".event-list").css({"background-color":colorlev2[(colorIndex+1)%4]+""});
				$(".event-list").animate({"background-color":colorlev2[(colorIndex+1)%4]+""},{queue:false,duration:1500});
				
				$(".event-list").css({"z-index":99-c+""});				
				//call for json here and pass it as argument
				
				$(".event-list").animate({"left":"15%"},900);

				//$(".category-list").animate({"background-color":"#80cbc4"},700);
				$(".description-space").animate({"background-color":colorlev1[(colorIndex+1)%4]+""},300);
				ccount=1;
				category_change=true;
				return;
			}
			else if($(this).hasClass("active-category"))
			{
				return;
			}
			//counter to 1 for avoiding improper animation in category1
			counter=1;
			if(ccount==1)
			{
				$(".event-list").animate({"left":"0%"},400,function(){
						$(this).css({"z-index":99-c+""});
						$(".event-list").css({"background-color":colorlev1[(colorIndex+1)%4]+""});
						getRequest(place);
				});
				//getRequest($(this));
			}
			else
			{
				getRequest(place);
			}
			ccount=1;
			
			var col=$(".active-category").parent().css("background-color");
			$(".category-list li").animate({"font-size":"2.5em","color":"#222","letter-spacing":"0px","background-color":"#80cbc4"},{duartion:50});
			$(".active-category").removeClass("active-category");
			$(".event-list").animate({"background-color":colorlev2[(colorIndex+1)%4]+""},{queue:false,duration:1500});
			$(".event-list").animate({"left":(14.5+c/2)+"%"},900);	
			//$(".category-list").animate({"background-color":"#80cbc4"},700);
			var screen_color = hexToRgb(colorlev1[(colorIndex+1)%4]);
			$(".description-space").animate({"background-color":"rgba("+screen_color.r+","+screen_color.g+","+screen_color.b+",0.3)"},300);
			$(this).animate({"font-size":"3em","color":"white","letter-spacing": "2px","background-color": "black","font-weight": "400"},200);
			$(this).addClass("active-category");
			category_change=true;
			colorIndex++;
		});
		
		var count=0;
		
		$(".event-list").on("click","li",function(e){
			var data=$(this).attr("data-detail");
			var present=$(this);
			var c=$(".description-space div").filter(function(){return $(this).hasClass("space-active")==false;});
			//console.log(c.attr("data-detail")+" "+$(this).attr("data-detail"));
			if($(".space-active").attr("data-detail")==$(this).attr("data-detail")&&category_change==false)
			{
				return;
			}
			var _self = $(e.target);
			//use this _self everywhere
			//send a JSON to retireve the information
			//retrieve an object with the desired event details

			getEvent(_self,present,c);

			category_change=false;	
		});
}