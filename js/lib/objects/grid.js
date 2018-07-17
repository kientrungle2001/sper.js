pzk.lib('objects/list');
PzkGrid = PzkList.pzkExt({
	treeMode: false,
	adminMode: true,
	layout: 'grid',
	type: false,
	editable: true,
	insertable: true,
	multiple: true,
	getSortObject: function() {
		var sorter = PzkParser.parse('<db.grid.sort />');
		sorter.grid = this;
		return sorter;
	},
	getFilterObject: function() {
		var filter = PzkParser.parse('<db.grid.filter />');
		filter.grid = this;
		return filter;
	},
	getToolbarObject: function() {
		var toolbar = PzkParser.parse('<db.grid.toolbar />');
		toolbar.grid = this;
		return toolbar;
	},
	getHeaderObject: function() {
		var header = PzkParser.parse('<db.grid.header />');
		header.grid = this;
		return header;
	},
	getPaginationObject: function() {
		var pagination = PzkParser.parse('<db.grid.pagination />');
		pagination.grid = this;
		return pagination;
	},
	gotoPage: function(page) {
		this.$('tfoot a.page.btn-primary').removeClass('btn-primary').addClass('btn-default');
		this.$('tfoot a.page-'+page).addClass('btn-primary');
		this.pageNum = page;
		if(this.adminMode) {
			pzk_controller.getFilterSession().set('pageNum', page);
		}
		this.reload();
	},
	gotoSelectedPage: function() {
		var selectedPage = this.$('.gotoSelectedPage').val();
		selectedPage = parseInt(selectedPage) - 1;
		this.gotoPage(selectedPage);
	},
	changePageSize: function() {
		var pageSize = this.$('.changePageSize').val();
		this.pageSize = parseInt(pageSize);
		if(this.adminMode) {
			pzk_controller.getFilterSession().set('pageSize', pageSize);
		}
		this.reload();
	},
	sortBy: function(orderBy) {
		this.orderBy = orderBy;
		if(this.adminMode) {
			pzk_controller.getFilterSession().set('orderBy', orderBy);
		}
		this.reload();
	},
	filterBy: function(field, value, reload = true) {
		if(value != '') {
			if(this.adminMode) {
				if(reload) {
					pzk_controller.getFilterSession().set(field, value);
				}
			}
			var table = this.table;
			var comparator = 'equal';
			var closurable = false;
			this.filterSettings.forEach(function(filter) {
				if(filter.index == field) {
					if(typeof filter.table != 'undefined') {
						table = filter.table;
					}
					if(typeof filter.comparator != 'undefined') {
						comparator = filter.comparator;
					}
					if(typeof filter.closurable != 'undefined') {
						closurable = filter.closurable;
					}
				}
			});
			if(comparator == 'like') {
				if(closurable) {
					value = '%,' + value + ',%';
				} else {
					value = '%' + value + '%';
				}
			}
			this.filterBys[field] = [comparator, ['column', table, field], value];
		} else {
			delete this.filterBys[field];
			if(this.adminMode) {
				pzk_controller.getFilterSession().del(field);
			}
		}
		if(reload){
			this.reload();
		}
	},
	reload: function() {
		var that = this;
		this.$('tbody').html(this.html(true));
		this.checkReduce();
		this.fieldSettings.forEach(function(setting) {
			that.checkColumn(setting.index);
		});
		this.onRowContextMenu();
	},
	onRowContextMenu: function() {
		var that = this;
		$('.grid-row').contextMenu({
			menuSelector: '#gridContextMenu-' + that.id, menuSelected: function($invokedOn, $selectedMenu) {
				var $tr = $invokedOn.parents('tr:first');
				contextItemId = parseInt($tr.attr('rel'));
			}
		});
	},
	add: function(formData = {}) {
		this.onAdd(formData);
	},
	edit: function(id) {
		var item = this.getItem(id);
		this.onEdit(item);
	},
	getItem: function(id) {
		return _db().Select('*').From(this.table).WhereId(id).ResultOne();
	},
	onEdit: function(item) {
		var that = this;
		var tab = pzk.elements.tab;
		if(!tab.has('edit-' + item.id)) {
			var editForm = that.buildEditForm(item, item.type || '', item.metaType || '');
			var tabContent = editForm.html();
			tab.add('edit-' + item.id, 'Edit ' + item.id, tabContent);
			if(that.activeTabOnEdit) {
				tab.active('edit-' + item.id);
			}
			setTinymce();
			var waitingDuration = 1;
			editForm.fieldSettings.every(function(field) {
				if(field.type && field.type == 'editor') {
					waitingDuration = 2000;
					return false;
				}
				return true;
			});
			setTimeout(function() {
				editForm.setData(item);
			}, waitingDuration);
		}
	},
	onAdd: function(formData = {}) {
		var that = this;
		pzk_controller.addIndex = pzk_controller.addIndex || 1;
		var tab = pzk.elements.tab;
		if(!tab.has('add-index-' + pzk_controller.addIndex)) {
			var addForm = that.buildAddForm(pzk_controller.addIndex, formData.type || that.type, formData.metaType || that.metaType);
			var tabContent = addForm.html();
			tab.add('add-index-' + pzk_controller.addIndex, 'Add', tabContent);
			if(that.activeTabOnEdit) {
				tab.active('add-index-' + pzk_controller.addIndex);
			}
			setTinymce();
			setTimeout(function() {
				addForm.setData(formData);
			}, 2000);
		}
		pzk_controller.addIndex++;
	},
	buildEditForm: function(item, type, metaType) {
		
		var that = this;
		
		var module = pzk_controller.parse('<db.form id="formEdit' + type + metaType + item.id + '" layout="form" />');
		
		module.module = this.module;
		$.extend(module, {
			type: type,
			metaType: metaType,
			table: that.table
		});
		
		module.initFromDatabase();
		
		module.defaults = module.defaults || {};
		$.extend(module.defaults, {type: type, metaType: metaType});
		
		if(this.onUpdate) {
			module.onUpdate = this.onUpdate;
		}
		
		if(this.onBeforeUpdate) {
			module.onBeforeUpdate = this.onBeforeUpdate;
		}
		return module;
	},
	buildAddForm: function(addIndex, type, metaType) {
		var module = pzk_controller.parse('<db.form id="formAdd' + type + metaType +addIndex+'" layout="form" />');
		
		module.module = this.module;
		$.extend(module, {
			type: type,
			metaType: metaType,
			fields: this.addFields,
			fieldSettings: this.addFieldSettings || [],
			onInsert: function(data, insertedId) {
				pzk.elements.grid.reload();
			}
		});
		
		module.initFromDatabase();
		if(!module.table) {
			module.table = this.table;
		}
		
		module.defaults = module.defaults || {};
		$.extend(module.defaults, {type: type, metaType: metaType});
		
		module.fieldSettings.forEach(function(setting) {
			var value = null;
			if(value = pzk_request(setting.index)) {
				setting.value = value;
			}
		});
		
		if(this.onBeforeInsert) {
			module.onBeforeInsert = this.onBeforeInsert;
		}
		
		if(this.onInsert) {
			module.onInsert = this.onInsert;
		}
		
		return module;
	},
	onSelect: function() {
	},
	check: function(checked) {
		this.$('[name="ids[]"]').each(function(index, input){
			input.checked = checked;
			if(checked) {
				$(input).parents('tr:first').addClass('selected-row');
			} else {
				$(input).parents('tr:first').removeClass('selected-row');
			}
		});
		this.onSelect();
	},
	checkRow: function(input) {
		if(input.checked) {
			if(input.type == 'radio') {
				this.$('.selected-row').removeClass('selected-row');
			}
			$(input).parents('tr:first').addClass('selected-row');
		} else {
			$(input).parents('tr:first').removeClass('selected-row');
		}
		this.onSelect();
	},
	checkTrRow: function(tr) {
		var selected = $(tr).find('[name="ids[]"]');
		selected[0].checked = !selected[0].checked;
		this.checkRow(selected[0]);
	},
	getSelecteds: function() {
		var ids = [];
		this.$('[name="ids[]"]').each(function(index, input){
			if(input.checked) {
				ids.push(input.value);
			}
		});
		return ids;
	},
	getSelected: function() {
		var selecteds = this.getSelecteds();
		if(selecteds.length) {
			return selecteds[0];
		}
		return null;
	},
	del: function(id) {
		if(id) {
			if(confirm('Bạn có muốn xóa không?')){
				this.delItem(id);
				this.reload();
			}
		}
	},
	delItem: function(id) {
		_db().Delete().From(this.table).WhereId(id).Result();
	},
	delItems: function() {
		var selectedIds = this.getSelecteds();
		if(!selectedIds.length) {alert('Hãy chọn một bản ghi để xóa'); return false;}
		if(confirm('Bạn có muốn xóa không?')){
			var that = this;
			selectedIds.forEach(function(itemId) {
				that.delItem(itemId);
			});
			that.reload();
		}
	},
	showSelectParent: function(itemId) {
		var p = prompt('Nhập ID: ');
		if(p){
			_db().Update(this.table).Set({parent: p}).WhereId(itemId).Result();
			this.reload();
		}
	},
	selectParent: function(itemId) {
		var p = prompt('Nhập ID: ');
		if(p){
			_db().Update(this.table).Set({parent: p}).Where(['in', 'id', this.getSelecteds()]).Result();
			this.reload();
		}
	},
	setMetaType: function(itemId) {
		var p = prompt('Nhập Meta Type: ');
		if(p){
			_db().Update(this.table).Set({metaType: p}).Where(['in', 'id', this.getSelecteds()]).Result();
			this.reload();
		}
	},
	inlineEdit: function(itemId, index) {
		var p = prompt('Nhập Nội dung: ');
		if(p){
			var updation = {};
			updation[index] = p;
			_db().Update(this.table).Set(updation).WhereId(itemId).Result();
			this.reload();
		}
	},
	toggleLabel: function(index, itemId, label, labelElement) {
		$(labelElement).toggleClass('btn-primary');
		$(labelElement).toggleClass('btn-default');
		var item = _table(this.table, index).ResultId(itemId);
		var newLabel = '' ;
		if(item[index].contains(label)) {
			// replace ,label1,label2, --> ,label1,
			newLabel = item[index].replace(',' + label + ',', ',');
			newLabel = newLabel.replace(/^[,]+/g, '').replace(/$[,]+/g, '');
			if(newLabel != '') {
				newLabel = ',' + newLabel + ',';
			}
		} else {
			if(item[index] == '') {
				newLabel = ',' + label + ',';
			} else {
				newLabel = item[index] + label + ','
			}
		}
		newLabel = newLabel.replace(/[,]+/g, ',');
		var updation = {};
		updation[index] = newLabel;
		_db().Update(this.table).Set(updation).WhereId(itemId).Result();
	},
	locate: function() {
		return 'pzk.elements.' + this.id;
	},
	toggleReduce: function() {
		if(pzk.get('gridListReduced')) {
			pzk.set('gridListReduced', 0);
		} else {
			pzk.set('gridListReduced', 1);
		}
		this.checkReduce();
	},
	checkReduce: function() {
		if(pzk.get('gridListReduced')) {
			this.$('.grid-table table').addClass('table-reduce');
		} else {
			this.$('.grid-table table').removeClass('table-reduce');
		}
	},
	toggleColumn: function(index) {
		if(pzk.get('gridListColumnReduced' + index+this.table+this.type+this.metaType)) {
			pzk.set('gridListColumnReduced' + index+this.table+this.type+this.metaType, 0);
		} else {
			pzk.set('gridListColumnReduced' + index+this.table+this.type+this.metaType, 1);
		}
		this.checkColumn(index);
	},
	toggleMultiple: function() {
		this.multiple = !this.multiple;
		if(this.multiple) {
			this.$('[name="ids[]"]').attr('type', 'checkbox');
		} else {
			this.$('[name="ids[]"]').attr('type', 'radio');
		}
	},
	checkColumn: function(index) {
		if(pzk.get('gridListColumnReduced' + index+this.table+this.type+this.metaType)) {
			this.$('.grid-table table .column-' + index + ' .cell').addClass('hidden');
		} else {
			this.$('.grid-table table .column-' + index + ' .cell').removeClass('hidden');
		}
	},
	findField: function(index){
		return this.fieldSettings.find(function(field) {
			return field.index == index;
		});
	},
	up: function(index, id) {
		var item = this.getItem(id);
		var fieldValue = item[index];
		fieldValue = parseInt(fieldValue) - 1;
		var updation = {};
		updation[index] = fieldValue;
		_db().Update(this.table).Set(updation).WhereId(id).Result();
		this.reload();
	},
	down: function(index, id) {
		var item = this.getItem(id);
		var fieldValue = item[index];
		fieldValue = parseInt(fieldValue) + 1;
		var updation = {};
		updation[index] = fieldValue;
		_db().Update(this.table).Set(updation).WhereId(id).Result();
		this.reload();
	},
	ondrop: function(evt, parentId) {
		var itemId = (evt.dataTransfer.getData('itemId'));
		_db().Update(this.table).Set({'parent': parentId}).WhereId(itemId).Result();
		this.reload();
	},
	enable: function(itemId) {
		var updation = {status: 1};
		_db().Update(this.table).Set(updation).WhereId(itemId).Result();
		this.reload();
	},
	disable: function(itemId) {
		var updation = {status: 0};
		_db().Update(this.table).Set(updation).WhereId(itemId).Result();
		this.reload();
	}
});
function grid_editable(options) {
	options.editable = true;
	return options;
}
function grid_language(options) {
	options.language =  true;
	return options;
}
/* GRID FIELD TYPES */
function grid_text(index, label, maps = false){
	return {type: 'text', index: index, label: label, maps: maps};
}

function grid_link(index, label, link){
	return {type: 'link', index: index, label: label, link: link};
}

function grid_action(index, label, action){
	return {type: 'action', index: index, label: label, action: action};
}

function grid_label(index, label, options){
	return {type: 'label', index: index, label: label, options: options};
}

function grid_parent(index, label){
	return {type: 'parent', index: index, label: label};
}

function grid_ordering(index, label){
	return {type: 'ordering', index: index, label: label};
}

function grid_status(index, label){
	return {type: 'text', index: index, label: label, maps: {'0': '<span class="glyphicon glyphicon-ban-circle" style="color: red;"></span>', '1': '<span class="glyphicon glyphicon-ok-circle" style="color: blue;"></span>'}};
}

function grid_tree(index, label){
	return {type: 'text', index: index, label: label, treeMode: true, language: true};
}

function grid_image(index, label){
	return {type: 'image', index: index, label: label};
}

function grid_datetime(index, label, format = 'H:i d/m/Y'){
	return {type: 'datetime', index: index, label: label, format: format};
}

function grid_form(index, label, formSettings){
	return {type: 'form', index: index, label: label, formSettings: formSettings};
}

/* GRID FILTER FIELD TYPES */
function grid_filter_status(index, label) {
	return {
		index: index,
		label: label,
		options: [
			grid_option(0, 'Tắt'),
			grid_option(1, 'Bật')
		]
	};
}

function grid_filter_table(index, label, table, valueField, labelField) {
	return {
		index: index,
		label: label,
		filterTable: table,
		valueField: valueField,
		labelField: labelField,
		loader: function(setting) {
			return _db().Select('`' + setting.labelField + '` as label, `' + setting.valueField + '` as value').From(setting.filterTable).Result();
		}
	};
}

function grid_filter_select(index, label, options) {
	return {
		index: index,
		label: label,
		options: options
	};
}

function grid_filter_text(index, label) {
	return {
		index: index,
		type: 'text',
		label: label,
		comparator: 'like'
	};
}

function grid_option(value, label) {
	return {value: value, label: label};
}

/* GRID COLUMN TYPES DISPLAY */
function grid_field_html(item, column) {
	var columnType = column.type || 'text';
	var func = window['grid_field_'+columnType+'_html'];
	if(func) {
		return func(item, column);
	}
	return item[column.index];
}

function grid_field_text_html(item, column) {
	var content = item[column.index];
	if(column.maps) {
		if(typeof column.maps[content] !== 'undefined') {
			content = column.maps[content];
		}
	}
	if(column.language) {
		content = pzk_language(content);
	}
	return (column.treeMode? (item.treeLevel ? '|<span style="opacity: 0;">____</span>'.repeat(item.treeLevel-1) + '|____' : ''): '') + content;
}

function grid_field_link_html(item, column) {
	var link = column.link(item, column);
	return '<a href="'+link+'">'+column.label+'</a>';
}

function grid_field_action_html(item, column) {
	return '<a href="#" onclick="'+co.locate()+'.findField(\''+column.index+'\').action('+item.id+') ;return false;">'+column.label+'</a>';
}
function grid_field_ordering_html(item, column) {
	return '<a href="#" onclick="'+co.locate()+'.up(\''+column.index+'\', '+item.id+');return false;">UP</a> \
	<a href="#" onclick="'+co.locate()+'.down(\''+column.index+'\', '+item.id+');return false;">DOWN</a> ';
}

function grid_field_label_html(item, column) {
	var rs = '<div class="dropdown">\
  <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu'+item.id+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\
    Chọn\
    <span class="caret"></span>\
  </button>\
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu'+item.id+'">';
	column.options.forEach(function(opt, index) {
		var str = '<li><a class="btn btn-xs '+ (item[column.index].contains(opt.value) ? 'btn-primary': 'btn-default' ) +'" href="#" onclick="pzk.elements.'+co.id+'.toggleLabel(\''+column.index+'\', '+item.id+', \''+opt.value+'\', this); return false;">' + opt.label + '</a></li>';
		rs += str;
	});
	rs += '</ul></div>';
	return rs;
}

function grid_field_parent_html(item, column){
	return '<a href="#" onclick="pzk.elements.'+co.id+'.showSelectParent('+item.id+'); return false;">'+column.label+'</a>';
}

function grid_field_form_html(item, column){
	return form_field_html(column.formSettings, item);
}

pzk.lib('datetime');
function grid_field_datetime_html(item, column) {
	return date(column.format || 'H:i:s d/m/Y' , (new Date(item[column.index])).getTime() / 1000);
}

function grid_field_image_html(item, column) {
	return '<img style="width: '+(column.width || 120)+'px;" src="' + item[column.index] + '" />';
}

/* GRID FILTER TYPES DISPLAY */

function grid_filter_html(setting) {
	var settingType = setting.type || 'select';
	var func = window['grid_filter_'+settingType+'_html'];
	if(func) {
		return func(setting);
	}
}

function grid_filter_select_html(setting) {
	var html = '<select onchange="'+co.locate()+'.filterBy(\''+setting.index+'\', this.value);" class="filterField filterField-'+setting.index+' form-control" name="'+setting.index+'">';
	html += '<option value="">'+setting.label+'</option>';
	if(setting.loader) {
		setting.options = setting.loader(setting);
	}
	if(setting.options) {
		setting.options.forEach(function(opt, index) {
			html += '<option value="'+opt.value+'" '+(setting.value && opt.value == setting.value ? 'selected': '')+'>'+opt.label+'</option>';
		});
	}
	html += '</select>';
	return html;
}

function grid_filter_text_html(setting) {
	var html = setting.label + ' <input type="text" onkeyup="pzk.getElement(\''+co.id+'\').filterBy(\''+setting.index+'\', this.value);" style="width: '+(setting.width || '100%')+'" class="filterField filterField-'+setting.index+' form-control" name="'+setting.index+'" value="'+(setting.value || '')+'" />';
	return html;
}