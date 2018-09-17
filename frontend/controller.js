var app = angular.module("mainApp",[]);

app.controller("CRUDController", function ($scope, hexafy, $timeout) {


    $scope.getData = function(){
        console.log("getData");
        var promise = hexafy.service_get_data();

        promise.then(
            function(payload) {
                $scope.Emplist = [];
                $scope.Emplist = payload.data;
                //console.log($scope.Emplist);
            });
    };

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
        };

        hexafy.service_add_data(emp).then(function(){
            clearModel();
            $scope.getData();
        }).then(function(){
            $scope.messageAdd = "post added successfullly";
            $timeout(function(){
                $scope.messageAdd = null;
            }, 2000);
        });
    };
    $scope.deleteData = function (Emp) {
        hexafy.service_delete_data(Emp.id).then(function(){
            clearModel();
            $scope.getData();
        }).then(function(){
            $scope.messageDelete = "post deleted successfullly";
            $timeout(function(){
                $scope.messageDelete = null;
            }, 2000);
        });
    };
    
    $scope.bindSelectData = function (Emp) {
        $scope.id=Emp.id;
        $scope.title = Emp.title;
        $scope.description =Emp.description;
        $scope.category =Emp.category;
    };

    $scope.updateData = function () {
        emp = {
            id: $scope.id,
            title: $scope.title,
            description: $scope.description,
            category: $scope.category
        };
        hexafy.service_update_data(emp).then(function(){
            clearModel();
            $scope.getData();
        }).then(function(){
            $scope.messageUpdate = "post updated successfullly";
            $timeout(function(){
                $scope.messageUpdate = null;
            }, 2000);
        });
    };

    function clearModel() {
        $scope.id=0;
        $scope.title = "";
        $scope.description ="";
        $scope.category ="";
    }

    $scope.getData();

});