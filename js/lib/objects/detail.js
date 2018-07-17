PzkList = PzkObj.pzkExt({
	layout: 'detail',
	
	table: 'news',
	fields: '*',
	
	conds: 1,
	orderBy: 'id asc',
	
	pageSize: 10,
	pageNum: 0,
	
	groupBy: false,
	havingConds: false,
	
	entity: false,
	loadData: function() {
		this.data = _db().Select(this.fields).From(this.table).Where(this.conds).OrderBy(this.orderBy).Limit(this.pageSize, this.pageNum).GroupBy(this.groupBy).Having(this.havingConds).ResultOne(this.entity);
	}
});