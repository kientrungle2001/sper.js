pzk.lib('objects/htmltag');
PzkContainer = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'container ' + this['class'] : 'container'
	}
});