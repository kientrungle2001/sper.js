var fontSize = 14;
function zoomIn() {
	fontSize += 2;
	$('.scrollquestion').css('font-size',  fontSize + "px");
	$('#document-detail').css('font-size',  fontSize + "px");
}
function zoomOut() {
	if(fontSize > 10){
		fontSize -= 2;
		//document.body.style.zoom  = fontSize + "px";
		$('.scrollquestion').css('font-size',  fontSize + "px");
		$('#document-detail').css('font-size',  fontSize + "px");
	}
}