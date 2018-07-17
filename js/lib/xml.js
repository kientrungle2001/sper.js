maxUniqueId = 1;
function visit_node(node) {
	var nodeObjData = {children: []};
	if(node.nodeName == '#text') {
		nodeObjData.tagName = 'label';
		nodeObjData.content = node.nodeValue;
	} else {
		nodeObjData.tagName = node.nodeName;
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
	pzk.lib('objects/' + classPath);
	var className = 'Pzk' + parts.join('');
	var classFunction = window[className];
	var rs = new classFunction(nodeObjData);
	rs.init();
	node.childNodes.forEach(function(childNode) {
		nodeObjData.children.push(visit_node(childNode));
	});
	rs.finish();
	return rs;
}