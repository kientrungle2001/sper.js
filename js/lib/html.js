function htmltag(tagName, attributes, content) {
	if(attributes === false) {
		return '<'+tagName+' />';
	}
	var rs = '<' + tagName + ' ';
	if(typeof attributes === 'string') {
		content = attributes;
		if(typeof content === 'object') {
			attributes = content;
		} else {
			attributes = null;
		}
	}
	if(attributes) {
		for(var attr in attributes) {
			rs += attr + '="' + attributes[attr] + '" ';
		}
	}
	if(content === false) {
		rs += ' />';
		return rs;
	}
	rs += '>';
	rs += content;
	rs += '</'+tagName+'>';
	return rs;
}

function a(attributes, content) {
	return htmltag('a', attributes, content);
}
function span(attributes, content) {
	return htmltag('span', attributes, content);
}
function strong(attributes, content) {
	return htmltag('strong', attributes, content);
}
function em(attributes, content) {
	return htmltag('em', attributes, content);
}
function h1(attributes, content) {
	return htmltag('h1', attributes, content);
}
function h2(attributes, content) {
	return htmltag('h2', attributes, content);
}
function h3(attributes, content) {
	return htmltag('h3', attributes, content);
}
function h4(attributes, content) {
	return htmltag('h4', attributes, content);
}
function h5(attributes, content) {
	return htmltag('h5', attributes, content);
}
function h6(attributes, content) {
	return htmltag('h6', attributes, content);
}
function h7(attributes, content) {
	return htmltag('h7', attributes, content);
}
function br() {
	return htmltag('br', false);
}
function hr(attributes) {
	return htmltag('hr', attributes, false);
}

function div(attributes, content) {
	return htmltag('div', attributes, content);
}
function p(attributes, content) {
	return htmltag('p', attributes, content);
}
function ul(attributes, content) {
	return htmltag('ul', attributes, content);
}
function li(attributes, content) {
	return htmltag('li', attributes, content);
}

function table(attributes, content) {
	return htmltag('table', attributes, content);
}
function thead(attributes, content) {
	return htmltag('thead', attributes, content);
}
function tbody(attributes, content) {
	return htmltag('tbody', attributes, content);
}
function tr(attributes, content) {
	return htmltag('tr', attributes, content);
}
function th(attributes, content) {
	return htmltag('th', attributes, content);
}
function td(attributes, content) {
	return htmltag('td', attributes, content);
}


function select(attributes, content) {
	return htmltag('select', attributes, content);
}
function option(attributes, content) {
	return htmltag('option', attributes, content);
}

function container(attributes, content) {
	attributes = attributes || {};
	attributes['class'] = attributes['class'] ? attributes['class'] : '';
	attributes['class'] += ' container';
	return div(attributes, content);
}

function row(attributes, content) {
	attributes = attributes || {};
	attributes['class'] = attributes['class'] ? attributes['class'] : '';
	attributes['class'] += ' row';
	return div(attributes, content);
}

function col(sizes, attributes, content) {
	attributes = attributes || {};
	attributes['class'] = '';
	for(var size in sizes) {
		attributes['class'] += 'col-' + size + '-' + sizes[size] + ' ';
	}
	return div(attributes, content);
}

function htmlparse(dom) {
	if(typeof dom == 'string') return dom;
	if(dom.children) {
		var content = dom.content || '';
		for(var i = 0; i < dom.children.length; i++) {
			content += htmlparse(dom.children[i]);
		}
	}
	return htmltag(dom.tag, dom.attrs, content);
}

function html_append(parentDom, childDom) {
	parentDom.children.push(childDom);
}

/**
Generate html short open and close tags
*/
pml = {
	open: function(cmd) {
		var html = '';
		var elems = cmd.split(' ');
		elems.forEach(function(elem) {
			var parts = elem.split(':');
			var classes = '';
			var tag = '';
			var id = '';
			if(parts.length == 1) {
				classes = parts[0];
				tag = 'div';
				html += '<div class="' + classes.replace(',', ' ') + '">';
			} else if(parts.length == 2) {
				classes = parts[1];
				tag = parts[0];
				html += '<'+tag+' class="' + classes.replace(',', ' ') + '">';
			} else if(parts.length == 3) {
				classes = parts[2];
				id = parts[1];
				tag = parts[0];
				html += '<'+tag+' id="'+id+'" class="' + classes.replace(',', ' ') + '">';
			}
		});
		return html;
		
	},
	close: function(cmd) {
		var elems = cmd.split(' ');
		var html = '';
		elems.forEach(function(elem) {
			var parts = elem.split('*');
			var tag = '';
			var multiple = 1;
			if(parts.length == 1) {
				tag = parts[0];
				html += '</' + tag +'>';
			} else if(parts.length == 2) {
				tag = parts[0];
				multiple = parseInt(parts[1]);
				html += ('</' + tag +'>').repeat(multiple);
			}
		});
		return html;
	},
	parse: function(content) {
		var matches = content.match(/\[[:,\w\d_\- ]+\]/g);
		var replacement = '';
		if(matches)
		matches.forEach(function(m) {
			var exp = m.replace('[', '').replace(']', '');
			replacement = pml.open(exp);
			content = content.replace(m, replacement);
		});
		var closeMatches = content.match(/\[\/[\*\w\d_\- ]+\]/g);
		if(closeMatches)
		closeMatches.forEach(function(m) {
			replacement = pml.close(m.replace('[/', '').replace(']', ''));
			content = content.replace(m, replacement);
		});
		return content;
	}
};
// console.log(pml.open('container,homepage row col-xs-12'));
// console.log(pml.close('div*3'));
// console.log(pml.open('span:glyphicon,glyphicon-close'));
// console.log(pml.close('span'));
// console.log(pml.parse('[container,homepage row col-xs-12]Hello, Content [span:glyphicon,glyphicon-close][/span][/div*3]'));

// console.log(pml.parse('[modal-dialog,modal-lg,sharp modal-content,sharp modal-header,sharp]'));
// pzk.load('/3rdparty/jquery-haml/jquery.haml-1.3.js');
// $(function() {
	// $('body').haml([['%h1.text-center', 'Here is haml'], ['.text-center', 'Here is haml description']]);
// });