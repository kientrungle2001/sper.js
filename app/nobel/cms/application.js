pzk.app.init = function() {
	controller 	= pzk.request.getSegment(2) || 'home';
	action 		= pzk.request.getSegment(3) || 'index';
	theme 		= pzk.request.get('theme');
	layoutRoot = '/themejs/'+theme+'/layouts';
	skinRoot = '/themejs/'+theme+'/skin';
	pzk.lib('string');
	pzk.lib('array');
	// pzk.lib('html');
	pzk.lib('locator');
	pzk.lib('template');
	pzk.lib('object');
	pzk.lib('parser');
	pzk.lib('database');
	pzk.lib('model');
	pzk.lib('browser');
	pzk.lib('lazy');
	pzk.load('/themejs/' + theme + '/controller/' + controller.replace('_', '/') + '.js');
};
pzk.app.init();

pzk.app.run = function() {
	if(pzk_controller) {
		if(pzk_controller.init) {
			pzk_controller.init();
		}
		$(function() {
			if(is_string(pzk_controller[action])) {
				var elem = PzkParser.parse(pzk_controller[action]);
				$('#page-content').append(elem.html());
			} else {
				var result = pzk_controller[action](pzk.request.getSegment(4), pzk.request.getSegment(5), pzk.request.getSegment(6), pzk.request.getSegment(7), pzk.request.getSegment(8), pzk.request.getSegment(9));
				if(typeof result !== 'undefined') {
					if(is_string(result)) {
						var elem = PzkParser.parse(result);
						$('#page-content').append(elem.html());
					}
				}
			}
		});
	}
};