RegExp.pzkImpl({
	execAll: function(string) {
		var match = null;
		var matches = new Array();
		while (match = this.exec(string)) {
			var matchArray = [];
			for (i in match) {
				if (parseInt(i) == i) {
					matchArray.push(match[i]);
				}
			}
			matches.push(matchArray);
		}
		var result = [];
		if(matches.length) {
			var numOfRs = matches[0].length;
			for(var j = 0; j < numOfRs; j++) {
				result.push([]);
			}
			for(var i = 0; i < matches.length; i++) {
				for(var k = 0; k < numOfRs; k++) {
					result[k].push(matches[i][k]);
				}
			}
		}
		return result;
	}
}); 

String.pzkImpl({
	matchAll: function(rg) {
		return rg.execAll(this);
	}
});