pzk.lib('objects/grid');
PzkDbGrid = PzkGrid.pzkExt({
	type: false,
	metaType: false,
	treeMode: true,
	table: 'directory',
	getConfig: function() {
		var config = null;
		if(this.metaType) {
			config = DirectoryModel.dbGrid()
				.WhereAlias(this.type + '-' + this.metaType)
				.WhereActive()
				.ResultOne();
			if(!config) {
				config = DirectoryModel.dbGrid()
					.WhereAlias(this.type)
					.WhereActive()
					.ResultOne();	
			}
		} else {
			config = DirectoryModel.dbGrid()
				.WhereActive()
				.WhereAlias(this.type)
				.ResultOne();
		}
		return config;
	},
	getEditConfig: function() {
		var config = null;
		if(this.metaType) {
			config = DirectoryModel.dbEdit()
				.WhereAlias(this.type + '-' + this.metaType)
				.WhereActive()
				.ResultOne();
			if(!config) {
				config = DirectoryModel.dbEdit()
					.WhereAlias(this.type)
					.WhereActive()
					.ResultOne();	
			}
		} else {
			config = DirectoryModel.dbEdit()
				.WhereAlias(this.type)
				.WhereActive()
				.ResultOne();
		}
		return config;
	},
	initFromDatabase: function() {
		var that = this;
		this.supper(PzkGrid, 'init');
		if(this.type) {
			
			var config = this.getConfig();
			if(config) {
				if(config.brief) {
					var cfg = null;
					eval('cfg = ' + config.brief + ';');
					console.log(cfg);
					$.extend(this, cfg);
				}
			}
			this.conds = ['equal', ['column', this.table, 'type'], this.type];
			if(this.metaType) {
				this.conds = ['and', this.conds, ['equal', ['column', this.table, 'metaType'], this.metaType]];
			}
		}
		this.fieldSettings = this.fieldSettings || [
			that.getListField('name', grid_tree('name', 'Tiêu đề')),
			that.getListField('alias', grid_text('alias', 'Bí danh')),
			that.getListField('path', grid_text('path', 'Đường dẫn')),
			that.getListField('ordering', grid_tree('ordering', 'Thứ tự')),
			that.getListField('created', grid_datetime('created', 'Ngày tạo')),
			that.getListField('modified', grid_datetime('modified', 'Ngày sửa')),
			that.getListField('image', grid_image('image', 'Hình Ảnh')),
			that.getListField('type', grid_text('type', 'Loại')),
			that.getListField('metaType', grid_text('metaType', 'Meta Type')),
			that.getListField('note', grid_text('note', 'Ghi chú')),
			that.getListField('parent', grid_parent('parent', 'Thêm vào')),
			that.getListField('addChild', grid_action('addChild', 'Thêm con', function(itemId) {
				pzk.elements.grid.add({parent: itemId});
			})),
			that.getListField('label', 
				grid_label('label', 'Nhãn', [
					{value: 'trial', label: 'trial'}, 
					{value: 'document', label: 'document'}, 
					{value: 'featured', label: 'featured'}, 
					{value: 'practice', label: 'practice'}, 
					{value: 'test', label: 'test'}, 
					{value: 'disabled', label: 'disabled'}, 
					{value: 'checked', label: 'checked'}, 
					{value: 'locked', label: 'locked'}, 
					{value: 'hasimage', label: 'hasimage'}, 
					{value: 'hasaudio', label: 'hasaudio'}, 
					{value: 'translated', label: 'translated'} 
					]
					.filter(that.specificListLabelFieldFilter || function(item) {return true;}) 
				)),
			that.getListField('classes', 
				grid_label('classes', 'Lớp', [
					{value: '3', label: '3'}, 
					{value: '4', label: '4'}, 
					{value: '5', label: '5'}
				])),
			that.getListField('status', grid_status('status', 'Trạng thái'))
		].concat(that.extraListFieldSettings || []).filter(function(item) {return item !== -1;});
	},
	getListField: function(field, defaultSetting) {
		return this.specificListFieldSettings && this.specificListFieldSettings[field] || defaultSetting;
	},
	configureGrid: function() {
		if(this.type) {
			var config = this.getConfig();
			if(config) {
				this.onEdit(config);
			} else {
				this.onAdd({type: 'Grid', metaType: '', 
					alias: this.metaType ? this.type+'-'+this.metaType: this.type, 
					name: this.metaType ? this.type+'-'+this.metaType: this.type,
					brief: heredoc(function() {/*
{
	table: 'directory',
	fields: '*',
	orderBy: 'directory.id asc',
	treeMode: true,
	specificListFieldSettings: {
		name: grid_tree('name', 'Tiêu đề'),
		path: -1,
		file: -1,
		url: -1,
		image: -1,
		note: -1,
		type: -1,
		link: -1,
		created: -1,
		modified: -1,
		ordering: -1,
		label: -1,
		metaType: -1,
		classes: -1,
		addChild: -1
	}
}
					*/})
					});
			}
		}
	},
	configureEdit: function() {
		if(this.type) {
			var config = this.getEditConfig();
			if(config) {
				this.onEdit(config);
			} else {
				this.onAdd({type: 'Edit', metaType: '', 
					alias: this.metaType ? this.type+'-'+this.metaType: this.type, 
					name: this.metaType ? this.type+'-'+this.metaType: this.type,
					brief: heredoc(function(){/*
{
specificFieldSettings: {
content: -1,
parent: -1,
relatedIds: -1,
note: -1,
path: -1,
file: -1,
url: -1,
link: -1,
image: -1
}
}
					*/})});
			}
		}
	}
});