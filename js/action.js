$('document').ready(function(){
	$('.goButton').click(function(){
		var credentials = {
			username: $('.uname').val(),
			password: $('.pword').val()
		};
		$.ajax({
			url:"",
			type:"POST",
			data:JSON.stringify(credentials),
			contentType:"application/json"
		});
		var ret = random();
		if(ret==1)
		{
			transition();
			display();
		}
		else
		{
			alert("Incorrect Credentials");
		}
	});
});

function random()
{
	return true;
}

function transition()
{
	$('.editform').fadeIn();
	$('.screen').css("transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.screen').css("-webkit-transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.editform').css("transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.editform').css("-webkit-transition","all 1s cubic-bezier(0.910, 0.080, 0.450, 0.810)");
	$('.screen').css("transform","translateY(-100%)");
	$('.screen').css("-webkit-transform","translateY(-100%)");
	$('.screen').fadeOut();
}

function display()
{
	var no_records = get_records();
	for(var i = 0;i<no_records;i++)
	{
		$('.records ul').append("<li class = event> <div class = content> <span class= eventName></span><span class = \" edit manipButton\"><i class=\"fa fa-edit\"></i></span><span class=\"delete manipButton\" onclick=\"confirmBox(this)\"><i class=\"fa fa-trash \"></i></span></div></li>");
	}
}

function confirmBox(object)
{
	var response = confirm("Do you want to delete this?");
	console.log(object);
}

function get_records()
{
	return 6;
}