layout_db_grid_filter = `(* var m = co.grid; *)
(* if(m.filterSettings) { *)
	(* m.filterSettings.forEach(function(setting){ *)
		(*= grid_filter_html(setting)*)
	(* });*)
(* }*)`;

PzkDbGridFilter = PzkObj.pzkExt({
	layout: layout_db_grid_filter
});