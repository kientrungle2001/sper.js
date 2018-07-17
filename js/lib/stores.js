PzkStorage = function(storage){
	this.storage = storage;
}

PzkStorage.pzkImpl({
	set: function(key, val) {
		return this.storage.set(key, val);
	},
	get: function(key) {
		return this.storage.get(key);
	},
	has: function(key) {
		return this.storage.has(key);
	},
	del: function(key) {
		return this.storage.del(key);
	}
});

PzkPrefixStorage = PzkStorage.pzkExt({
	prefix: false,
	set: function(key, val) {
		return this.storage.set(this.prefix + key, val);
	},
	get: function(key) {
		return this.storage.get(this.prefix + key);
	},
	has: function(key) {
		return this.storage.has(this.prefix + key);
	},
	del: function(key) {
		return this.storage.del(this.prefix + key);
	}
});