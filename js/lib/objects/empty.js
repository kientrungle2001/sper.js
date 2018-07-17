var empty_tmpl = heredoc(function() {/*
(* co.children.forEach(function(childObject){ *)(*= childObject.html() *)(* }); *)
*/});
PzkEmpty = PzkObj.pzkExt({
	layout: empty_tmpl
});