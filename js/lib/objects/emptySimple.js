var empty_simple_tmpl = heredoc(function() {/*
(* co.children.forEach(function(childObject){ *)(*= childObject.html() *)(* }); *)
*/});
PzkEmptySimple = PzkObj.pzkExt({
	layout: empty_simple_tmpl
});