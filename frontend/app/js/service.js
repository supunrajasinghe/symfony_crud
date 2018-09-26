app.service('hexafy', function ($http) {


	this.service_add_data = function (data) {
		console.log(data);

        return $http({
            method: 'POST',
            url: 'http://127.0.0.1:8004/api/insert',
            data: data
            // header : { 'Content-Type': 'application/json'}
        })

	};

	this.service_delete_data = function(id){
        return $http({
            method: 'POST',
            url: 'http://127.0.0.1:8004/api/delete',
            data: {
                id: id
            }
        })
	};

	this.service_update_data = function (data){
        console.log(data);

        return $http({
            method: 'POST',
            url: 'http://127.0.0.1:8004/api/update',
            data: data
        })
	};

	this.service_get_data = function() {
            var promise =  $http.get('http://127.0.0.1:8004/api');
            //console.log(promise);
            return promise;

	};

});
