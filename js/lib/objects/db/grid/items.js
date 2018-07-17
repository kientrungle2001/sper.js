layout_db_grid_items = `	
	(* var m = co.grid;
		var data = co.data;
	*)
	(* 
		if(m.treeMode) {
			data.items = buildBottomTree(data.items);
			data.items = treefy(data.items, 0);
		}
		data.items.forEach(function(item, itemIndex) { *)
		<tr rel="(*= item[m.primaryKey || 'id'] *)" onclick="pzk.getElement('(*= m.id*)').checkTrRow(this);">
		<td style="white-space: nowrap;"><span style="width: 35px; display: inline-block;">(*= m.pageNum * m.pageSize + itemIndex + 1*)</span> <input type="(* if(co.multiple){*)checkbox(* } else {*)radio(*}*)" name="ids[]" value="(*= item[m.primaryKey || 'id'] *)" onclick="pzk.getElement('(*= m.id*)').checkRow(this);" /></td>
		<td>
		<a href="#"  onclick="(* if(m.editable) { *)pzk.getElement('(*= m.id*)').edit(&quot;(*= item[m.primaryKey || 'id'] *)&quot;);(* } *) return false;" (* if(m.treeMode){ *) draggable="true" ondragstart="event.dataTransfer.setData(&quot;itemId&quot;, &quot;(*= item[m.primaryKey || 'id'] *)&quot;)" ondragover="event.preventDefault()" ondrop="(*= m.locate()*).ondrop(event, &quot;(*= item[m.primaryKey || 'id'] *)&quot;);"(* } *)>(*= item[m.primaryKey || 'id'] *)</a></td>
		(* m.fieldSettings.forEach(function(column, index){ *)
		<td class="column column-(*= column.index *)"><div class="cell">(*= grid_field_html(item, column) *)(* if(column.editable){ *) <a href="#" onclick="(*= m.locate()*).inlineEdit(&quot;(*= item[m.primaryKey || 'id'] *)&quot;, '(*= column.index*)'); return false;"><span class="glyphicon glyphicon-edit"></span></a> (* } *)</div></td>
		(* }); *)
		<td><a href="#" onclick="pzk.getElement('(*= m.id*)').del(&quot;(*= item[m.primaryKey || 'id'] *)&quot;);return false;"><span class="glyphicon glyphicon-remove"></span></a></td>
		</tr>
		(* }); *)`;

PzkDbGridItems = PzkObj.pzkExt({
	layout: layout_db_grid_items
});