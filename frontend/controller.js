var app = angular.module("mainApp",[]);
app.controller("CRUDController", function ($scope, hexafy) {

    var promise = hexafy.service_get_data();

    promise.then(
        function(payload) {
            $scope.Emplist = payload.data;
            //console.log($scope.Emplist);
        });
    

    $scope.addData = function () {
        var emp = {
            title: $scope.title,
            description: $scope.description,
            category: $scope.category
        }

        hexafy.service_add_data(emp);
        clearModel() //reset all the values to default
    }
    $scope.deleteData = function (Emp) {
        var index = $scope.Emplist.indexOf(Emp);
        hexafy.service_delete_data(index);
    }
    
    $scope.bindSelectData = function (Emp) {
        $scope.id=Emp.id;
        $scope.name = Emp.name;
        $scope.salary =Emp.salary;
    }

    $scope.updateData = function () {
        for (var i=0;i<$scope.Emplist.length;i++){
            if ($scope.Emplist[i].id == $scope.id){
                $scope.Emplist[i].name = $scope.name;
                $scope.Emplist[i].salary = $scope.salary;
            }
        };
        hexafy.service_update_data($scope.Emplist);
    }

    function clearModel() {
        $scope.id=0;
        $scope.name = "";
        $scope.salary =0;
    }

});