PzkTestComplex = PzkComplexObj.pzkExt({	
	layout: layoutRoot + '/complex/test.html',
	loadData: function() {
		this.data = {
			items: [
				{
					id: 1,
					title: 'Kiên Lê Trung'
				},
				{
					id: 2,
					title: 'Lê Trung Kiên'
				}
			]
		};
	}
});