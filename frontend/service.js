app.service('hexafy', function ($http) {


	this.service_add_data = function (data) {
		console.log(data);

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8000/post/insert',
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencodedg' , 'Accept' : 'application/json'}
        })

	}

	this.service_delete_data = function(index){
		list = JSON.parse(localStorage.getItem('Emplist'));
		list.splice(index,1);
		localStorage.setItem( 'Emplist', JSON.stringify(list) );
	}

	this.service_update_data = function (list){
		localStorage.setItem( 'Emplist', JSON.stringify(list) );
	}

	this.service_get_data = function() {
            var promise =  $http.get('http://127.0.0.1:8000/post');
            //console.log(promise);
            return promise;

	}

})
