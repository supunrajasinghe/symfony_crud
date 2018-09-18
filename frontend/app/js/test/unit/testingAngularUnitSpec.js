describe('Testing Angular Test Suite',function() {

    beforeEach(module('mainApp'));

    describe('Testing angularjs controller',function(){

        var scope,ctrl;

        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            ctrl = $controller('CRUDController' , {$scope:scope});
        }));


        it('should initialize testAngular in the scope', function() {
            expect(scope.testAngular).toBeDefined();
            expect(scope.testAngular).toBe('test for angular');
        });


        // it('add data test' , function{
        //
        // });

    });
});