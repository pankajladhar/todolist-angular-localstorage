xdescribe('toDoAppServices tests', function() {
    var factory;

    // excuted before each "it()" is run.
    beforeEach(function() {
        // load the module
        module('toDoApp');

        // inject your factory for testing
        inject(function(toDoAppService) {
            factory = toDoAppService;
        });

        var store = [
            {
                taskTitle: 'Task1',
                completionStatus: false
            },
            {
                taskTitle: 'Task2',
                completionStatus: false
            }
        ]

        //Object.defineProperty(window,'localStorage', {value : localStorage, configurable : true, enumerable : true, writable : true})

        spyOn(localStorage, 'getItem').andCallFake(function() {
            return store;
        });

        spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
            return store[key] = value + '';
        });

        spyOn(localStorage, 'clear').andCallFake(function() {
            store = {};
        });

    });

    // check to see if it has the expected function
    it('should have a get function', function() {

        //expect(localStorage.getItem).toHaveBeenCalled();

        expect(angular.isFunction(factory.get)).toBe(true);
        expect(angular.isFunction(factory.put)).toBe(true);

    });

    //check to see if it returns three notes initially
    it('should return three todo notes initially', function() {
        var result = factory.get();

        expect(result.length).toBe(3);
    });

    //check if it successfully adds a new item
    it('should return four todo notes after adding one more', function() {
        factory.put('Angular is awesome');

        var result = factory.get();
        expect(result.length).toBe(4);
    });
});

