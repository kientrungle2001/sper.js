layout_db_grid_header = `	
	(* var m = co.grid; *)
	<tr>
		<th><input type="checkbox" id="(*= m.id*)-checkall" onclick="pzk.getElement('(*= m.id*)').check(this.checked);" /></th>
		<th>ID</th>
		(* m.fieldSettings.forEach(function(column, index){ *)
		<th class="column column-(*= column.index*)"><span class="cell">(*= column.label*)</span><a href="#" onclick="(*= m.locate()*).toggleColumn(&quot;(*= column.index*)&quot;); return false;" title="(*= column.label*)"><span class="glyphicon glyphicon-remove-circle"></span></a></th>
		(* }); *)
		<th>&nbsp;</th>
	</tr>`;

PzkDbGridHeader = PzkObj.pzkExt({
	layout: layout_db_grid_header
});