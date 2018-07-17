pzk.lib('objects/complex/list');
PzkComplexGrid = PzkComplexList.pzkExt({
	layout: layoutRoot + '/complex/grid.html',
	reload: function() {
		$('#' + this.id + ' tbody').html(this.html(true));
		$('#' + this.id + ' tbody').hide();
		$('#' + this.id + ' tbody').fadeIn('slow');
	},
	setOrderBy: function(orderBy) {
		this.orderBy = orderBy;
		this.reload();
	}
});