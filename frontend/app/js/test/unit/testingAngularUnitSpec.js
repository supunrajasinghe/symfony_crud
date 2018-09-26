describe('Testing Angular Test Suite',function() {

    beforeEach(module('mainApp'));

    describe('Testing angular works',function(){

        var scope,ctrl;

        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            ctrl = $controller('CRUDController' , {$scope:scope});
        }));


        it('should initialize testAngular in the scope', function() {
            expect(scope.testAngular).toBeDefined();
            expect(scope.testAngular).toBe('test for angular');
        });


        it('has a dummy spec to test 2 + 2', function() {

            expect(2+2).toEqual(4);
        });

        // it('add data test' , function{
        //
        // });

    });


    describe('Testing service' , function(){
        var hexafy, httpBackend;
        beforeEach(function () {

            module('mainApp');

            inject(function ($httpBackend, _hexafy_) {
                hexafy = _hexafy_;
                httpBackend = $httpBackend;
            });
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });


        it('get data function', function () {
            httpBackend.expectGET("http://127.0.0.1:8004/api")
                .respond(200, {
                    status: "success"
                });

            var returnedPromise = hexafy.service_get_data();

            returnedPromise.then(function (response) {
                expect(response.data.status).toEqual('success');
            });

            httpBackend.flush();
        });

        it('insert data function', function () {
            var emp = {

                "title": "symfony",
                "description": "php framework",
                "category": "tech",
            };
            httpBackend
                .when('POST', 'http://127.0.0.1:8004/api/insert',emp)
                .respond(200, {
                    status: "success"
                });

            hexafy.service_add_data(emp).then(function (response) {
                expect(response.data.status).toEqual('success');
            });
            httpBackend.flush();
        });

        it('delete data function', function () {
            httpBackend
                .when('POST', 'http://127.0.0.1:8004/api/delete')
                .respond(200, {
                    status: "success"
                });

            hexafy.service_delete_data(4).then(function (response) {
                expect(response.data.status).toEqual('success');
            });
            httpBackend.flush();
        });

        it('update data function', function () {
            httpBackend
                .when('POST', 'http://127.0.0.1:8004/api/update')
                .respond(200, {
                    status: "success"
                });

            hexafy.service_update_data(4).then(function (response) {
                expect(response.data.status).toEqual('success');
            });
            httpBackend.flush();
        });


    });


});