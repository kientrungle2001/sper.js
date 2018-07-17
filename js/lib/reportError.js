//report
function reportError(questionId){
	var contentError = $('#contentError'+questionId).val();
	if(contentError.length < 3){
		alert('Nội dung phải nhiều hơn 3 kí tự');
		$('#contentError'+questionId).focus();
		return false;
	}else{
		$(this).prop( "disabled", true );
		$.ajax({
		  method: "POST",
		  url: "/practice/reportError",
		  data: { contentError: contentError, questionId: questionId }
		}).done(function( msg ) {
			if(msg ==1){
				alert('Báo lỗi thành công!');
				$('#contentError'+questionId).val('');
				$(this).prop( "disabled", false );
				$('#report'+questionId).modal('hide');
			}
			 
		});
		
		return false;
	}
}