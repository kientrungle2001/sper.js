PzkPage = PzkObj.pzkExt({
	init: function() {
		$('head title').text(this.title);
		//PzkObj.prototype.init.call(this);
		//pzk_super(PzkObj, 'init', this);
		this.supper(PzkObj, 'init');
	},
	layout: 'page'
});