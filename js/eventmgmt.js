var prob_link, user, current_edit_event;
$(document).ready(function(){
	
});

//Login stage functions
$('#login').click(function(){
	user = $('#username').val()
	var login_packet = {
		username: $('#username').val(),
		password: $('#password').val()
	};
	$.post('/login', login_packet , function(data){
		if(data == "wrong"){
			alert('Username or Password is wrong');
		}
		else{
			user = data['0']['id'];
			$('.stage').css('display','none');
			$('#eventlist-stage').css('display','block');
			var packet = {
				id: user
			};
			$.post('/events', packet , function(data){
				for(var i in data){
					$('.events-list').append('<li><span class="event-name" data-id="'+data[i]['event_id']+'">'+data[i]['event_name']+'</span><span class="edit">Edit</span><span class="delete">Delete</span></li>');
				}
			});
		}
	});
});

//Event List Stage
$('body').on('click','.events-list li .delete', function(){
	var packet = {
		event_id: $(this).parent().find('.event-name').attr('data-id')
	};
	var element = $(this).parent();
	$.post('/delete', packet, function(result){
		if(result=="done"){
			console.log('Event deleted');
			element.remove();
		}
	});
});

$('body').on('click','.events-list li .edit', function(){
	current_edit_event = $(this).parent().find('.event-name').attr('data-id');
	var packet = {
		event_id: $(this).parent().find('.event-name').attr('data-id')
	};
	$('.stage').css('display','none');
	$('#edit-event-stage').css('display','block');
	$.post('/editevent', packet , function(data){
		$('#edit-event-stage #event_name').html(data['0']['event_name']);
		$('#edit-event-stage #event-description').html(data['0']['description']);
		$('#edit-event-stage #problem_link').html(data['0']['url']);
		$('#edit-event-stage #dropdown').val(data['0']['category_name']);
	});
});

$('#add').click(function(){
	$('.stage').css('display','none');
	$('#event-stage').css('display','block');
	prob_link = "";
});


//Add Event Page
$('#event-stage #save').click(function(){
	var info_bundle = {
		user_id: user,
		event_name: $('#event-stage #event_name').html(),
		url: prob_link,
		description: $('#event-stage #event-description').html(),
		category_name: $('#event-stage #dropdown option:selected').val()
	};
	console.log(info_bundle.event_name);
	console.log(info_bundle.url);
	console.log(info_bundle.description);
	console.log(info_bundle.category_name);
	
	//Check if no category is selected
	if(info_bundle.category_name == "none"){
		alert("Please select a category.");
	}
	else{
		$.post("/addevent", info_bundle, function(data){
			if(data=="done"){
				console.log('Done adding event');
				$('.stage').css('display','none');
				$('#eventlist-stage').css('display','block');
				var packet = {
					id: user
				};
				$.post('/events', packet , function(data){
					$('.events-list').html('');
					for(var i in data){
						$('.events-list').append('<li><span class="event-name" data-id="'+data[i]['event_id']+'">'+data[i]['event_name']+'</span><span class="edit">Edit</span><span class="delete">Delete</span></li>');
					}
				});
			}
			else{
				console.log('Event could not be added.');
				alert('Please refresh and try again.');
			}
		});
	}
});

$('#event-stage #problem_link').click(function(){
	var link = prompt("Enter the link to Problem Statement");
	if(link != null && link != ''){
		$('#event-stage #problem_link').html(link);
		prob_link = link;
	}
});


//Edit event Page
$('#edit-event-stage #save').click(function(){
	var info_bundle = {
		user_id: user,
		event_name: $('#edit-event-stage #event_name').html(),
		url: $('#edit-event-stage #problem_link').html(),
		description: $('#edit-event-stage #event-description').html(),
		category_name: $('#edit-event-stage #dropdown option:selected').val(),
		event_id: current_edit_event
	};
	console.log(info_bundle.event_name);
	console.log(info_bundle.url);
	console.log(info_bundle.description);
	console.log(info_bundle.category_name);
	
	//Check if no category is selected
	if(info_bundle.category_name == "none"){
		alert("Please select a category.");
	}
	else{
		$.post("/posteditevent", info_bundle, function(data){
			if(data=="done"){
				console.log('Done editing event');
				$('.stage').css('display','none');
				$('#eventlist-stage').css('display','block');
				var packet = {
					id: user
				};
				$.post('/events', packet , function(data){
					$('.events-list').html('');
					for(var i in data){
						$('.events-list').append('<li><span class="event-name" data-id="'+data[i]['event_id']+'">'+data[i]['event_name']+'</span><span class="edit">Edit</span><span class="delete">Delete</span></li>');
					}
				});
			}
			else{
				console.log('Event could not be updated.');
				alert('Please refresh and try again.');
			}
		});
	}
});

$('#edit-event-stage #problem_link').click(function(){
	var link = prompt("Enter the link to Problem Statement");
	if(link != null && link != ''){
		$('#edit-event-stage #problem_link').html(link);
	}
});