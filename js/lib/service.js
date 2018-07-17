pzk_service = {
	call: function(model, service, params, callback) {
		$.ajax({
			url: '/call/service/' + model + '/' + service + '/' + (params[0] || '') + '/' + (params[1] || '') + '/' + (params[2] || '') + '/' + (params[3] || '') + '/' + (params[4] || '') + '/' + (params[5] || ''),
			type: 'get',
			dataType: 'json',
			success: function(resp) {
				if(callback)
					callback(resp);
			}
			
		});
	},
	register: function(model, service) {
		this[model] = {
			
		};
		this[model][service] = function(params, callback) {
			$.ajax({
				url: '/call/service/' + model + '/' + service + '/' + (params[0] || '') + '/' + (params[1] || '') + '/' + (params[2] || ''),
				type: 'get',
				dataType: 'json',
				success: function(resp) {
					if(callback)
						callback(resp);
				}
				
			});
		}
	}
};