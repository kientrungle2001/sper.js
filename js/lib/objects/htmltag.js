var htmltag_tmpl = heredoc(function() {/*
(* 
var cur = co;
if(co.tag == 'br' || co.tag == 'hr') { *) 
	<(*= co.tag *)(* 
		for(var i = 0; i < PzkHtmltag.attributes.length; i++){ 
			var attr = PzkHtmltag.attributes[i];
			if(typeof co[attr] !== 'undefined') { *) (*= attr *)="(*= co[attr] *)"(* } 
		} *)/> 
(*} else { *)
	<(*= co.tag*)(* 
		for(var i = 0; i < PzkHtmltag.attributes.length; i++){ 
			var attr = PzkHtmltag.attributes[i];
			if(typeof co[attr] !== 'undefined') { *) (*= attr *)="(*= co[attr] *)"(* } 
		} *)>(* cur.children.forEach(function(childObject){ *)(*= childObject.html() *)(* }); *)</(*= cur.tag*)>
(* } *)
*/});
PzkHtmltag = PzkObj.pzkExt({
	layout: htmltag_tmpl
});
PzkHtmltag.attributes = ['id', 'name', 'type', 'class', 'style', 'value', 'selected', 'checked', 'href', 'src', 'role', 'action', 'method', 'alt', 'title', 'aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-controls', 'aria-hidden', 'aria-haspopup', 'aria-expanded', 'data-toggle', 'data-target', 'data-dismiss', 'data-ride', 'data-slide-to', 'data-slide', 'onchange', 'onclick', 'onsubmit', 'onkeyup', 'tabindex'];