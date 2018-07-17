PzkList = PzkObj.pzkExt({
	layout: 'list',
	
	table: 'news',
	fields: '*',
	
	conds: 1,
	orderBy: 'id asc',
	
	pageSize: 100,
	pageNum: 0,
	
	groupBy: false,
	havingConds: false,
	
	entity: false,
	joins: false,
	filters: false,
	filterBys: false,
	init: function() {
		if(!this.joins) {
			this.joins = {};
		}
		if(!this.filters) {
			this.filters = array();
		}
		if(!this.filterBys) {
			this.filterBys = {};
		}
		this.pageSize = parseInt(this.pageSize);
		this.pageNum = parseInt(this.pageNum);
	},
	loadData: function() {
		this.data = {};
		var items = this.getQuery().Result(this.entity);
		this.data.items = items;
		var totalItems = this.getQuery(true).ResultOne();
		this.data.totalItems = parseInt(totalItems.total);
		this.data.pages = Math.ceil(parseFloat(this.data.totalItems) / this.pageSize);
	},
	getQuery: function(isCount = false) {
		var query = _db();
		if(!isCount) {
			query.Select(this.fields);
			query.Limit(this.pageSize, this.pageNum);
		} else {
			query.Select('count(*) as total');
		}
		query.From(this.table).Where(this.conds);
		query.OrderBy(this.orderBy);
		
		query.GroupBy(this.groupBy).Having(this.havingConds);
		if(this.joins) {
			$.each(this.joins, function(table, join) {
				query.Join(table, join.conds, join.type || 'inner');
			});
		}
		if(this.filters) {
			$.each(this.filters, function(index, filter) {
				query.Where(filter);
			});
		}
		if(this.filterBys) {
			$.each(this.filterBys, function(index, filter) {
				query.Where(filter);
			});
		}
		return query;
	},
	addFilter: function(column, value, type = 'equal') {
		this.filters.push([type, column, value]);
		return this;
	},
	join: function(table, conds, type = 'inner') {
		this.joins[table] = {
			conds: conds,
			type: type
		};
		return this;
	}
});