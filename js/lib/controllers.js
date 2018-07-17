PzkBackendController = PzkController.pzkExt({
	masterPage: 'pages/admin',
	masterPosition: 'wrapper',
	isLogin: function() {
		if(!pzk_session('adminId')) {
			window.location = '/'+STARTUP_SCRIPT + '/admin_login';
			return false;
		}
		return true;
	}
});

PzkAdminController = PzkBackendController.pzkExt({
	table: false,
	childTables: false,
	customModule: false,
	module: false,
	logable: false,
	logFields: false,
	_session: false,
	_filterSession: false,
	editActions: false,
	addActions: false,
	activeTabOnEdit: false,
	init: function() {
		var names = controller.split('_');
		names.shift();
		this.module = names.join('_');
		if(!this.table)
			this.table = this.module;
		pzk.lib('stores');
	},
	getSession: function() {
		if(!this._session) {
			this._session = new PzkPrefixStorage(pzk);
			this._session.prefix = this.module;
		}
		return this._session;
	},
	getFilterSession: function() {
		if(!this._filterSession) {
			this._filterSession = new PzkPrefixStorage(this.getSession());
			this._filterSession.prefix = 'filter';
		}
		return this._filterSession;
	},
	index: function() {
		var module = this.parse('pages/admin/' + (this.customModule || this.module) + '/index');
		module.module = this.module;
		this.initPage();
		this.append(module);
		this.display();
	},
	add: function() {
		var module = this.parse('pages/admin/' + (this.customModule || this.module) + '/add');
		module.module = this.module;
		module.fieldSettings = this.addFieldSettings;
		module.actions = this.addActions;
		module.label = this.addLabel;
		this.initPage();
		this.append(module);
		this.display();
	},
	edit: function(id) {
		var module = this.parse('pages/admin/' + (this.customModule || this.module) + '/edit');
		module.module = this.module;
		module.fieldSettings = this.addFieldSettings;
		module.actions = this.addActions;
		module.label = this.addLabel;
		
		this.initPage();
		this.append(module);
		this.display();
	},
	del: function(id) {
	}
});

pzk.lib('objects/db/grid');
pzk.lib('objects/db/form');
PzkAdminGridController = PzkAdminController.pzkExt({
	customModule: 'grid',
	init: function() {
		PzkAdminController.supper('init', this);
	},
	index: function(type, metaType) {
		if(this.isLogin()) {
			var that = this;
			var module = this.parse('pages/admin/' + (this.customModule || this.module) + '/index');
			module.module = this.module;
			var grid = pzk.getElement('grid');
			
			if(grid) {
				grid.type = type || this.type;
				this.type = grid.type;
				
				grid.metaType = metaType || this.metaType || false;
				this.metaType = grid.metaType;
				
				grid.initFromDatabase();
			}
			this.initPage();
			this.append(module);
			this.display();
			
			var tab = pzk.elements.tab;
			tab.attachEvents();
			setTimeout(function() {
				for(var elem in pzk.elements) {
					if(pzk.elements[elem].layout == 'grid') {
						pzk.elements[elem].checkReduce();
						pzk.elements[elem].checkColumn();
						pzk.elements[elem].fieldSettings.forEach(function(setting) {
							pzk.elements[elem].checkColumn(setting.index);
						});
					}
				}
				grid.onRowContextMenu();
			}, 1000);
			
		}
	}
});

PzkAdminDirectoryGridController = PzkAdminGridController.pzkExt({
	table: 'directory',
	type: false,
	metaType: false,
	specificEditFieldSettings: false,
	specificAddFieldSettings: false,
	disable: function(field, mode) {
		if( typeof mode == 'undefined' ) {
			mode = 'all';
		}
		if(is_array(field)) {
			var that = this;
			field.forEach(function(item, index) {
				that.disable(item);
			});
			return this;
		} else if(is_string(field) && field.contains(',')) {
			var fields = field.explodetrim(',');
			var that = this;
			fields.forEach(function(item, index) {
				that.disable(item, mode);
			});
			return this;
		}
		if(mode == 'all') {
			this.specificAddFieldSettings[field] = -1;
			this.specificEditFieldSettings[field] = -1;
		} else if(mode == 'add') {
			this.specificAddFieldSettings[field] = -1;
		} else if (mode == 'edit') {
			this.specificEditFieldSettings[field] = -1;
		}
		return this;
	},
	setField: function(field, settings, mode) {
		if( typeof mode == 'undefined' ) {
			mode = 'all';
		}
		if(mode == 'all') {
			this.specificAddFieldSettings[field] = settings;
			this.specificEditFieldSettings[field] = settings;
		} else if(mode == 'add') {
			this.specificAddFieldSettings[field] = settings;
		} else if (mode == 'edit') {
			this.specificEditFieldSettings[field] = settings;
		}
		return this;
	}
});