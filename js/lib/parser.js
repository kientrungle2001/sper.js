maxUniqueId = 1;

PzkParser = {
	parse: function(source) {
		if(is_string(source)) {
			if(source.contains('<')) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(source, "text/xml");
				if(isParseError(xmlDoc)) {
					console.log(xmlDoc);
				}
				return this.parse(xmlDoc);
			} else {
				var path = source;
				if(pzk.locator) {
					path = pzk.locator.locate(source);
				}
				
				pzk.load(path, function(resp) {
					source = resp;
				});
				return this.parse(source);
			}
		} else if(is_a(source, 'XMLDocument')) {
			return this.parse(source.childNodes[0]);
		} else if(is_a(source, 'Element')) {
			return this.parseNode(source);
		} else {
			return source;
		}
	},
	parseNode: function(node) {
		var that = this;
		var nodeObjData = {children: []};
		if(node.nodeName == '#text') {
			nodeObjData.tagName = 'label';
			nodeObjData.content = node.nodeValue;
		} else {
			nodeObjData.tagName = node.nodeName;
			if (this.isHtmlTag(node.nodeName)) {
                nodeObjData.tagName = 'htmltag';
				nodeObjData.tag = node.nodeName;
            }
			if(node.attributes.length) {
				for(var i = 0; i < node.attributes.length; i++) {
					nodeObjData[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
				}
			}
		}
		if(typeof nodeObjData.id == 'undefined') {
			nodeObjData.id = 'uniqueID' + maxUniqueId;
			maxUniqueId++;
		}
		var classPath = nodeObjData.tagName.replace(/\./g, '/');
		var parts = nodeObjData.tagName.split('.');
		parts.forEach(function(part, index) {
			parts[index] = part.ucfirst();
		});
		var className = 'Pzk' + parts.join('');
		if(typeof window[className] == 'undefined') {
			pzk.lib('objects/' + classPath);
		}
		if(typeof window[className] == 'undefined') {
			console.log(className + ' not found');
		}
		
		var classFunction = window[className];
		
		var rs = new classFunction(nodeObjData);
		pzk.elements[rs.id] = rs;
		rs.init();
		node.childNodes.forEach(function(childNode) {
			nodeObjData.children.push(that.parseNode(childNode));
		});
		rs.finish();
		return rs;
	},
	htmlTags: {
		'h1' : true, 'h2' : true, 'h3' : true, 'h4' : true, 'h5' : true, 'h6' : true, 'marquee' : true, 'br' : true,
        'p' : true, 'em' : true, 'strong' : true, 'a' : true, 'style' : true, 'div' : true, 'span' : true, 'label' : true, 'b' : true, 'hr' : true, 'i': true, 'form': true,
        'script' : true, 'link' : true, 'select' : true, 'option' : true, 'ul' : true, 'li' : true,
        'table' : true, 'tr' : true, 'td' : true, 'th': true, 'thead' : true, 'tbody' : true, 'tfoot': true, 'caption' : true,
        'input' : true, 'textarea' : true, 'img' : true, 'pre' : true, 'header' : true, 'footer': true, 'button': true, 'iframe': true
	},
	isHtmlTag: function(nodeName) {
		if(this.htmlTags[nodeName]) {
			return true;
		}
		return false;
	}
};

PzkSimpleParser = $.extend({}, PzkParser, {
	parseNode: function(node) {
		var that = this;
		var nodeObjData = {children: []};
		if(node.nodeName == '#text') {
			nodeObjData.tagName = 'label';
			nodeObjData.content = node.nodeValue;
		} else {
			nodeObjData.tagName = node.nodeName;
			if (this.isHtmlTag(node.nodeName)) {
                nodeObjData.tagName = 'htmltag';
				nodeObjData.tag = node.nodeName;
            }
			if(node.attributes.length) {
				for(var i = 0; i < node.attributes.length; i++) {
					nodeObjData[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
				}
			}
		}
		var classPath = nodeObjData.tagName.replace(/\./g, '/');
		var parts = nodeObjData.tagName.split('.');
		parts.forEach(function(part, index) {
			parts[index] = part.ucfirst();
		});
		var className = 'Pzk' + parts.join('');
		if(typeof window[className] == 'undefined') {
			pzk.lib('objects/' + classPath);
		}
		if(typeof window[className] == 'undefined') {
			console.log(className + ' not found');
		}
		
		var classFunction = window[className];
		
		var rs = new classFunction(nodeObjData);
		rs.init();
		node.childNodes.forEach(function(childNode) {
			nodeObjData.children.push(that.parseNode(childNode));
		});
		rs.finish();
		return rs;
	},
	htmlTags: {
		'h1' : true, 'h2' : true, 'h3' : true, 'h4' : true, 'h5' : true, 'h6' : true, 'marquee' : true, 'br' : true,
        'p' : true, 'em' : true, 'strong' : true, 'a' : true, 'style' : true, 'div' : true, 'span' : true, 'label' : true, 'b' : true, 'hr' : true, 'i': true,
        'script' : true, 'link' : true, 'select' : true, 'option' : true, 'ul' : true, 'li' : true,
        'table' : true, 'tr' : true, 'th': true, 'td' : true, 'thead' : true, 'tbody' : true,'tfoot': true, 'caption' : true,
        'input' : true, 'textarea' : true, 'img' : true, 'pre' : true, 'header' : true, 'footer': true, 'form': true, 'button': true, 'iframe': true
	}
});

PzkJsonParser = $.extend({}, PzkParser, {
	parse: function(node) {
		var that = this;
		node.children = [];
		if (node.tagName == '#text') {
			node.tagName = 'label';
		} else if (this.isHtmlTag(node.tagName)) {
			node.tag = node.tagName;
			node.tagName = 'htmltag';
		}
		var classPath = node.tagName.replace(/\./g, '/');
		var parts = node.tagName.split('.');
		parts.forEach(function(part, index) {
			parts[index] = part.ucfirst();
		});
		var className = 'Pzk' + parts.join('');
		if(typeof window[className] == 'undefined') {
			pzk.lib('objects/' + classPath);
		}
		if(typeof window[className] == 'undefined') {
			console.log(className + ' not found');
		}
		
		var classFunction = window[className];
		
		var rs = new classFunction(node);
		rs.init();
		if(typeof node.childNodes !== 'undefined') {
			node.childNodes.forEach(function(childNode) {
				node.children.push(that.parse(childNode));
			});
		}
		rs.finish();
		return rs;
	}
});

function isParseError(parsedDocument) {
    // parser and parsererrorNS could be cached on startup for efficiency
    var parser = new DOMParser(),
        errorneousParse = parser.parseFromString('<', 'text/xml'),
        parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDocument.getElementsByTagName("parsererror").length > 0;
    }

    return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
}