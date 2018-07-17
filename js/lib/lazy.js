all_content_loaders = [];
function AddMoreContent() {
	if(all_content_loaders.length) {
		var handler = all_content_loaders.shift();
		handler();
	}
}
$(function() {
	$(window).scroll(function(){
		if  ($(window).scrollTop() == $(document).height() - $(window).height()){
			AddMoreContent();
		}
	});
});
function lazy_load(handler) {
	all_content_loaders.push(handler);
	if(mobileAndTabletcheck()) {
		AddMoreContent();
	}
}