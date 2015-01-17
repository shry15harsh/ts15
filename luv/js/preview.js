$('.document').ready(function(){
	resetForm();
	$('.preview').click(
	function(){
		//first use a check function to check if the values are all filled or not
		var isFilled = checkForm();
		if(isFilled == true)
		{
			$('.previewForm .ename').text($('.eventForm .ename').val());
			$('.previewForm .edesc').text($('.eventForm .desc').val());
			$('.previewForm .evenue').text($('.eventForm .venue').val());
			$('.previewForm .ecoord').text($('.eventForm .coord1').val()+", "+$('.eventForm .coord2').val());
			$('.previewForm .edate').text($('.eventForm .dateC').val());
			$('html,body').animate({scrollTop:"750px"},"slow");
			$('.previewForm').slideDown("slow");
		}
	});
}
);

function resetForm()
{
	$('.eventForm')[0].reset();
}
function checkForm()
{
	var isEmpty = false;
	if($('.eventForm .ename').val()==""){$('.enamef').addClass("field error");isEmpty = true;}
	if($('.eventForm .desc').val()==""){$('.edescf').addClass("field error");isEmpty = true;}
	if($('.eventForm .venue').val()==""){$('.evenue').addClass("field error");isEmpty = true;}
	if($('.eventForm .coord1').val()=="" && $('.eventForm .coord2').val()==""){$('.coord').addClass("field error");isEmpty = true;}
	if($('.eventForm .dateC').val()==""){$('.edate').addClass("field error");isEmpty = true;}
	if(isEmpty==true)
	{
		//show a div at the top with some fields missing error
		$('html,body').animate({scrollTop:"0px"},"slow");
		$('.errorMessage').slideDown();
		return false;
	}
	else return true;
}