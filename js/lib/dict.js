if(mobileAndTabletcheck()) {
var oldText = null;
$(document).click(function(evt) {
	var s = window.getSelection();
    s.modify('move','backward','word');
    s.modify('extend','forward','word');
	var newText = s.toString();
	if(newText == oldText || newText == '') {
		
	} else {
		oldText = newText;
		doDblClick(evt);
	}
	
});	
}

function translateTl(that) {
	$(that).next().toggle();
}