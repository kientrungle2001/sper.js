pzk.lib('string');
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
function tmpl(str, data){
    str = str.replaceAll('<?php', '(*');
	str = str.replaceAll('?>', '*)');
	var fn = null;
	var preStr = str;
	if(str.indexOf('#') === 0) {
		if(fn = tmpl.cache[str]) {
			return data ? fn( data ) : fn;
		}
		str = $(str).html();
	} else if(pzk.ext(str) === 'html') {
		if(fn = tmpl.cache[str]) {
			return data ? fn( data ) : fn;
		}
		$.ajax({
			url: str,
			async: false,
			success: function(resp) {
				str = resp;
			}
		});
	}
	
	var code = "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(data){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("(*").join("\t")
          .replace(/((^|\*\))[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)\*\)/g, "',$1,'")
          .split("\t").join("');")
          .split("*)").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');";
    fn = new Function("data", code);
    if(preStr.indexOf('#') === 0 || pzk.ext(str) === 'html') {
		tmpl.cache[preStr] = fn;
	}
    // Provide some basic currying to the user
    return data ? fn( data ) : fn();
};
tmpl.cache = {};

$.fn.tmpl = function(str, data) {
	var parsed = tmpl(str, data);
	this.html(parsed);
};

$.fn.template = function(template, url/*data*/, params) {
	var that = this;
	if(typeof url !== 'string') {
		return that.tmpl(template, url);
	}
	$.ajax({
		url: url,
		data: params,
		dataType: 'json',
		type:	'post',
		success: function(resp) {
			that.tmpl(template, resp);
		}
	});
}

function foreach(rows, template) {
	var str = '';
	for(var i = 0; i < rows.length; i++) {
		str += tmpl(template, rows[i]);
	}
	return str;
}