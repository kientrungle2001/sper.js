PzkTab = PzkObj.pzkExt({
	layout: 'tab',
	init: function() {
		this.tabItems = [];
	},
	add: function(index, title, content) {
		if(this.tabItems.contains(function(item) {return item.index == index;})){
			return false;
		}
		this.tabItems.push({
			index: index,
			title: title,
			content: content
		});
		$('#'+this.id+'-list').append($('<li><a href="#tab-' + index + '" role="tab" data-toggle="tab">' + title + '<button class="close" type="button" title="Close Tab">×</button></a></li>'));
		$('#' + this.id + '-content').append($('<div class="tab-pane fade" id="tab-' + index + '">' + content + '</div>'));
		return true;
	},
	has: function(index) {
		return this.tabItems.contains(function(item) {
			return item.index == index;
		});
	},
	active: function(index){
	  $('#'+this.id+'-list a[href="#tab-' + index + '"]').tab('show');
	},
	attachEvents: function() {
		var that = this;
		$(document).ready(function() {
			$('#'+that.id+'-list').on('click', '.close', function() {
				var tabID = $(this).parents('a').attr('href');
				$(this).parents('li').remove();
				$(tabID).remove();
				var index = tabID.replace('#tab-', '');
				that.tabItems.remove(function(item){
					return (item.index == index);
				});
				//display first tab
				var tabFirst = $('#tab-list a:first');
				tabFirst.tab('show');
			});
		});

	}
});