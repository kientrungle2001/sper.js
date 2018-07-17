pzk.lib('objects/empty');
PzkInclude = PzkEmpty.pzkExt({
	src: false,
	init: function() {
		var includeLayout = pzk_controller.getLayout(this.src);
		this.children.push(pzk_controller.parse(includeLayout));
	}
});