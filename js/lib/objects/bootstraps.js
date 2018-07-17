pzk.lib('objects/htmltag');

PzkHtmlform = PzkHtmltag.pzkExt({
	'tag': 'form'
});

PzkContainer = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'container ' + this['class'] : 'container';
	}
});

PzkContainerFluid = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'container-fluid ' + this['class'] : 'container-fluid';
	}
});

PzkRow = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'row ' + this['class'] : 'row';
	}
});

PzkCol = PzkHtmltag.pzkExt({
	'tag': 'div',
	getColClass: function() {
		var cols = [];
		if(this.xs) {
			cols.push('col-xs-' + this.xs);
		}
		if(this.xso) {
			cols.push('col-xs-offset-' + this.xso);
		}
		if(this.sm) {
			cols.push('col-sm-' + this.sm);
		}
		if(this.smo) {
			cols.push('col-sm-offset-' + this.smo);
		}
		if(this.md) {
			cols.push('col-md-' + this.md);
		}
		if(this.mdo) {
			cols.push('col-md-offset-' + this.mdo);
		}
		if(this.lg) {
			cols.push('col-lg-' + this.lg);
		}
		if(this.lgo) {
			cols.push('col-lg-offset-' + this.lgo);
		}
		return cols.join(' ');
	},
	init: function() {
		this['class'] = this['class'] ? this.getColClass() + ' ' + this['class'] : this.getColClass();
	}
});

PzkColFull = PzkCol.pzkExt({
	xs: 12
});

PzkColHalf = PzkCol.pzkExt({
	md: 6,
	xs: 12
});

PzkColThird = PzkCol.pzkExt({
	md: 4,
	xs: 12
});

PzkColTwoThird = PzkCol.pzkExt({
	md: 8,
	xs: 12
});

PzkColQuarter = PzkCol.pzkExt({
	md: 3,
	xs: 12
});
PzkColTwoQuarter = PzkCol.pzkExt({
	md: 6,
	xs: 12
});
PzkColThreeQuarter = PzkCol.pzkExt({
	md: 9,
	xs: 12
});

PzkFormGroup = PzkFormgroup = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'form-group ' + this['class'] : 'form-group';
	}
});

PzkFormInput = PzkForminput = PzkHtmltag.pzkExt({
	layout: `
	<div class="form-group">
    <label for="(*= co.id*)">(*= co.label*)</label>
    <input type="(*= co.type || 'text' *)" class="form-control" id="(*= co.id*)" placeholder="(*= co.placeholder || ''*)">
  </div>`
});

PzkIcon = PzkHtmltag.pzkExt({
	'tag': 'span',
	init: function() {
		this['class'] = this['class'] ? 'glyphicon glyphicon-'+this.symbol+' ' + this['class'] : 'glyphicon glyphicon-'+this.symbol;
	}
});

PzkIconStar = PzkSymbolStar = PzkIcon.pzkExt({
	symbol: 'star'
});

PzkIconUser = PzkSymbolUser = PzkIcon.pzkExt({
	symbol: 'user'
});

PzkIconSearch = PzkSymbolSearch = PzkIcon.pzkExt({
	symbol: 'search'
});

PzkAlert = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'alert',
	init: function() {
		this['class'] = this['class'] ? 'alert alert-'+this.context+' ' + this['class'] : 'alert alert-'+this.context;
	}
});

PzkAlertDanger = PzkAlert.pzkExt({
	context: 'danger'
});

PzkAlertPrimary = PzkAlert.pzkExt({
	context: 'primary'
});

PzkAlertSuccess = PzkAlert.pzkExt({
	context: 'success'
});

PzkBg = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'bg-'+this.context+' ' + this['class'] : 'bg-'+this.context;
	}
});

PzkBgDanger = PzkBg.pzkExt({
	context: 'danger'
});

PzkBgPrimary = PzkBg.pzkExt({
	context: 'primary'
});

PzkBgSuccess = PzkBg.pzkExt({
	context: 'success'
});

PzkText = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'text-'+this.context+' ' + this['class'] : 'text-'+this.context;
	}
});

PzkSpanDanger = PzkText.pzkExt({
	tag: 'span',
	context: 'danger'
});

PzkSpanPrimary = PzkText.pzkExt({
	tag: 'span',
	context: 'primary'
});

PzkCaret = PzkHtmltag.pzkExt({
	'tag': 'span',
	'class': 'caret'
});

PzkDropdown = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'dropdown ' + this['class'] : 'dropdown';
	}
});

PzkDropdownToggle = PzkHtmltag.pzkExt({
	'tag': 'a',
	'data-toggle': 'dropdown',
	'role': 'button',
	'aria-haspopup': 'true',
	'aria-expanded': 'false',
	'href': '#',
	init: function() {
		this['class'] = this['class'] ? 'dropdown-toggle ' + this['class'] : 'dropdown-toggle';
	}
});

PzkDropdownMenu = PzkHtmltag.pzkExt({
	'tag': 'ul',
	init: function() {
		this['class'] = this['class'] ? 'dropdown-menu ' + this['class'] : 'dropdown-menu';
	}
});

PzkDropdownMenuItem = PzkHtmltag.pzkExt({
	'tag': 'li'
});

PzkBtnGroup = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'group',
	'size': false,
	init: function() {
		this['class'] = this['class'] ? 'btn-group ' + this['class'] : 'btn-group';
		if(this.size) {
			this['class'] += ' btn-group-'+this.size;
		}
	}
});

PzkInputGroup = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'group',
	'size': false,
	init: function() {
		this['class'] = this['class'] ? 'input-group ' + this['class'] : 'input-group';
		if(this.size) {
			this['class'] += ' input-group-'+this.size;
		}
	}
});

PzkInputGroupBtn = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'input-group-btn ' + this['class'] : 'input-group-btn';
	}
});

PzkBtn = PzkHtmltag.pzkExt({
	'tag': 'button',
	'type': 'button',
	'context': 'default',
	'size': false,
	init: function() {
		this['class'] = this['class'] ? 'btn btn-'+this.context+' ' + this['class'] : 'btn btn-'+this.context;
		if(this.size) {
			this['class'] += ' btn-'+this.size;
		}
	}
});

PzkBtnDanger = PzkBtn.pzkExt({
	context: 'danger'
});

PzkBtnDefault = PzkBtn.pzkExt({
	context: 'default'
});

PzkBtnPrimary = PzkBtn.pzkExt({
	context: 'primary'
});

PzkBtnSuccess = PzkBtn.pzkExt({
	context: 'success'
});

PzkBtnModal = PzkBtn.pzkExt({
	'data-toggle': 'modal'
});

PzkBtnToolbar = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'toolbar',
	init: function() {
		this['class'] = this['class'] ? 'btn-toolbar ' + this['class'] : 'btn-toolbar';
	}
});

PzkNav = PzkHtmltag.pzkExt({
	'tag': 'ul',
	'context': 'tabs',
	init: function() {
		this['class'] = this['class'] ? 'nav nav-'+this.context+' ' + this['class'] : 'nav nav-'+this.context;
	}
});

PzkNavItem = PzkHtmltag.pzkExt({
	'tag': 'li',
	'role': 'presentation'
});

PzkNavTab = PzkNav.pzkExt({
	'role': 'tablist'
});

PzkNavTabLink = PzkHtmltag.pzkExt({
	'tag': 'a',
	'role': 'tab',
	'data-toggle': 'tab',
	init: function() {
		this['aria-controls'] = this.href.replace('#', '');
	}
});

PzkNavTabContent = PzkHtmltag.pzkExt({
	init: function() {
		this['class'] = this['class'] ? 'tab-content ' + this['class'] : 'tab-content';
	}
});

PzkBreadcrumb = PzkHtmltag.pzkExt({
	'tag': 'ol',
	init: function() {
		this['class'] = this['class'] ? 'breadcrumb ' + this['class'] : 'breadcrumb';
	}
});

PzkBreadcrumbItem = PzkHtmltag.pzkExt({
	'tag': 'li'
});

PzkPagination = PzkHtmltag.pzkExt({
	'tag': 'ul',
	init: function() {
		this['class'] = this['class'] ? 'pagination ' + this['class'] : 'pagination';
	}
});

PzkPaginationItem = PzkHtmltag.pzkExt({
	'tag': 'li'
});

PzkPager = PzkHtmltag.pzkExt({
	'tag': 'ul',
	init: function() {
		this['class'] = this['class'] ? 'pager ' + this['class'] : 'pager';
	}
});

PzkPagerItem = PzkHtmltag.pzkExt({
	'tag': 'li'
});

PzkLbl = PzkHtmltag.pzkExt({
	'tag': 'span',
	'context': 'default',
	init: function() {
		this['class'] = this['class'] ? 'label label-'+this.context+' ' + this['class'] : 'label label-'+this.context;
	}
});

PzkBadge = PzkHtmltag.pzkExt({
	'tag': 'span',
	init: function() {
		this['class'] = this['class'] ? 'badge ' + this['class'] : 'badge';
	}
});

PzkJumbotron = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'jumbotron ' + this['class'] : 'jumbotron';
	}
});

PzkPageHeader = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'page-header ' + this['class'] : 'page-header';
	}
});

PzkProgress = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'progress ' + this['class'] : 'progress';
	}
});

PzkProgressBar = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'progressbar',
	'aria-valuenow': '60',
	'aria-valuemin': '0',
	'aria-valuemax': '100',
	'context': 'primary',
	init: function() {
		this['class'] = this['class'] ? 'progress-bar progress-bar-'+this.context+' ' + this['class'] : 'progress-bar progress-bar-' + this.context;
	}
});

PzkMedia = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'media ' + this['class'] : 'media';
	}
});

PzkMediaLeft = PzkHtmltag.pzkExt({
	'tag': 'div',
	'align': 'top',
	init: function() {
		this['class'] = this['class'] ? 'media-left media-'+this.align+' ' + this['class'] : 'media-left media-'+this.align;
	}
});

PzkMediaObject = PzkHtmltag.pzkExt({
	'tag': 'img',
	init: function() {
		this['class'] = this['class'] ? 'media-object ' + this['class'] : 'media-object';
	}
});

PzkMediaBody = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'media-body ' + this['class'] : 'media-body';
	}
});

PzkMediaHeading = PzkHtmltag.pzkExt({
	'tag': 'h4',
	init: function() {
		this['class'] = this['class'] ? 'media-heading ' + this['class'] : 'media-heading';
	}
});

PzkTooltip = PzkHtmltag.pzkExt({
	'tag' : 'span',
	'data-toggle' : 'tooltip',
	'data-placement' : 'left'
});

PzkMediaList = PzkHtmltag.pzkExt({
	'tag': 'ul',
	init: function() {
		this['class'] = this['class'] ? 'media-list ' + this['class'] : 'media-list';
	}
});

PzkMediaItem = PzkHtmltag.pzkExt({
	'tag': 'li',
	init: function() {
		this['class'] = this['class'] ? 'media ' + this['class'] : 'media';
	}
});

PzkListGroup = PzkHtmltag.pzkExt({
	'tag': 'ul',
	init: function() {
		this['class'] = this['class'] ? 'list-group ' + this['class'] : 'list-group';
	}
});

PzkListGroupItem = PzkHtmltag.pzkExt({
	'tag': 'li',
	'context': false,
	init: function() {
		this['class'] = this['class'] ? 'list-group-item ' + this['class'] : 'list-group-item';
		if(this['context'])
			this['class'] += ' list-group-item-' + this['context'];
	}
});

PzkPanel = PzkHtmltag.pzkExt({
	'tag': 'div',
	'context': 'default',
	init: function() {
		this['class'] = this['class'] ? 'panel ' + this['class'] : 'panel';
		if(this['context'])
			this['class'] += ' panel-' + this['context'];
	}
});

PzkPanelHeading = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'panel-heading ' + this['class'] : 'panel-heading';
	}
});

PzkPanelTitle = PzkHtmltag.pzkExt({
	'tag': 'h3',
	init: function() {
		this['class'] = this['class'] ? 'panel-title ' + this['class'] : 'panel-title';
	}
});

PzkPanelBody = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'panel-body ' + this['class'] : 'panel-body';
	}
});

PzkPanelFooter = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'panel-footer ' + this['class'] : 'panel-footer';
	}
});

PzkWell = PzkHtmltag.pzkExt({
	'tag': 'div',
	'context': false,
	init: function() {
		this['class'] = this['class'] ? 'well ' + this['class'] : 'well';
		if(this['context'])
			this['class'] += ' well-' + this['context'];
	}
});

PzkModal = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'dialog',
	'tabindex': '-1',
	init: function() {
		this['class'] = this['class'] ? 'modal fade ' + this['class'] : 'modal fade';
	}
});

PzkModalDialog = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'document',
	init: function() {
		this['class'] = this['class'] ? 'modal-dialog ' + this['class'] : 'modal-dialog';
	}
});

PzkModalContent = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'modal-content ' + this['class'] : 'modal-content';
	}
});

PzkModalHeader = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'modal-header ' + this['class'] : 'modal-header';
	}
});

PzkModalTitle = PzkHtmltag.pzkExt({
	'tag': 'h4',
	init: function() {
		this['class'] = this['class'] ? 'modal-title ' + this['class'] : 'modal-title';
	}
});

PzkModalBody = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'modal-body ' + this['class'] : 'modal-body';
	}
});

PzkModalFooter = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'modal-footer ' + this['class'] : 'modal-footer';
	}
});

PzkCarousel = PzkHtmltag.pzkExt({
	'tag': 'div',
	'data-ride': 'carousel',
	init: function() {
		this['class'] = this['class'] ? 'carousel slide ' + this['class'] : 'carousel slide';
	}
});

PzkCarouselIndicators = PzkHtmltag.pzkExt({
	'tag': 'ol',
	init: function() {
		this['class'] = this['class'] ? 'carousel-indicators ' + this['class'] : 'carousel-indicators';
	}
});

PzkCarouselIndicatorsItem = PzkHtmltag.pzkExt({
	'tag': 'li',
	'data-slide-to': '0'
});

PzkCarouselInner = PzkHtmltag.pzkExt({
	'tag': 'div',
	'role': 'listbox',
	init: function() {
		this['class'] = this['class'] ? 'carousel-inner ' + this['class'] : 'carousel-inner';
	}
});

PzkCarouselItem = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'item ' + this['class'] : 'item';
	}
});

PzkCarouselCaption = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'carousel-caption ' + this['class'] : 'carousel-caption';
	}
});

PzkCarouselControl = PzkHtmltag.pzkExt({
	'tag': 'a',
	'role': 'button',
	'data-slide': 'prev',
	'direction': 'left',
	init: function() {
		this['class'] = this['class'] ? 'carousel-control ' + this['class'] : 'carousel-control';
		this['class'] += ' ' + this['direction'];
		if(this.direction == 'left') {
			this['data-slide'] = 'prev';
		} else {
			this['data-slide'] = 'next';
		}
	}
});

PzkNavbar = PzkHtmltag.pzkExt({
	'tag': 'nav',
	'context': 'default',
	init: function() {
		this['class'] = this['class'] ? 'navbar navbar-' + this.context + ' ' + this['class'] : 'navbar navbar-' + this.context;
	}
});

PzkNavbarHeader = PzkHtmltag.pzkExt({
	'tag': 'div',
	init: function() {
		this['class'] = this['class'] ? 'navbar-header ' + this['class'] : 'navbar-header';
	}
});

PzkNavbarToggle = PzkObj.pzkExt({
	layout: `<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="(*= co.href*)" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>`,
	href: '#toggle-menu'
});

PzkNavbarBrand = PzkHtmltag.pzkExt({
	'tag': 'a',
	href: '#',
	init: function() {
		this['class'] = this['class'] ? 'navbar-brand ' + this['class'] : 'navbar-brand';
	}
});

PzkNavbarCollapse = PzkHtmltag.pzkExt({
	'tag': 'div',
	id: 'toggle-menu',
	init: function() {
		this['class'] = this['class'] ? 'collapse navbar-collapse ' + this['class'] : 'collapse navbar-collapse';
	}
});

PzkNavbarNav = PzkHtmltag.pzkExt({
	'tag': 'ul',
	init: function() {
		this['class'] = this['class'] ? 'nav navbar-nav ' + this['class'] : 'nav navbar-nav';
	}
});

PzkNavbarNavItem = PzkHtmltag.pzkExt({
	'tag': 'li'
});

PzkFa = PzkHtmltag.pzkExt({
	'tag': 'i',
	'size': '2x',
	init: function() {
		this['class'] = this['class'] ? 'fa fa-'+ this.symbol + ' ' + this['class'] : 'fa fa-'+ this.symbol;
		if(this.size) {
			this['class'] += ' fa-' + this.size;
		}
	}
});