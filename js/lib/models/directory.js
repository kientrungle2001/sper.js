PzkModelsDirectory = {
	db: function(type) {
		var db = _db().Select('*').From('directory');
		if(typeof type !== 'undefined')
			db.Where(['equal', 'type', type]);
		return db;
	},
	dbGrid: function() {
		return this.db('Grid');
	},
	dbEdit: function() {
		return this.db('Edit');
	},
	result: function(type, conds, entity) {
		if(typeof entity == 'undefined')
			entity = false;
		return this.db(type).Where(conds).Result(entity);
	},
	resultOne: function(type, conds, entity) {
		if(typeof entity == 'undefined')
			entity = false;
		return this.db(type).Where(conds).ResultOne(entity);
	},
	gridResult: function(conds, entity) {
		if(typeof entity == 'undefined')
			entity = false;
		return this.dbGrid().Where(conds).Result(entity);
	},
	gridResultOne: function(conds, entity) {
		if(typeof entity == 'undefined')
			entity = false;
		return this.dbGrid().Where(conds).ResultOne(entity);
	},
	editResult: function(conds, entity) {
		if(typeof entity == 'undefined')
			entity = false;
		return this.dbEdit().Where(conds).Result(entity);
	},
	editResultOne: function(conds, entity) {
		if(typeof entity == 'undefined')
			entity = false;
		return this.dbEdit().Where(conds).ResultOne(entity);
	}
};