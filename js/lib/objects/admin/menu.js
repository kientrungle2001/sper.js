PzkAdminMenu = PzkObj.pzkExt({
	layout: 'layouts/admin/menu',
	printAdminMenu: function(items, parentId) {
		var that = this;
		var str = '';
		var subItems = [];
		items.forEach(function(item, index) {
			if(parseInt(item['parent']) == parseInt(parentId)) {
				subItems.push(item);
			}
		});	
		if(subItems.length == 0) {
			return '';
		}
		subItems.forEach(function(item, index) {
			var subMenuItemsHtml = that.printAdminMenu(items, item.id);
			if(subMenuItemsHtml != '') {
				str += '<li class="dropdown bg-success">';
				str += '<a href="/' + STARTUP_SCRIPT + '/' + item.admin_controller + '" class="dropdown-toggle" data-toggle="dropdown">'+item.name+'</a>';
				str += '<ul class="dropdown-menu bg-success" role="menu">';
					str += subMenuItemsHtml;
				str += '</ul>';
				str += '</li>';
			} else {
				str += '<li class="bg-success">';
				str += '<a href="/' + STARTUP_SCRIPT + '/' + item.path + '">'+item.name+'</a>';
				str += '</li>';
			}
			
		});
		
		return str;
	}
});