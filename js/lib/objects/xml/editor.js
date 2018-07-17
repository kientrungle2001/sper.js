PzkXmlEditor = PzkObj.pzkExt({
	xml: false,
	spec: false,
	xmlPath: '/js/lib/objects/xml/editor/xml.html',
	specPath: '/js/lib/objects/xml/editor/spec.html',
	layout: `
	<div id="(*= co.id*)"></div>
	<script>
		var xml = \`(*= co.xml*)\`;
		var spec = (*= co.spec*);
		Xonomy.lang="en";
		Xonomy.render(xml, document.getElementById('(*= co.id*)'), spec);
	</script>
	`,
	init: function() {
		var that = this;
		pzk.load('/3rdparty/xonomy-3.5.0/xonomy.css');
		pzk.load('/3rdparty/xonomy-3.5.0/xonomy.js');
		if(!that.xml && that.xmlPath && that.xmlPath !== '' && that.xmlPath !== 'false') {
			pzk.load(that.xmlPath, function(resp) {
				that.xml = resp;
			});
		}
		pzk.load(that.specPath, function(resp) {
			that.spec = resp;
		});
	}
});