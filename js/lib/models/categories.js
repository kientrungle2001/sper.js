PzkModelsCategories = {
	db: function() {
		var db = _db().Select('*').From('directory').Where(['type', 'category']);
		return db;
	}
};