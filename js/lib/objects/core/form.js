PzkCoreForm = PzkObj.pzkExt({
	layout: 'form',
	table: 'news',
	defaults: false,
	init: function() {
		this.rand = [0, 100000].randomInt();
	},
	setData: function(data) {
		var that = this;
		for(var k in this.defaults) {
			if(typeof data[k] === 'undefined' || !data[k]) {
				data[k] = this.defaults[k];
			}
		}
		this.fieldSettings.forEach(function(field, index) {
			var fieldType = 'text';
			if(field.type && !form_html_field_types.contains(field.type)) {
				fieldType = field.type;
			}
			var func = window['form_field_'+fieldType+'_set_value'];
			if(func) {
				func.call(null, that, field, data);
			}
		});
	},
	getData: function() {
		var data = {};
		if(this.defaults) {
			$.extend(data, this.defaults);
		}
		var that = this;
		this.fieldSettings.forEach(function(field, index) {
			var fieldType = 'text';
			if(field.type && !form_html_field_types.contains(field.type)) {
				fieldType = field.type;
			}
			var func = window['form_field_'+fieldType+'_get_value'];
			if(func) {
				var value = func(that, field);
				if(null !== value) {
					data[field.index] = value;
					if(data[field.index] && is_array(data[field.index])) {
						data[field.index] = ',' + data[field.index].join(',') + ',';
					}
				}
			}
		});
		return data;
	},
	submit: function() {
		var data = this.getData();
		for(var k in data) {
			if(false === data[k]) {
				data[k] = '';
			}
			data[k] = '' + data[k];
		}
		console.log(data);
		this.onSubmit(data);
	},
	onSubmit: function(data) {
		if(data.id && data.id != '')  {
			this.onBeforeUpdate(data);
			_db().Update(this.table).Set(data).WhereId(data.id).Result();
			this.onUpdate(data);
		} else {
			this.onBeforeInsert(data);
			var insertedId = _db().Insert(this.table).Fields(this.fields).Values(data).Result();
			this.onInsert(data, insertedId);
		}
	},
	onUpdate: function(data) {
		alert('updated');
	},
	onInsert: function(data, insertedId) {
		alert('inserted');
	},
	onBeforeUpdate: function(data) {
		if(this.fields.contains('modified'))
			data.modified = date('Y-m-d H:i:s', serverTime);
	},
	onBeforeInsert: function(data) {
		if(this.fields.contains('created'))
			data.created = date('Y-m-d H:i:s', serverTime);
	}
});

form_html_field_types = ['button',
'checkbox',
'color',
'date',
'datetime-local',
'email',
'file',
'hidden',
'image',
'month',
'number',
'password',
'radio',
'range',
'reset',
'search',
'submit',
'tel',
'text',
'time',
'url',
'week'];

function form_field_html(field, item) {
	var fieldType = 'text';
	if(field.type && !form_html_field_types.contains(field.type)) {
		fieldType = field.type;
	}
	var func = window['form_field_'+fieldType+'_html'];
	if(func) {
		return func(field, item);
	}
	return '';
}

function form_field_text_html(field, item) {
	return tmpl(heredoc(function() {/*
	<div class="form-group">
    <label for="(*= data.field.index*)">(*= data.field.label*)</label>
    <input type="(*= data.field.type*)" class="form-control" name="(*= data.field.index*)" value="(*= html_entity_decode((data.item && data.item[data.field.index]) || data.field.value || '')*)" />
	</div>*/}), {field: field, item: item});
}

function form_field_textarea_html(field, item) {
	return tmpl(heredoc(function() {/*
	<div class="form-group">
    <label for="(*= data.field.index*)">(*= data.field.label*)</label>
    <textarea rows="15" class="form-control" name="(*= data.field.index*)">(*= html_entity_decode((data.item && data.item[data.field.index]) || data.field.value || '')*)</textarea>
	</div>*/}), {field: field, item: item});
}

function form_field_editor_html(field, item) {
	return tmpl(heredoc(function() {/*
	<div class="form-group">
    <label for="(*= data.field.index*)">(*= data.field.label*)</label>
    <textarea id="(*= co.id*)-editor-(*= data.field.index*)-(*= co.rand *)" class="form-control tinymce" name="(*= data.field.index*)">(*= html_entity_decode((data.item && data.item[data.field.index]) || data.field.value || '')*)</textarea>
	</div>*/}), {field: field, item: item});
}

function form_field_media_html(field, item) {
	return tmpl(heredoc(function() {/*
	<div class="form-group">
    <label for="(*= data.field.index*)">(*= data.field.label*)</label>
    <input type="(*= data.field.type*)" class="form-control" id="(*= co.id*)-media-(*= data.field.index*)" name="(*= data.field.index*)" value="(*= html_entity_decode((data.item && data.item[data.field.index]) || data.field.value || '')*)" />
	<button type="button" class="btn btn-primary" data-toggle="modal"
				data-target="#modal-(*= co.id*)">Select</button>
	<div id="modal-(*= co.id*)" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">(*= data.field.label*)</h4>
				</div>
				<iframe width="100%" height="400"
					src="/3rdparty/Filemanager/filemanager/dialog.php?type=0&field_id=(*= co.id*)-media-(*= data.field.index*)&fldr="
					frameborder="0"
					style="overflow: scroll; overflow-x: hidden; overflow-y: scroll;"></iframe>
			</div>
		</div>
	</div>
	</div>*/}), {field: field, item: item});
}

function form_field_select_html(field, item) {
	if(!field.options) {
		field.options = field.loader.call(null, field, item);
	}
	if(field.treeMode) {
		if(!field._builded) {
			field.options = buildBottomTree(field.options);
			field.options = treefy(field.options, 0);
			field._builded = true;
		}
	}
	return tmpl(heredoc(function() {/*
	(* var val = (data.item && data.item[data.field.index]) || data.field.value || ''; *)
	<div class="form-group">
    <label for="(*= data.field.index*)">(*= data.field.label*)</label>
    <select class="form-control" (* if(data.field.multiple){ *)size="30" multiple(*}*) name="(*= data.field.index*)" value="(*= html_entity_decode(val)*)">
		<option value="">(*= data.field.label*)</option>
		(* data.options.forEach(function(option, index) { *)
			<option value="(*= option.value *)" (* if(option.value == val) { *)selected(* } *)>(*= (data.field.treeMode ? (option.treeLevel ? '|<span style="opacity: 0;">____</span>'.repeat(option.treeLevel-1) + '|____' : ''): '')*)(*= option.label *)</option>
		(* });*)
	</select>
	</div>*/}), {field: field, item: item, options: field.options});
}

function form_field_text_get_value(frm, field) {
	var value = $('#' + frm.id).find('[name='+field.index+']').val();
	if(field.type && field.type == 'datetime-local') {
		value = value.replace('T', ' ') + ':00';
	}
	return value;
}
function form_field_text_set_value(frm, field, item) {
	return $('#' + frm.id).find('[name='+field.index+']').val(item[field.index] || '');
}

function form_field_textarea_set_value(frm, field, item) {
	return $('#' + frm.id).find('[name='+field.index+']').val(item[field.index] || '');
}

function form_field_textarea_get_value(frm, field) {
	var value = $('#' + frm.id).find('[name='+field.index+']').val();
	return value;
}

function form_field_media_set_value(frm, field, item) {
	return $('#' + frm.id).find('[name='+field.index+']').val(item[field.index] || '');
}

function form_field_media_get_value(frm, field) {
	var value = $('#' + frm.id).find('[name='+field.index+']').val();
	return value;
}

function form_field_editor_set_value(frm, field, item) {
	return tinymce.get(frm.id + '-editor-'+field.index + '-' + frm.rand).setContent(item[field.index] || '');
}

function form_field_editor_get_value(frm, field) {
	var value = tinymce.get(frm.id + '-editor-'+field.index + '-' + frm.rand).getContent();
	return value;
}

function form_field_select_get_value(frm, field) {
	var value = $('#' + frm.id).find('[name='+field.index+']').val();
	return value;
}
function form_field_select_set_value(frm, field, item) {
	if(field.multiple) {
		return $('#' + frm.id).find('[name='+field.index+']').val(item[field.index] ? item[field.index].split(',') : [''] );
	} else {
		return $('#' + frm.id).find('[name='+field.index+']').val(item[field.index] || '');
	}
	
}

function closeModal(that, modalSelector) {
	var url = $(that).val();
	var res = url.replace(BASE_URL, '');
	$(that).val(res);
	$(modalSelector).modal('hide');
}

/* Form field generator */
function form_input(index, label, type = 'text') {
	return {index: index, label: label, type: type};
}

function form_media(index, label) {
	return {index: index, label: label, type: 'media'};
}

function form_editor(index, label) {
	return {index: index, label: label, type: 'editor'};
}

function form_textarea(index, label) {
	return {index: index, label: label, type: 'textarea'};
}

function form_select(index, label, options, treeMode = false) {
	if(typeof options == 'function') {
		return {index: index, label: label, type: 'select', loader: options, treeMode: treeMode};
	}
	return {index: index, label: label, type: 'select', options: options, treeMode: treeMode};
}

function form_select_multiple(index, label, options, treeMode = false) {
	if(typeof options == 'function') {
		return {index: index, label: label, type: 'select', multiple: true, treeMode: treeMode, loader: options};
	}
	return {index: index, label: label, type: 'select', multiple: true, treeMode: treeMode, options: options};
}

function form_status(index, label) {
	return form_select(index, label, [
		{value: 1, label: 'Bật'}, {value: 0, label: 'Tắt'}
	]);
}

function form_size(setting, size) {
	return $.extend(setting, {mdSize: size});
}