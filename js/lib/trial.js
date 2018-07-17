$(function() {
	$('.btncon .btn-custom:first').click(function() {
		var isLoggedIn = false;
		$.ajax({
			url: '/home/checkIsLoggedIn',
			async: false,
			success: function(resp) {
				if(resp == '1') {
					isLoggedIn = true;
				} else {
					isLoggedIn = false;
				}
			}
		});
		if(isLoggedIn) {
			return true;
		} else {
			alert('Bạn cần đăng nhập mới được dùng thử');
			return false;
		}
		
	});
});