function callwhen(conds, callback) {
	var condsComeTrue = false;
	var intervalId = setInterval(function() {
		condsComeTrue = conds();
		if(condsComeTrue) {
			callback();
		}
	}, 10);
}