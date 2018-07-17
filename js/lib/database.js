pzk.lib('crypt');
PzkDB = function(props){
	for(var k in props) {
		this[k] = props[k];
	}
	this.options = {};
};
PzkDB = PzkDB.pzkExt({
	Select: function(fields) {
		this.options.action = 'select';
		this.options.fields = fields;
		return this;
	},
	From: function(table) {
		this.options.table = table;
		return this;
	},
	Join: function(table, conds, type = 'inner') {
		if(!this.options['joins']) {
			this.options['joins'] = {};
		}
		this.options['joins'][table] = {
			'conds' : this.buildCondition(conds), 
			'type' : type
		};
		return this;
	},
	LeftJoin: function(table, conds) {
		return this.join(table, conds, 'left');
	},
	RightJoin: function(table, conds) {
		return this.join(table, conds, 'right');
	},
	Insert: function(table) {
        this.options['action'] = 'insert';
        this.From(table);
        return this;
    },
	Values: function(values) {
		if(!values[0]) {
			values = [values];
		}
        this.options['values'] = values;
        return this;
    },
	Fields: function(fields) {
		this.options['fields'] = fields;
		return this;
	},
	Delete: function() {
		this.options['action'] = 'delete';
		return this;
	},
	Update: function(table) {
		this.options['action'] = 'update';
		this.From(table);
		return this;
	},
	Set: function(values) {
        this.options['values'] = values;
        return this;
    },
	Where: function(conds) {
		var condsStr = buildCondition(conds);
		if(condsStr[0] !== '(') {
			condsStr = "(" + condsStr + ")";
		}
        this.options['conds'] = (this.options['conds'] || '1') + ' AND ' + condsStr;
        return this;
	},
	buildCondition: function(conds) {
		return buildCondition(conds);
	},
	WhereId: function(id) {
		return this.Where('id=' + parseInt(id));
	},
	WhereAnd: function(conds) {
		this.options.conds += ' and ' + conds;
		return this;
	},
	WhereOr: function(conds) {
		this.options.conds += ' or ' + conds;
		return this;
	},
	WhereActive: function() {
		return this.Where(['equal', 'status', 1]);
	},
	WhereAlias: function(alias) {
		return this.Where(['equal', 'alias', alias]);
	},
	WhereLabel: function(label) {
		return this.Where(['like', 'label', '%,' + label + ',%']);
	},
	Limit: function(pageSize, pageNum) {
		this.options.pageNum = pageNum;
		this.options.pageSize = pageSize;
		return this;
	},
	Result: function(entity = false) {
		//mysqli_query('set names utf-8', this.connId);
        
        if (this.isSelectQuery()) {
			return this.executeSelectQuery(entity);
        } else if (this.isInsertQuery()) {
			return this.executeInsertQuery(entity);
        } else if (this.isUpdateQuery()) {
			return this.executeUpdateQuery(entity);
        } else if (this.isMultiUpdateQuery()) {
			return this.executeMultiUpdateQuery(entity);
        } else if (this.isDeleteQuery()) {
			return this.executeDeleteQuery(entity);
        }
        return this;
	},
	isMultiUpdateQuery: function() {
		return false;
	},
	executeMultiUpdateQuery: function(entity) {
		return false;
	},
	isSelectQuery: function() {
		if(this.options['action'] && this.options['action'] == 'select') {
			return true;
		}
		return false;
	},
	executeSelectQuery: function(entity = false) {
		query = this.getSelectQuery();
		var token = this.GetToken();
		var queryEncrypted = this.encrypt(query, token);
		var rs = this.executeQuery(queryEncrypted);
		var rows = this.decrypt(rs, token);
		if(entity) {
			var model = pzk.getModel('models.entity.' + entity);
			return rows.map(function(row) {
				return new model(row);
			});
		}
		return rows;
	},
	isInsertQuery: function() {
		if(this.options['action'] && this.options['action'] == 'insert') {
			return true;
		}
		return false;
	},
	executeInsertQuery: function(entity = false) {
		var query = this.getInsertQuery();
		var token = this.GetToken();
		var queryEncrypted = this.encrypt(query, token);
		var rs = this.executeQuery(queryEncrypted);
		var id = this.decrypt(rs, token);
		return id;
	},
	getInsertQuery: function() {
		var vals = [];
		var columns = [];
		if(this.options['fields'] && is_string(this.options['fields'])) {
			columns = this.options['fields'].split(',').map(function(str){
				return str.trim();
			});
		}
		this.options['values'].forEach(function(value){
			var colVals = [];
			columns.forEach(function(col){
				col = col.replace('`', '');
				colVals.push("'" + mysql_escape(value[col] || '') + "'");
			});
			vals.push('(' + colVals.join(',') + ')');
		});
		var table = this.options['table'];
		var fields = this.options['fields'];

		var values = vals.join(',');
		
		var query = "insert into "+ table + "(" + fields + ") values " +  values;
		return query;
	},
	isUpdateQuery: function() {
		if(this.options['action'] && this.options['action'] == 'update') {
			return true;
		}
		return false;
	},
	executeUpdateQuery: function(entity = false) {
		var query = this.getUpdateQuery();
		var token = this.GetToken();
		var queryEncrypted = this.encrypt(query, token);
		var rs = this.executeQuery(queryEncrypted);
		var result = this.decrypt(rs, token);
		return result;
	},
	getUpdateQuery: function() {
		var vals = [];
		for(var key in this.options['values']) {
			var value = this.options['values'][key];
			vals.push('`' + key + '`=\'' + mysql_escape(value) + '\'');
		}
		var values = implode(',', vals);
		var query = "update `" + this.options['table'] + "` set " + values + " where " + this.options['conds'];
		return query;
	},
	isDeleteQuery: function() {
		if(this.options['action'] && this.options['action'] == 'delete') {
			return true;
		}
		return false;
	},
	executeDeleteQuery: function(entity = false) {
		var query = this.getDeleteQuery();
		var token = this.GetToken();
		var queryEncrypted = this.encrypt(query, token);
		var rs = this.executeQuery(queryEncrypted);
		var result = this.decrypt(rs, token);
		return result;
	},
	getDeleteQuery: function() {
		var query = "delete from `" + this.options['table'] + "`  where " + this.options['conds'];
		return query;
	},
	ResultOne: function(entity = false) {
		this.Limit(1, 0);
		var rows = this.Result(entity);
		if(rows.length) {
			return rows[0];
		} else {
			return null;
		}
	},
	
	ResultId: function(id, entity = false) {
		return this.WhereId(id).ResultOne(entity);
	},
	ResultWhere: function(conds, entity = false) {
		return this.Where(conds).Result(entity);
	},
	
	OrderBy: function(orderBy) {
		this.options.orderBy = orderBy;
		return this;
	},
	GroupBy: function(groupBy) {
		this.options.groupBy = groupBy;
		return this;
	},
	Having: function(conds) {
		this.options.having = conds;
		return this;
	},
	encrypt: function(str, token) {
		return str;
	},
	decrypt: function(str, token) {
		return JSON.parse(str);
	},
	Clear: function() {
		this.options = {};
		return this;
	},
	GetQuery: function() {
		var sql = 'select ' + (this.options.fields || '*') + ' from ' + (this.options.table || 'news') + ' where ' + this.buildCondition(this.options.conds) + (this.options.orderBy ? ' order by ' + this.options.orderBy : '');
		if(this.options['joins']) {
			var joins = this.options['joins'];
			for(var table in joins) {
				
				sql += ' ' + joins[table]['type'] + ' join ' + table + ' on ' + joins[table]['conds'];
			}
		}
		sql += (this.options.groupBy ? ' group by ' + this.options.groupBy : '')
		 + (this.options.having ? ' having ' + this.options.having : '') 
		 + (this.options.pageSize ? ' limit ' + (this.options.pageSize * this.options.pageNum) + ', ' + this.options.pageSize : '');
		return sql;
	},
	getSelectQuery: function() {
		var sql = 'select ' + (this.options.fields || '*') + ' from ' + (this.options.table || 'news');
		if(this.options['joins']) {
			var joins = this.options['joins'];
			for(var table in joins) {
				
				sql += ' ' + joins[table]['type'] + ' join ' + table + ' on ' + joins[table]['conds'];
			}
		}
		sql += ' where ' + this.buildCondition(this.options.conds) + (this.options.orderBy ? ' order by ' + this.options.orderBy : '');
		
		sql += (this.options.groupBy ? ' group by ' + this.options.groupBy : '')
		 + (this.options.having ? ' having ' + this.options.having : '') 
		 + (this.options.pageSize ? ' limit ' + (this.options.pageSize * this.options.pageNum) + ', ' + this.options.pageSize : '');
		return sql;
	},
	GetToken: function() {
		return '';
	},
	executeQuery: function(query) {
		// console.log(query);
		query = Base64.encode(query);
		var result = null;
		var token = MD5(query + serverTime);
		var url = this.url;
		$.ajax({
			url: url,
			data: {
				query: query,
				serverTime: serverTime,
				token: token
			},
			type: 'post',
			async: false,
			success: function(resp) {
				result = Base64.decode(resp);
			}
		});
		return result;
	},
	buildCondition: function(conds) {
		return conds || 1;
	},
	
	Query: function(Sql) {
		var query = Sql;
		var token = this.GetToken();
		var queryEncrypted = this.encrypt(query, token);
		var rs = this.executeQuery(queryEncrypted);
		var rows = this.decrypt(rs, token);
		return rows;
	},
	Load: function(options){
		this.options = options;
		return this;
	},
	LoadSelect: function(options) {
		options.action = 'select';
		if(!options.pageSize) {
			options.pageSize = 100;
		}
		if(!options.pageNum) {
			options.pageNum = 0;
		}
		if(!options.fields) {
			options.fields = '*';
		}
		if(!options.orderBy) {
			options.orderBy = 'id asc';
		}
		
		this.options = options;
		return this;
	},
	GetFields: function(table) {
		var fields = this.Query('describe `' + table +'`');
		return fields;
	}
	
});
function _db(url = '/query.php') {
	return new PzkDB({url: url});
};
function _table(table, fields = '*', conds = false) {
	var query = _db().Select(fields).From(table);
	if(conds) {
		return query.Where(conds);
	}
	return query;
}
function _db_table(table) {
	return _db().From(table);
}
function _directory(type, metaType = false, fields = '*') {
	if(!metaType)
		return _table('directory', fields, ['equal', 'type', type]);
	return _table('directory', fields, ['and', ['equal', 'type', type], ['equal', 'metaType', metaType]]);
}
db_operations = ['column', 'string', 'equal', 'and', 'or', 'ne',
		'like', 'notlike', 'in', 'notin',
		'isnull', 'isnotnull', 'gte', 'lte', 'gt', 'lt', 'sql'];
function buildCondition(conds) {
	if(is_string(conds) || is_numeric(conds)) {
		return conds;
	} else if(is_array(conds)) {
		conds = conds.clone();
		var op = strtolower(conds[0]);
		if(db_operations.contains(op)) {
			conds.shift();
			var func = db_functions['mf_' + op];
			if(op == 'and' || op == 'or') {
				return func(conds);
			}
			return func.apply(null, conds);
		}
	}
}

db_functions = {
	mf_and: function(condsList) {
		return condsList.map(function(conds) {
			return buildCondition(conds);
		}).join(' and ');
	},
	mf_or: function(condsList) {
		return condsList.map(function(conds) {
			return buildCondition(conds);
		}).join(' or ');
	},
	mf_equal: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + '=' + col2 + ')';
	},
	mf_in: function(col1, values) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		var inValues = values.map(function(value){
			return buildCondition(['string', value]);
		});
		return '(' + col1 + ' in (' + inValues.join(',') + '))';
	},
	mf_ne: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + '!=' + col2 + ')';
	},
	mf_like: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + ' like ' + col2 + ')';
	},
	mf_notlike: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + ' like ' + col2 + ')';
	},
	mf_gt: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + ' > ' + col2 + ')';
	},
	mf_lt: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + ' < ' + col2 + ')';
	},
	mf_gte: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + ' >= ' + col2 + ')';
	},
	mf_lte: function(col1, col2) {
		if(is_string(col1)) {
			col1 = buildCondition(['column', col1]);
		} else {
			col1 = buildCondition(col1);
		}
		if(is_string(col2) || is_numeric(col2)) {
			col2 = buildCondition(['string', col2]);
		} else {
			col2 = buildCondition(col2);
		}
		return '(' + col1 + ' <= ' + col2 + ')';
	},
	mf_column: function(table, col) {
		if(!col)
			return '`' + mysql_escape(table) + '`';
		else 
			return '`' + mysql_escape(table) + '`.`' + mysql_escape(col) + '`';
	},
	mf_string: function(str) {
		if(is_numeric(str)) {
			return str;
		}
		return '\'' + mysql_escape(str) + '\'';
	}
}

function mfAnd() {
	var rs = ['and'];
	for(var i = 0; i < arguments.length; i++){
		rs.push(arguments[i]);
	}
	return rs;
}

function mfOr() {
	var rs = ['or'];
	for(var i = 0; i < arguments.length; i++){
		rs.push(arguments[i]);
	}
	return rs;
}

function mfEqual(exp1, exp2) {
	return ['equal', exp1, exp2];
}

function mfNe(exp1, exp2) {
	return ['ne', exp1, exp2];
}

function mfGt(exp1, exp2){
	return ['gt', exp1, exp2];
}

function mfLt(exp1, exp2){
	return ['lt', exp1, exp2];
}

function mfGte(exp1, exp2){
	return ['gte', exp1, exp2];
}

function mfLte(exp1, exp2){
	return ['lte', exp1, exp2];
}

function mfLike(exp1, exp2){
	return ['like', exp1, exp2];
}

function mfNotLike(exp1, exp2){
	return ['notlike', exp1, exp2];
}

function mfIn(exp1, exp2){
	return ['in', exp1, exp2];
}

function mfType(type, metaType = false) {
	if(!metaType) {
		return mfEqual('type', type);
	} else {
		return mfAnd(mfEqual('type', type), mfEqual('metaType', metaType));
	}
}

function mfStatus(stt) {
	return mfEqual('status', stt);
}
function mfStatusEnabled() {
	return mfStatus(1);
}

function mfLabel(lbl) {
	return mfLike('label', '%,' + lbl + ',%');
}

function mfClass(cl) {
	return mfLike('classes', '%,' + cl + ',%');
}

function mysql_escape (val) {
	if(val === null) return '';
	val = '' + val;
  val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
    switch (s) {
      case "\0":
        return "\\0";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\b":
        return "\\b";
      case "\t":
        return "\\t";
      case "\x1a":
        return "\\Z";
      case "'":
        return "''";
      case '"':
        return '""';
      default:
        return "\\" + s;
    }
  });

  return val;
}

function mysql_expression(arr){
	var operation = arr[0];
	var leftHand = arr[1];
	var rightHand = arr[2];
	if(typeof rightHand != 'array') {
		return leftHand + ' ' + operation + ' \'' + mysql_escape(rightHand) + '\'';
	}
}