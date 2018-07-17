function ajaxindicatorstart(text,formname)
{
	if(jQuery('#'+formname).find('#resultLoading').attr('id') != 'resultLoading'){
	jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="'+BASE_URL+'/default/skin/test/media/ajax-loader.gif"><div>'+text+'</div></div><div class="bg"></div></div>');
	}
	
	jQuery('#resultLoading').css({
		'width':'100%',
		'height':'100%',
		'position':'fixed',
		'z-index':'10000000',
		'top':'0',
		'left':'0',
		'right':'0',
		'bottom':'0',
		'margin':'auto'
	});	
	
	jQuery('#resultLoading .bg').css({
		'background':'#000000',
		'opacity':'0.7',
		'width':'100%',
		'height':'100%',
		'position':'absolute',
		'top':'0'
	});
	
	jQuery('#resultLoading>div:first').css({
		'text-align': 'center',
		'position': 'fixed',
		'top':'140px',
		'left':'0',
		'right':'0',
		'bottom':'0',
		'margin':'auto',
		'font-size':'16px',
		'z-index':'10',
		'color':'#ffffff'
		
	});

	jQuery('#resultLoading .bg').height('100%');
	jQuery('#resultLoading').fadeIn(300);
	jQuery('#'+formname).css('cursor', 'wait');
}

function ajaxindicatorstop(formname)
{
	jQuery('#resultLoading .bg').height('100%');
	jQuery('#resultLoading').fadeOut(300);
	jQuery('#'+formname).css('cursor', 'default');
}