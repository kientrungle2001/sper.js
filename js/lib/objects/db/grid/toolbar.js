var layout_db_grid_toolbar = `
(* var m = co.grid; *)


(* if(m.insertable) { *)
	<a href="/(*= STARTUP_SCRIPT*)/(*= controller*)/add(* if(m.type) { *)?type=(*= m.type*)(*}*)" class="btn btn-primary" onclick="pzk.elements.(*= m.id*).add(); ; return false;"><span class="glyphicon glyphicon-plus"></span> Add</a> 
(* } *)
 
(* if(m.editable) { *)
	
	
	<a class="btn btn-danger" href="#" onclick="(*= m.locate()*).delItems(); return false;"><span class="glyphicon glyphicon-remove"></span> Remove</a>
	<a class="btn btn-primary" href="#" onclick="(*= m.locate()*).toggleMultiple(); return false;"> Toogle Select Mode</a>
	<a href="#" onclick="(*= m.locate()*).selectParent(); return false;"><span class="glyphicon glyphicon-move"></span> Move To</a>  
	<a href="#" onclick="(*= m.locate()*).setMetaType(); return false;"><span class="glyphicon glyphicon-asterisk"></span> Change Meta Type</a>  
(* } *)
<span class="pull-right">
	<a href="#" onclick="(*= m.locate()*).toggleReduce(); return false;"><span class="glyphicon glyphicon-resize-small"></span> Reduce</a> 
	<a href="#" onclick="(*= m.locate()*).configureGrid(); return false;"><span class="glyphicon glyphicon-cog"></span> Grid</a> 
	<a href="#" onclick="(*= m.locate()*).configureEdit(); return false;"><span class="glyphicon glyphicon-cog"></span> Edit</a>
</span>
`;

PzkDbGridToolbar = PzkObj.pzkExt({
	layout: layout_db_grid_toolbar
});