pzk.lib('objects/core/form');
PzkDbForm = PzkCoreForm.pzkExt({
	type: false,
	metaType: false,
	initFromDatabase: function() {
		var that = this;
		this.supper(PzkCoreForm, 'init');
		if(this.type) {
			var config = null;
			if(this.metaType) {
				config = _db().Select('*').From('directory')
					.Where(['equal', 'alias', this.type + '-' + this.metaType])
					.Where(['equal', 'type', 'Edit'])
					.Where(['equal', 'status', 1])
					.ResultOne();
				if(!config) {
					config = _db().Select('*').From('directory')
						.Where(['equal', 'alias', this.type])
						.Where(['equal', 'type', 'Edit'])
						.Where(['equal', 'status', 1])
						.ResultOne();
				}
			} else {
				config = _db().Select('*').From('directory')
					.Where(['equal', 'alias', this.type])
					.Where(['equal', 'type', 'Edit'])
					.Where(['equal', 'status', 1])
					.ResultOne();
			}
			if(config) {
				if(config.brief) {
					var cfg = null;
					eval('cfg = ' + config.brief + ';');
					// console.log(cfg);
					$.extend(this, cfg);
				}
			}
			this.fields = 'name, type, metaType, alias, path, file, url, link, image, parent, relatedIds, ordering, status, brief, content, note, created, modified';
			if(!(this.fieldSettings && this.fieldSettings.length)) {
				this.fieldSettings =  [
					form_input('id', 'Id', 'hidden'),
					(that.specificFieldSettings && that.specificFieldSettings.type) ||  form_input('type', 'Loại'),
					(that.specificFieldSettings && that.specificFieldSettings.metaType) ||  form_input('metaType', 'Meta Type'),
					(that.specificFieldSettings && that.specificFieldSettings.name) ||  form_input('name', 'Tiêu đề'),
					(that.specificFieldSettings && that.specificFieldSettings.alias) ||  form_input('alias', 'Bí danh'),
					(that.specificFieldSettings && that.specificFieldSettings.path) ||  form_input('path', 'Đường dẫn'),
					(that.specificFieldSettings && that.specificFieldSettings.file) ||  form_media('file', 'File'),
					(that.specificFieldSettings && that.specificFieldSettings.url) ||  form_input('url', 'Url'),
					(that.specificFieldSettings && that.specificFieldSettings.link) ||  form_input('link', 'Liên kết'),
					(that.specificFieldSettings && that.specificFieldSettings.image) ||  form_media('image', 'Hình ảnh'),
					(that.specificFieldSettings && that.specificFieldSettings.parent) ||  form_select('parent', 'Danh mục cha', function (field, item) {
						return _db().Select('id as value, name as label, id, parent, parents').From('directory').Where("type='category'").OrderBy('ordering asc').Result();
					}, true), 
					(that.specificFieldSettings && that.specificFieldSettings.relatedIds) ||  form_select_multiple('relatedIds', 'Các mục liên quan', function (field, item) {
						return _db().Select('id as value, name as label, id, parent, parents').From('directory').Where("type='category'").OrderBy('ordering asc').Result();
					}, true), 
					(that.specificFieldSettings && that.specificFieldSettings.ordering) ||  form_input('ordering', 'Thứ tự'),
					(that.specificFieldSettings && that.specificFieldSettings.brief) ||  form_textarea('brief', 'Mô tả'),
					(that.specificFieldSettings && that.specificFieldSettings.content) ||  form_editor('content', 'Nội dung'),
					(that.specificFieldSettings && that.specificFieldSettings.note) ||  form_textarea('note', 'Ghi chú'),
					(that.specificFieldSettings && that.specificFieldSettings.status) ||  form_status('status', 'Trạng thái')
				].filter(function(item) { return item !== -1; });	
			}
			
		}
	}
});