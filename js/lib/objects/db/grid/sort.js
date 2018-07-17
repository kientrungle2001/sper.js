layout_db_grid_sort = `(* var m = co.grid; *)
(* if(m.sortFields) { *)
<h3>Sắp xếp theo</h3>
<select class="sortFields form-control" name="sortField" onchange="pzk.getElement('(*= m.id*)').sortBy(this.value);">
	<option value="(*= m.primaryKey || 'id' *) desc">Sắp xếp theo</option>
	(* $.each(m.sortFields, function(field, label){ *)
		<option value="(*= field*)" (* if(m.orderBy == field){*)selected(*}*)>(*= label*)</option>
	(* });*)
</select>
(* }*)`;

PzkDbGridSort = PzkObj.pzkExt({
	layout: layout_db_grid_sort
});