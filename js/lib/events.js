$.fn.binds = function(events, handler) {
	var evts = events.explodetrim(',');
	var that = this;
	$.each(evts, function(index, evt) {
		that.bind(evt, handler);
	});
};