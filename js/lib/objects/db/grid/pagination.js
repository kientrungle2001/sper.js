layout_db_grid_pagination = `
	(* var m = co.grid;
	var d = co.data;
	console.log('pagination: ',d);
	*)
		<tr>
			<td colspan="(*= 3 + m.fieldSettings.length *)">
			Số bản ghi/trang :
			<form class="form-inline" style="display: inline-block;"
				onsubmit="pzk.getElement('(*= m.id*)').changePageSize(); return false;"
			>
			<input id="(*= m.id*)-changePageSize" type="text" class="form-control changePageSize input-sm" value="(*= m.pageSize*)" style="width: 80px;" /> <button class="btn btn-primary btn-sm" onclick="pzk.getElement('(*= m.id*)').changePageSize(); return false;">Đổi</button>
			</form>
			
			Trang: 
		(* for (var page = 0; page < d.pages; page++){ 
				if(((page > m.pageNum - 5) && (page < m.pageNum + 5)) || page == 0 || page == d.pages - 1) {
		*)
				<a class="page page-(*= page*) btn btn-sm (* if(page == m.pageNum) { *)btn-primary(* } else { *)btn-default(* } *)" href="#" onclick="pzk.getElement('(*= m.id*)').gotoPage((*= page*)); return false;">(*= page + 1*)</a>
		(*   	}
			}*)
			
			<form class="form-inline" style="display: inline-block;"
				onsubmit="pzk.getElement('(*= m.id*)').gotoSelectedPage(); return false;"
			>
			<input id="(*= m.id*)-gotoSelectedPage" type="text" class="form-control gotoSelectedPage input-sm" value="(*= m.pageNum + 1*)" style="width: 80px;" /> <button class="btn btn-primary btn-sm" onclick="pzk.getElement('(*= m.id*)').gotoSelectedPage(); return false;">Đến</button>
			</form>
			(*= d.totalItems *) bản ghi
			</td>
		</tr>
`;
PzkDbGridPagination = PzkObj.pzkExt({
	layout: layout_db_grid_pagination
});