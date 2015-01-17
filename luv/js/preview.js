$('.document').ready(function(){
	resetForm();
	$('.preview').click(
	function(){
		//first use a check function to check if the values are all filled or not
		var isFilled = checkForm();
		if(isFilled == true)
		{
			$('.form1 .ename').text($('.eform .ename').val());
			$('.form1 .edesc').text($('.eform .desc').val());
			$('.form1 .evenue').text($('.eform .venue').val());
			$('.form1 .ecoord').text($('.eform .coord1').val()+", "+$('.eform .coord2').val());
			$('.form1 .edate').text($('.eform .dateC').val());
			$('.form1').slideDown("slow");
		}
	});
}
);

function resetForm()
{
	$('.eform')[0].reset();
}
function checkForm()
{
	var isEmpty = false;
	if($('.eform .ename').val()==""){$('.enamef').addClass("field error");isEmpty = true;}
	if($('.eform .desc').val()==""){$('.edescf').addClass("field error");isEmpty = true;}
	if($('.eform .venue').val()==""){$('.evenue').addClass("field error");isEmpty = true;}
	if($('.eform .coord1').val()=="" && $('.eform .coord2').val()==""){$('.coord').addClass("field error");isEmpty = true;}
	if($('.eform .dateC').val()==""){$('.edate').addClass("field error");isEmpty = true;}
	if(isEmpty==true)
	{
		//show a div at the top with some fields missing error
		$('html,body').animate({scrollTop:"0px"},"slow");
		$('.errmess').slideDown();
		return false;
	}
	else return true;
}