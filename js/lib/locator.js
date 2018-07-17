pzk.locator = {
	data: {
	},
	locate: function(name) {
		if(typeof this.data[name] != 'undefined') {
			var result = this.data[name];
			if(is_string(result)) {
				return result;
			} else if(is_function(result)) {
				return result();
			}
		}
		return name;
	},
	set: function(name, path = null) {
		if(path) {
			this.data[name] = path;
		} else {
			this.data = $.extend(this.data, name);
		}
	}
};