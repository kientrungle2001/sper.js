$(function(){
	setTimeout(function() {
		$('body').fadeIn('slow');
	}, 100);
	window.onbeforeunload = function(){
		$('body').fadeOut('slow');
	};
});