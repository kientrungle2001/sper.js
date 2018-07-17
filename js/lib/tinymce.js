function setTinymce() {
	if(typeof tinymce != 'undefined') {
		tinymce.init({
			selector: "textarea.tinymce",
			forced_root_block : "",
			force_br_newlines : true,
			force_p_newlines : false,
			relative_url: false,
			remove_script_host: false,
			plugins: [
				"advlist autolink lists link image charmap print preview anchor",
				"searchreplace visualblocks code fullscreen media",
				"insertdatetime media table contextmenu paste textcolor template"
			],

			toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | styleselect formatselect fontselect fontsizeselect | forecolor backcolor | template",
			entity_encoding : "raw",
			relative_urls: false,
			external_filemanager_path: "/3rdparty/Filemanager/filemanager/",
			filemanager_title:"Quản lý file upload" ,
			external_plugins: { "filemanager" :"/3rdparty/Filemanager/filemanager/plugin.min.js"},
			height: 250,
			content_css: '/3rdparty/bootstrap3/css/bootstrap.min.css',
			templates: '/3rdparty/tinymce/plugins/tinymce-templates-bootstrap-templates/tinymce-templates-bootstrap-templates.php'
		});
	} else {
		pzk.load(BASE_URL + '/3rdparty/tinymce/tinymce.min.js', function() {
			tinymce.init({
				selector: "textarea.tinymce",
				forced_root_block : "",
				force_br_newlines : true,
				force_p_newlines : false,
				relative_url: false,
				remove_script_host: false,
				plugins: [
					"advlist autolink lists link image charmap print preview anchor",
					"searchreplace visualblocks code fullscreen media",
					"insertdatetime media table contextmenu paste textcolor template"
				],

				toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | styleselect formatselect fontselect fontsizeselect | forecolor backcolor | template",
				entity_encoding : "raw",
				relative_urls: false,
				external_filemanager_path: "/3rdparty/Filemanager/filemanager/",
				filemanager_title:"Quản lý file upload" ,
				external_plugins: { "filemanager" :"/3rdparty/Filemanager/filemanager/plugin.min.js"},
				height: 250,
				content_css: '/3rdparty/bootstrap3/css/bootstrap.min.css',
				templates: '/3rdparty/tinymce/plugins/tinymce-templates-bootstrap-templates/tinymce-templates-bootstrap-templates.php'
			});	
		});	
	}	
}

function setInputTinymceClient() {
	
	if(tinymce) {
		tinymce.init({
			selector: "textarea.tinymce_input",
			forced_root_block : "",
			force_br_newlines : true,
			force_p_newlines : false,
			relative_url: false,
			remove_script_host: false,
			
			toolbar: "forecolor backcolor",
			entity_encoding : "raw",
			relative_urls: false,
			external_filemanager_path: "/3rdparty/Filemanager/filemanager/",
			filemanager_title:"Quản lý file upload" ,
			external_plugins: { "filemanager" :"/3rdparty/Filemanager/filemanager/plugin.min.js"},
			height: 100,
			content_css: '/3rdparty/bootstrap3/css/bootstrap.min.css'
		});
	} else {
		pzk.load([BASE_URL + '/3rdparty/tinymce/js/tinymce/tinymce.min.js'], function() {
			tinymce.init({
				selector: "textarea.tinymce_input",
				forced_root_block : "",
				force_br_newlines : true,
				force_p_newlines : false,
				relative_url: false,
				remove_script_host: false,
				

				toolbar: "forecolor backcolor",
				entity_encoding : "raw",
				relative_urls: false,
				external_filemanager_path: "/3rdparty/Filemanager/filemanager/",
				filemanager_title:"Quản lý file upload" ,
				external_plugins: { "filemanager" :"/3rdparty/Filemanager/filemanager/plugin.min.js"},
				height: 100,
				content_css: '/3rdparty/bootstrap3/css/bootstrap.min.css'
			});	
		});	
	}
	
	
}