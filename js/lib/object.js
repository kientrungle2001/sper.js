PzkObj = (function(props) {
	$.extend(this, props || {});
}).pzkImpl({
	init : function() {
		// console.log(this.tagName);
	},
	finish : function() {
		// console.log('/' + this.tagName);
	},
	defaultWrapper: false,
	$ : function(selector) {
		if (typeof selector == 'undefined') {
			var selected = $('#' + this.id);
			if(selected.length) {
				return selected;
			} else {
				if(this.defaultWrapper)
					return $(this.defaultWrapper);
				return $('<div id="' + this.id + '"></div>');
			}
		}
		return $(selector, '#' + this.id);
	},
	toJson : function() {
		var rs = {};
		for ( var k in this) {
			if ((typeof this[k] != 'function')
					&& (typeof this[k] != 'object')) {
				rs[k] = this[k];
			}
		}
		return rs;
	},
	display: function() {
		this.$().template(this.layout, this.url, this.params);
		return this.$();
	},
	html: function(reload) {
		this.loadData();
		this.data.reload = reload;
		currentObject = this;
		co = this;
		var layout = (pzk.locator && pzk.locator.locate(this.layout)) || this.layout;
		return tmpl(layout, this.data);
	},
	loadData: function() {
		this.data = {};
	},
	children: [],
	find: function(finder) {
		for(var i = 0; i < this.children; i++) {
			if(finder(this.children[i])) {
				return this.children[i];
			}
		}
		return null;
	},
	getChildren: function (finder) {
		var children = [];
		for(var i = 0; i < this.children; i++) {
			if(finder(this.children[i])) {
				children.push(this.children[i]);
			}
		}
		return children;
	},
	append: function(obj) {
		this.children.push(obj);
	},
	supper: function(ParentClass, method, args) {
		return ParentClass.prototype[method].apply(this, args || []);
	}
});

PzkSimpleObj = PzkObj.pzkExt({
	html: function() {
		return PzkSimpleParser.parse(this.getSimpleObj()).html();
	}
});

PzkComplexObj = PzkObj.pzkExt({
	html: function(reload) {
		this.loadData();
		this.data.reload = reload;
		currentObject = this;
		co = this;
		var layout = (pzk.locator && pzk.locator.locate(this.layout)) || this.layout;
		return PzkSimpleParser.parse(tmpl(layout, this.data)).html();
	}
});

PzkCompositeObj = PzkObj.pzkExt({
	html: function(reload) {
		this.loadData();
		this.data.reload = reload;
		currentObject = this;
		co = this;
		var layout = (pzk.locator && pzk.locator.locate(this.layout)) || this.layout;
		return PzkParser.parse(tmpl(layout, this.data)).html();
	}
});

function pzk_super(Class, method, inst, args) {
	if(typeof args == 'undefined') args = [];
	Class.prototype[method].apply(inst, args);
}

PzkFactory = {
	create: function(props) {
		if(props.lib)
			pzk.lib(props.lib);
		var objClass = window[props.className] || PzkObj;
		var obj = new objClass(props);
		obj.init();
		obj.finish();
		return obj;
	}
}

PzkController = function(props) {
	$.extend(this, props || {});
};

PzkController.pzkImpl({
	page: false,
	contentRegion: '#page-content',
	initPage: function() {
		this.page = this.parse(this.masterPage);
		return this;
	},
	parse: function(page) {
		return PzkParser.parse(page);
	},
	append: function(page, position = false) {
		var elem = pzk.getElement(position || this.masterPosition);
		if(elem)
			elem.append(this.parse(page));
		return this;
	},
	getPage: function() {
		return this.page;
	},
	display: function() {
		var that = this;
		$(function() {
			$(that.contentRegion).append(that.getPage().html());
			pzk.lib('tinymce');
			setTinymce();
		});
		return that;
	},
	loadLayout: function(layout) {
		pzk.load(layoutRoot + layout);
	},
	getLayout: function(layout) {
		var html = null;
		pzk.load(layoutRoot + layout, function(resp) {
			html = resp;
		});
		return html;
	},
	htmlAppend: function(html) {
		if(is_string(html)) {
			$(this.contentRegion).append(html);
		} else if(typeof html.html !== 'undefined') {
			$(this.contentRegion).append(html.html());
		}
	},
	simpleAppend: function(html) {
		this.htmlAppend(html.toSimpleObj());
	}
});

function pzk_init(instances) {
	for (var i = 0; i < instances.length; i++) {
		var props = instances[i];
		var inst = null;
		eval('inst = new ' + props['className'].ucfirst() + '(props);');
		pzk.elements[inst.id] = inst;
		eval('pzk_' + inst.id + ' = inst;');
		if(typeof pzk.beforeloads[inst.id] !== 'undefined') {
			var beforeloads = pzk.beforeloads[inst.id];
			for(var i = 0; i < beforeloads.length; i++) {
				var beforeload = beforeloads[i];
				beforeload.call(inst);
			}
		}
		inst.init();
	}
	pzk.runOnload();
}