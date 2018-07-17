pzk.app.init = function() {
	controller = pzk.request.getSegment(2) || 'home';
	action = pzk.request.getSegment(3) || 'index';
	layoutRoot = '/themejs/'+pzk.request.get('theme')+'/layouts';
	skinRoot = '/themejs/'+pzk.request.get('theme')+'/skin';
	themeRoot = '/themejs/'+pzk.request.get('theme') ;
	
	pzk.locator.set({
		'page': '/themejs/songngu3/layouts/page.html',
		'tab': '/themejs/songngu3/layouts/tab.html',
		'htmltag': '/themejs/songngu3/layouts/htmltag.html',
		'cms/menu': '/themejs/songngu3/layouts/cms/menu.html',
		'html/footer': '/themejs/songngu3/layouts/html/footer.html',
		'pages/index': '/themejs/songngu3/pages/index.html',
		'pages/admin': '/themejs/songngu3/pages/admin.html',
		'newsList': '/themejs/songngu3/layouts/cms/news/list.html',
		'grid': '/themejs/songngu3/layouts/grid.html',
		'form': '/themejs/songngu3/layouts/form.html',
		'dialog': '/themejs/songngu3/layouts/dialog.html',
		'pages/admin/login': '/themejs/songngu3/pages/admin/login.html',
		'layouts/admin/login': '/themejs/songngu3/layouts/admin/login.html',
		'layouts/admin/menu': '/themejs/songngu3/layouts/admin/menu.html',
		'pages/admin/grid/index': '/themejs/songngu3/pages/admin/grid/index.html',
		'pages/admin/grid/edit': '/themejs/songngu3/pages/admin/grid/edit.html',
		'pages/admin/table/index': '/themejs/songngu3/pages/admin/table/index.html',
		'pages/admin/question/index': '/themejs/songngu3/pages/admin/question/index.html'
		
	});
	pzk.load('/3rdparty/font-awesome-4.6.3/css/font-awesome.min.css');
	pzk.load('/3rdparty/jquery/jquery.validate.min.js');
	pzk.load('/3rdparty/jquery/additional-methods.min.js');
	
	pzk.load('/themejs/songngu/skin/css/style.css');
	pzk.load('/themejs/songngu3/skin/css/style.css');
	
	pzk.load(layoutRoot + '/cms/header.js');
	pzk.load(layoutRoot + '/cms/menu.js');
	pzk.load(layoutRoot + '/cms/slideshow.js');
	pzk.load(layoutRoot + '/cms/submenu.js');
	pzk.load(layoutRoot + '/cms/footer.js');
	
	pzk.load('/themejs/' + pzk.request.get('theme') + '/controller/' + controller.replace('_', '/') + '.js');
	lang = pzk.get('lang') || 'en';
	language = pzk.get('language_' + lang);
	Class = pzk.get('class') || 5;
	subjectId = parseInt(pzk.request.get('subjectId'));
	if(subjectId) {
		Subject = _db().Select('*').From('categories').WhereId(subjectId).ResultOne();
	}
	topicId = parseInt(pzk.request.get('topicId'));
	if(topicId) {
		Topic = _db().Select('*').From('categories').WhereId(topicId).ResultOne();
	}
	weekId = parseInt(pzk.request.get('weekId'));
	if(weekId) {
		Week = _db().Select('*').From('categories').WhereId(weekId).ResultOne();
	}
	categoryId = parseInt(pzk.request.get('categoryId'));
	if(categoryId) {
		Category = _db().Select('*').From('categories').WhereId(categoryId).ResultOne();
	}
	practice = parseInt(pzk.request.get('practice'));
	documentId = parseInt(pzk.request.get('documentId'));
	if(documentId) {
		Document = _db().Select('*').From('document').WhereId(documentId).ResultOne();
	}
	testId = parseInt(pzk.request.get('testId'));
	if(testId) {
		Test = _db().Select('*').From('tests').WhereId(testId).ResultOne();
	}
	newsId = parseInt(pzk.request.get('newsId'));
	if(newsId) {
		News = _db().Select('*').From('news').WhereId(newsId).ResultOne();
	}
	exerciseNumber = parseInt(pzk.request.get('exerciseNumber'));
	if(!language){
		$.ajax({
			url: '/server.php?language='+lang,
			async: false,
			success: function(resp) {
				eval('language = ' + atob(resp) + ';');
				pzk.set('language_' + lang, language);
			}
		});
	}
}
pzk.app.run = function() {
	if(pzk_controller) {
		if(pzk_controller.init) {
			pzk_controller.init();
		}
		pzk_controller[action](pzk.request.getSegment(4), pzk.request.getSegment(5), pzk.request.getSegment(6), pzk.request.getSegment(7), pzk.request.getSegment(8), pzk.request.getSegment(9));
	}
};
pzk.app.init();