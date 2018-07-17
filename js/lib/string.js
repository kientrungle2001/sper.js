String.pzkImpl({
	ucfirst : function() {
		return this.substr(0, 1).toUpperCase() + this.substr(1);
	},
	lcfirst : function() {
		return this.substr(0, 1).toLowerCase() + this.substr(1);
	},
	isCss: function() {
		var re = /(?:\.([^.]+))?$/;
		return re.exec(this)[1] == 'css';
	},
	isJs: function() {
		var re = /(?:\.([^.]+))?$/;
		return re.exec(this)[1] == 'js';
	},
	trim: function() {
		return $.trim(this);
	},
	replaceAll: function(search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	},
	explode: function(delim) {
		return this.split(delim);
	},
	explodetrim: function(delim) {
		var arr = this.explode(delim);
		for(var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].trim();
		}
		return arr;
	},
	replaceAll: function(search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	},
	contains: function(str) {
		return this.includes(str);
	},
	regexIndexOf: function(regex, startpos) {
		var indexOf = this.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	},
	regexLastIndexOf: function(regex, startpos) {
		regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
		if(typeof (startpos) == "undefined") {
			startpos = this.length;
		} else if(startpos < 0) {
			startpos = 0;
		}
		var stringToWorkWith = this.substring(0, startpos + 1);
		var lastIndexOf = -1;
		var nextStop = 0;
		while((result = regex.exec(stringToWorkWith)) != null) {
			lastIndexOf = result.index;
			regex.lastIndex = ++nextStop;
		}
		return lastIndexOf;
	},
	toObj: function() {
		return PzkParser.parse(this);
	},
	toSimpleObj: function() {
		return PzkSimpleParser.parse(this);
	}
});

function nl2br(str) {
	return str.replaceAll("\n", '<br />');
}

function str_replace (search, replace, subject, countObj) {
	var splts = subject.split(search);
	return splts.join(replace);
}

function html_entity_decode(s){
	return $("<div/>").text(s).html();
}
function htmlentities(s){
	return $("<div/>").html(s).text();
}

function strip_tags(str) {
    str = str.toString();
    return str.replace(/<\/?[^>]+>/gi, '');
}

function implode(delim, arr) {
	return arr.join(delim);
}

function explode(delim, str) {
	return str.split(delim);
}

function trim(str){
	return str.trim();
}

function preg_replace_callback(pattern, callback, subject, limit){

	limit = !limit?-1:limit;

	var _flag = pattern.substr(pattern.lastIndexOf(pattern[0])+1),
		_pattern = pattern.substr(1,pattern.lastIndexOf(pattern[0])-1),
		reg = new RegExp(_pattern,_flag),
		rs = null,
		res = [],
		x = 0,
		ret = subject;
		
	if(limit === -1){
		var tmp = [];
		
		do{
			tmp = reg.exec(subject);
			if(tmp !== null){
				res.push(tmp);
			}
		}while(tmp !== null && _flag.indexOf('g') !== -1)
	}
	else{
		res.push(reg.exec(subject));
	}
	
	for(x = res.length-1; x > -1; x--){//explore match
		ret = ret.replace(res[x][0],callback(res[x]));
	}
	return ret;
}

function strtolower(str) {
	return str.toLowerCase();
}

function strtoupper(str) {
	return str.toUpperCase();
}

// Multiline Function String - Nate Ferrero - Public Domain
function heredoc(fn) {
  return fn.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};
String.pzkImpl({
	is: function(name) {
		return 'String' === name;
	}
});

function get_class(obj) {
	return obj.constructor.name;
}

function is_a(obj, className) {
	return obj !== null && obj.constructor.name == className;
}
function is_string(obj) {
	return is_a(obj, 'String');
}
function is_numeric(obj) {
	return is_a(obj, 'Number');
}
function is_array(obj) {
	return is_a(obj, 'Array');
}
function is_function(obj) {
	return is_a(obj, 'Function');
}
function is_boolean(obj) {
	return is_a(obj, 'Boolean');
}
function is_object(obj) {
	return is_a(obj, 'Object');
}



/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

var Base64Simple = {
  encode: function(s) {
    return btoa(unescape(encodeURIComponent(s)));
  },
  decode: function(s) {
    return decodeURIComponent(escape(atob(s)));
  }
};