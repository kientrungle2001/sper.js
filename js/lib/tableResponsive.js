/*js table*/

function tableitemize() {
	if($('table.tableitem').length){
		$('table.tableitem').each(function(index, tableitem){
			var $tableitem = $(tableitem);
			var headertext = [],
			headers = $tableitem.find("th"),
			tablerows = $tableitem.find("th"),
			tablebody = $tableitem.find("tbody");

			for(var i = 0; i < headers.length; i++) {
			  var current = $(headers[i]);
			  headertext.push(current.text().replace(/\r?\n|\r/,""));
			} 
			if(tablebody){
				if(tablebody.rows) {
					for (var i = 0, row; row = tablebody.rows[i]; i++) {
					  for (var j = 0, col; col = row.cells[j]; j++) {
						col.setAttribute("data-th", headertext[j]);
					  } 
					}
				}
			}	
		});
		pzk.load('/Default/skin/tableitem.css');
	}	
}