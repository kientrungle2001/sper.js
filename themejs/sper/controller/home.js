pzk_controller = new PzkController({
	masterPage: layoutRoot + '/index.html',
	masterPosition: 'mainContent',
	index: function() {
		this.initPage();
		var home = this.getLayout('/home.html');
		var homeObj = this.parse(home);
		this.append(homeObj);
		this.display();
	},
	post: function() {
		this.initPage();
		var productPost = this.getLayout('/product/post.html');
		var productPostObj = this.parse(productPost);
		this.append(productPostObj);
		this.display();
	},
	category: function() {
		this.initPage();
		var category = this.getLayout('/home/category.html');
		var categoryObj = this.parse(category);
		this.append(categoryObj);
		this.display();
	},
	news: function() {
		this.initPage();
		var news = this.getLayout('/news.html');
		var newsObj = this.parse(news);
		this.append(newsObj);
		this.display();
	},
	newsDetail: function() {
		this.initPage();
		var news = this.getLayout('/newsDetail.html');
		var newsObj = this.parse(news);
		this.append(newsObj);
		this.display();
	},
	branch: function() {
		this.initPage();
		var branch = this.getLayout('/branch.html');
		var branchObj = this.parse(branch);
		this.append(branchObj);
		this.display();
	}
});