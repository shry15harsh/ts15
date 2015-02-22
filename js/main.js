var color_array=["22,160,133","142,68,173","241,196,15","46,204,113","211,84,0","149,165,166","41,128,185","230,126,34"];
var colorlev1=["#f44336","#d1c4e9","#bbdefb","#d7ccc8"];
var colorlev2=["#e53935","#b39ddb","#90caf9","#bcaaa4"];
var colorlev3=["#c62828","#9575cd","#64b5f6","#a1887f"];
var category_change=false;
var ccount=0,counter=0;
var colorIndex = 1;
var colorIndexli=1;
var n = ["AELAwns","ABRA","CC"];
$(document).ready(function(e){
	var colorIndex=1;
	$(".active-category").animate({"font-size":"40px","color":"white","letter-spacing": "2px","background-color": "black","font-weight": "400"},100);
	$(".fakes").each(function(){
		$(this).css({"left":colorIndex/2+"%","background-color":"rgb("+color_array[(colorIndex+2)%8]+")","z-index":100-colorIndex+""});
		colorIndex++;
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
	$(".event-list li").each(function(){
			$(this).css({"background-color":"rgb("+color_array[(colorIndexli+1)%7]+")","box-shadow":"3px 3px 0.5px rgba(0,0,0,0.7)"});
			colorIndexli++;
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

function getEvent(eventName,present,c)
{
	var information;
	var event_request = 
	{
		event_id:parseInt(eventName.attr("data-detail")),
	}
	console.log(event_request);
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
				c.children("h1").text(information.event_name);
				c.attr({"data-detail":data+""});
				c.children("p").text(information.description);
				if(information.url!="")
				{
					c.children("h").text("Problem Statement");
					c.children(".url").text(information.url);
					c.children(".url").attr({"href":"http://"+information.url+""});
				}
				c.animate({"top":"30%"},200,function(){
					$(this).addClass("space-active");
					$(this).attr({"data-detail":present.attr("data-detail")+""});
					console.log($(this).attr("data-detail"));
				});
				$(this).removeClass("space-active");
				
				$(".description-space").animate({"background-color":colorlev1[(colorIndex+1)%4]+""},300);
				colorIndex++;
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
				$(".event-list").css({"z-index":99-c+""});
				$(".event-list").css({"background-color":colorlev2[(colorIndex+1)%4]+""});
				//call for json here and pass it as argument
				
				$(".event-list").animate({"background-color":colorlev2[(colorIndex+1)%4]+""},{queue:false,duration:1500});
				$(".event-list").animate({"left":"15%"},900);	
				$(".category-list").animate({"background-color":colorlev3[(colorIndex+1)%4]+""},700);
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
						/*$(".event-list li").each(function(){
							$(this).css({"background-color":"rgb("+color_array[(colorIndexli+1)%7]+")","box-shadow":"3px 3px 0.5px rgba(0,0,0,0.7)"});
							colorIndexli++;
						});*/
				});
				//getRequest($(this));
			}
			else
			{
				getRequest(place);
				/*$(".event-list li").each(function(e){
						$(this).css({"background-color":"rgb("+color_array[(colorIndexli+1)%7]+")","box-shadow":"3px 3px 0.5px rgba(0,0,0,0.7)"});
						colorIndexli++;
				});*/
			}
			ccount=1;
			
			var col=$(".active-category").parent().css("background-color");
			$(".category-list li").animate({"font-size":"30px","color":"black","letter-spacing":"0px","background-color":col+""},{duartion:50});
			$(".active-category").removeClass("active-category");
			$(".event-list").animate({"background-color":colorlev2[(colorIndex+1)%4]+""},{queue:false,duration:1500});
			$(".event-list").animate({"left":(15+c/2)+"%"},900);	
			$(".category-list").animate({"background-color":colorlev3[(colorIndex+1)%4]+""},700);
			$(".description-space").animate({"background-color":colorlev1[(colorIndex+1)%4]+""},300);
			$(this).animate({"font-size":"40px","color":"white","letter-spacing": "2px","background-color": "black","font-weight": "400"},200);
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