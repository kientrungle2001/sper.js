grid_tmpl = heredoc(function(){/*
(*	var columns = 	data.columns;
	var items 	=	data.items;
*)
<div id="grid-(*= data.id*)">
<table class="(*= data.class*)">
	<thead>
		<tr>
			<td><input type="checkbox" name="allIds" /></td>
			<td>#ID</td>
			(* for(var i = 0; i < columns.length; i++){ 
				var column = columns[i];
			*)
			<td>
			(* if(column.filter){ 
				var columnFormat = window['grid_filter_' + (column.filter.type || 'text') + '_tmpl'];
				var cellHtml = tmpl(columnFormat, column);
				*)
				(*= cellHtml*)
			(* } else { *)
				(*= column.label *)
			(* }*)
			</td>
			(* }*)
		</tr>
	</thead>
	<tbody id="grid-body-(*= data.id*)">
		(* for(var j = 0; j < items.length; j++){ 
			var item = items[j];
		*)
		<tr>
			<td><input type="checkbox" name="ids[]" value="(*= item.id*)" /></td>
			<td>(*= item.id*)</td>
			(* for(var i = 0; i < columns.length; i++){ 
				var column = columns[i];
				var cell = item[column.index];
				var cellData = $.extend({}, column, {value: cell});
				var columnFormat = window['grid_' + (column.type || 'text') + '_tmpl'];
				var cellHtml = tmpl(columnFormat, cellData);
			*)
			<td>(*= cellHtml*)</td>
			(* }*)
		</tr>
		(* }*)
	</tbody>
	</table>
</div>
*/});
grid_text_tmpl = heredoc(function() {/*
	(*= data.value *)
*/});
grid_image_tmpl = heredoc(function() {/*
	<img src="(*= data.value *)" class="img-responsive" />
*/});

PzkGrid = PzkObj.pzkExt({
	id: 'grid',
	class: 'table',
	layout: grid_tmpl,
	model: 'Grid',
	service: 'listing',
	conditions: {},
	params: {
		table: 'news',
		pageSize: 10,
		pageNum: 0,
		conditions: false
	},
	data: {
		
	},
	columns: [],
	html: function() {
		return tmpl(this.layout, this.data);
	},
	load: function(callback) {
		var that = this;
		$.extend(that.data, that.params);
		that.data.columns 	= 	that.columns;
		that.data.id 		=	that.id;
		that.data.class		= 	that.class;
		var conditions = encodeURIComponent(that.params['conditions']);
		pzk_service.call(that.model, that.service, [that.params['table'], that.params['pageSize'], that.params['pageNum'], conditions], function(resp){
			$.extend(that.data, resp);
			callback(resp);
		});
	},
	build: function() {
		
	}
});
/*
$(function(){

var g = new PzkGrid({
	params: {
		table: 'news',
		pageSize: 5,
		pageNum: 0,
		conditions: 'id in (3, 4)'
	},
	columns: [
		{
			label: 	'Title',
			type: 	'text',
			index: 	'title'
		},
		{
			label: 	'Image',
			type: 	'image',
			index: 	'img'
		},
		{
			label: 	'Brief',
			type: 	'text',
			index: 	'brief'
		}
	],
	data: {
		
	},
	id: 'product',
	class: 'table'
});
g.load(function(){
	var gridhtml = g.html();
	$('#testRegion').html(gridhtml);
});
});
*/