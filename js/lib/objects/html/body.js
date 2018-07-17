PzkHtmlBody = PzkObj.pzkExt({
	layout: '(* currentObject.children.forEach(function(childObject){ *)\
	(*= childObject.html() *)\
(* }); *)'
});