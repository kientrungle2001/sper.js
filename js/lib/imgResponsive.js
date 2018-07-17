function addImageReposive() {
	
	$(".choice .ptnn-title img").each(function() {
		if($(this).width() > 100) {
			$(this).addClass('img-responsive');
		}
	});

	$(".choice table tr td img").each(function() {
		if($(this).width() > 100) {
			$(this).addClass('img-responsive');
		}
	});

	$(".popover-content img").each(function() {
		if($(this).width() > 100) {
			$(this).addClass('img-responsive');
		}
	});

	$(".choice img").each(function() {
		if($(this).width() > 100) {
			$(this).addClass('img-responsive');
		}
	});

	
}