PzkModel = function(data) {
	this.data = data;
};
PzkModelEntity = PzkModel.pzkExt({
	update: function(data) {
		// update data
		
	},
	insert: function() {
	},
	save: function() {
		// save record
		if(this.get('id')) {
			// update
		}
	},
	set: function(key, value) {
		this.data[key] = value;
	},
	get: function(key) {
		return this.data[key];
	}
});
pzk.getModel = function(path) {
	var names = path.split('.');
	var Names = names.map(function(name) {
		return name.ucfirst();
	});
	pzk.load('/js/lib/' + names.join('/') + '.js');
	var className = 'Pzk' + Names.join('');
	return window[className];
}