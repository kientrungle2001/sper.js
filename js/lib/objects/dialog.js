PzkDialog = PzkList.pzkExt({
	layout: 'dialog',
	title: 'Dialog title',
	show: function() {
		this.$().modal({backdrop: 'static', keyboard: false});
	},
	hide: function() {
		this.$().modal('hide');
	}
});