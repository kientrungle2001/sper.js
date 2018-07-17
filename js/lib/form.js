function serialize_form(data) {
	var result = {};
	var concat_names = {};
	for(var i = 0; i < data.length; i++) {
		var p = data[i];
		if(p.name.indexOf('[') === -1) {
			result[p.name] = p.value;
		} else {
			var names = p.name.match(/^[\w\d_]+/g);
			var name = names[0];
			
			var matches = p.name.match(/\[[^\]]*\]/g);
			for(var j = 0; j < matches.length; j++) {
				matches[j] = matches[j].replace(/[\[\]]/g, '');
			}
			if(typeof result[name] == 'undefined')
				result[name] = {};
			var t = result[name];
			if(matches[matches.length-1] !== '') {
				var concat_name = name;
				var concat_arr = 'result[name]';
				for(var k = 0; k < matches.length-1; k++) {
					concat_name += '_' + matches[k];
					concat_arr += '[\''+matches[k]+'\']';
					var str = ("if(typeof "+concat_arr+"=='undefined'){"+concat_arr+"={};}");
					eval(str);
				}
				
				concat_arr+='[\''+matches[matches.length-1]+'\']';
				var assignStr = (concat_arr + ' = p.value;');
				eval(assignStr);
			} else {
				var concat_name = name;
				var concat_arr = 'result[name]';
				for(var k = 0; k < matches.length-1; k++) {
					concat_name += '_' + matches[k];
					concat_arr += '[\''+matches[k]+'\']';
					if(k == matches.length-2) {
						var str = ("if(typeof "+concat_arr+"=='undefined'){"+concat_arr+"=[];}");
						eval(str);							
					} else {
						var str = ("if(typeof "+concat_arr+"=='undefined'){"+concat_arr+"={};}");
						eval(str);	
					}
					
				}
				
				if(typeof concat_names[concat_name] == 'undefined') {
					concat_names[concat_name] = 0;
				} else {
					concat_names[concat_name]++;
				}
				concat_arr+='[\''+concat_names[concat_name]+'\']';
				var assignStr = (concat_arr + ' = p.value;');
				eval(assignStr);
			}
			
		}
	}
	return result;
}

jQuery.fn.serializeForm = function() {
	var arr = this.serializeArray();
	return serialize_form(arr);
	var rslt = {};
	var indexJ = {};
	for (var i = 0; i < arr.length; i++) {
		var elem = arr[i];
		if (elem.name.indexOf('[') == -1) {
			rslt[elem.name] = elem.value;
		} else {
			elem.name = elem.name.replace(/\]\[/g, '.');
			elem.name = elem.name.replace(/\[/g, '.');
			elem.name = elem.name.replace(/\]/g, '');
			var parts = elem.name.split('.');

			var cur = rslt;

			for (var j = 0; j < parts.length - 1; j++) {
				if (typeof indexJ[j] == 'undefined')
					indexJ[j] = 0;
				var part = parts[j];
				if (part == '') {
					part = indexJ[j];
					indexJ[j]++;
				}
				if (typeof cur[part] == 'undefined') {
					cur[part] = {};
					indexJ[j + 1] = 0;
				}
				cur = cur[part];
			}
			if (typeof indexJ[parts.length - 1] == 'undefined')
				indexJ[parts.length - 1] = 0;
			var part = parts[parts.length - 1];
			if (part == '') {
				part = indexJ[parts.length - 1];
				indexJ[parts.length - 1]++;
			}
			cur[part] = elem.value;
		}
	}
	return rslt;
};