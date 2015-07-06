xdescribe('directive tests', function() {
    beforeEach(module('toDoApp'));
    it('should set border-radius to 10',
        inject(function($compile,$rootScope) {
            scope = $rootScope.$new();

            // get an element representation
            elem = angular.element("<span custom-border-radius=\"10\">sample</span>");

            // create a new child scope
            scope = $rootScope.$new();

            // finally compile the HTML
            $compile(elem)(scope);

            // expect the background-color css property to be desirabe one
            expect(elem.css("border-radius")).toEqual('10px');
        })
    );
});