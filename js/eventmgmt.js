var problem_link;
$(document).ready(function(){
	prob_link = "";
});

//Login stage functions
$('#login').click(function(){
	var login_packet = {
		username: $('#username').val(),
		password: $('#password').val()
	};
	$.post('/login', login_packet , function(data){
		if(data == 0){
			alert('Username or Password is wrong');
		}
		else{
			$('#login-stage').css('{display:none}');
			$('#eventlist-stage').css('{display:block}');
			for(var i in data){
				console.log(data[i]['s_no']+data[i]['event_name']);
			}
		}
	});
});
$('#save').click(function(){
	var info_bundle = {
		event_name: $('#event_name').html(),
		problem_link: prob_link,
		description: $('#event-description').html(),
		category: $('#dropdown option:selected').val()
	};
	console.log(info_bundle.event_name);
	console.log(info_bundle.problem_link);
	console.log(info_bundle.description);
	console.log(info_bundle.categories);
	
	//Check if no category is selected
	if(info_bundle.categories == "none"){
		alert("Please select a category.");
	}
	else{
		/*$.post("/addmyevent", info_bundle, function(data){
			
		});*/
	}
});
$('#problem_link').click(function(){
	var link = prompt("Enter the link to Problem Statement");
	if(link != null && link != ''){
		$('#problem_link').html(link);
		info_bundle.problem_link = link;
	}
});
