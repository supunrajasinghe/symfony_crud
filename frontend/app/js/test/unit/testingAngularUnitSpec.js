describe('Testing Angular Test Suite',function() {
    describe('Testing angularjs controller',function(){
        it('should initialize testAngular in the scope', function() {
            module('mainApp');

            var scope ={};
            var ctrl;

            inject(function($controller){
                ctrl = $controller('CRUDController' , {$scope:scope});
            });

            expect(scope.testAngular).toBeDefined();
            expect(scope.testAngular).toBe('test for angular');
        });
    });
});