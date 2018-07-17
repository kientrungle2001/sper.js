Function.prototype.pzkImpl = function(props) {
	$.extend(this.prototype, props);
	return this;
};

Function.prototype.pzkExt = function(props) {
	var that = this;
	var func = function() {
		that.apply(this, arguments);
	};
	$.extend(func.prototype, this.prototype || {}, props);
	return func;
};

Function.prototype.supper = function(method, inst, args) {
	return this.prototype[method].apply(inst, args || []);
};

pzk = {
	page : 'index',
	elements : {},
	cache: {},
	version: 1,
	getElement: function(name) {
		return this.elements[name] || null;
	},
	load : function(urls, callback, nocache) {
		var loaded = false;
		if (typeof urls == 'string') {
			urls = [ urls ];
		}
		if (typeof nocache == 'undefined')
			nocache = false; // default don't refresh
		$.when($.each(urls, function(i, url) {
			if (nocache)
				url += '?_ts=' + new Date().getTime(); // refresh?
			if (pzk._urls.indexOf(url) == -1) {
				
				var response = null;
				$.ajax({
					url: 		url + '?_ts=' + pzk.version, 
					async: 		false,
					success: 	function(resp) {
						response = resp;
					}
				});
				pzk.cache[url] = response;
				if (pzk.ext(url) == 'css') {
					$('<link>', {
						rel : 'stylesheet',
						type : 'text/css',
						'href' : url + '?_ts=' + pzk.version
					}).appendTo('head');
					if(callback)
						callback();
				} else if (pzk.ext(url) == 'js') {
					if(callback)
						callback();
				} else if(pzk.ext(url) == 'json') {
					var json = null;
					json = response;
					if(callback)
						callback(json);
				} else {
					if(callback) {
						callback(response);
					}
				}
				pzk._urls.push(url);
			} else {
				if(callback) {
					callback(pzk.cache[url]);
				}
			}
		})).then(function() {
			
			if (0 && typeof callback == 'function')
				callback();
		});
	},
	ext : function(url) {
		var re = /(?:\.([^.]+))?$/;
		return re.exec(url)[1];
	},
	_urls : [],
	set: function(key, val) {
		window.localStorage.setItem(key, JSON.stringify(val));
		return val;
	},
	get: function(key) {
		var val = null;
		if(null !== (val = window.localStorage.getItem(key))) {
			return JSON.parse(val);
		}
		return null;
	},
	del: function(key) {
		return window.localStorage.removeItem(key);
	},
	has: function(key) {
		return this.get(key) !== null;
	},
	clear: function() {
		window.localStorage.clear();
	},
	modal: false,
	lib: function(lib, callback) {
		pzk.load('/js/lib/' + lib + '.js', callback);
	},
	object: function(path, callback) {
		pzk.lib('objects/' + path, callback);
	},
	system: {
		run: function() {
			pzk.load('/system/hosts.json', function(hosts) {
				pzk.system.hosts = hosts;
			});
			pzk.request.init();
			pzk.loader.init();
			var app = this.getApp();
			if(app)
				app.run();
		},
		getApp: function() {
			var host = pzk.request.host;
			var hostParams = {};
			if(typeof this.hosts[host] == 'undefined') {
				console.log('Cant find app for running');
				return null;
			} else if(typeof this.hosts[host] == 'string') {
				hostParams = this.hosts[this.hosts[host]];
			} else {
				hostParams = this.hosts[host];
			}
			for(var key in hostParams) {
				pzk.request.set(key, hostParams[key]);
			}
			pzk.load('/app/' + pzk.request.getAppPath() + '/application.js');
			return pzk.app;
		},
		hosts: {
			'test1sn.vn': {
				app: 'nobel_test',
				softwareId: 1,
				siteId: 	2,
				language:	true,
				theme: 'songngu3'
			},
			's1.nextnobels.com': 'test1sn.vn',
			'fulllooksongngu.com': 'test1sn.vn'
		}
	},
	request: {
		data: {
			
		},
		searchParams: false,
		init: function() {
			var url = new URL(window.location.href);
			this.searchParams = url.searchParams;
			this.host = url.hostname;
			this.queryString = url.pathname;
		},
		set: function(key, val) {
			var that = this;
			if(typeof key == 'object') {
				$.each(key, function(k, v) {
					that.set(k, v);
				});
			} else {
				this.data[key] = val;
			}
		},
		get: function(key) {
			if(typeof this.data[key] != 'undefined') {
				return this.data[key];
			} else {
				var val = this.searchParams.get(key);
				if(typeof val != 'undefined') {
					this.set(key, val);
					return val;
				}
				return null;
			}
		},
		getAppPath: function() {
			return this.get('app').replace('_', '/');
		},
		getSegment: function(index) {
			var segments = this.queryString.split('/');
			return segments[index] || null;
		}
	},
	loader: {
		init: function() {
			pzk.lib('string');
			pzk.lib('array');
			pzk.lib('html');
			pzk.lib('locator');
			pzk.lib('template');
			pzk.lib('object');
			pzk.lib('parser');
			pzk.lib('database');
			pzk.lib('model');
			pzk.lib('browser');
			pzk.lib('lazy');
			pzk.lib('contextMenu');
			pzk.object('bootstraps');
			
			CategoriesModel = pzk.getModel('models.categories');
			DirectoryModel = pzk.getModel('models.directory');
		}
	},
	app: {
		run: function() {
		}
	}
};

function pzk_request(key, value){
	if(!value) {
		return pzk.request.get(key);
	}
	return pzk.request.set(key, value);
}
function pzk_session(key, value){
	if(!value) {
		return pzk.get(key);
	}
	return pzk.set(key, value);
}
function pzk_language(txt, language) {
    if(typeof language == 'undefined') language = false;
	if(language == false) {
		language = lang;
	}
	var tmp = txt.split('['+language+']');
	if(tmp.length > 1) {
		tmp = tmp[1].split('[/'+language+']');
		if(tmp.length) {
			return tmp[0];
		}
	} else {
		return txt;
	}
	
}

function pzk_language_set(txt, langTxt, language) {
    if(typeof language == 'undefined') language = false;
	if(language == false) {
		language = lang;
	}
	if(language == 'en') {
		var vnTxt = pzk_language(txt, 'vn');
		return '[en]' + langTxt + '[/en]' + '[vn]'+vnTxt+'[/vn]';
	}
	if(language == 'vn') {
		var enTxt = pzk_language(txt, 'en');
		return '[en]' + enTxt + '[/en]' + '[vn]'+langTxt+'[/vn]';
	}
}