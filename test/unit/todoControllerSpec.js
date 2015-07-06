'use strict';

describe('TODO App Controllers', function(){

    beforeEach(module('toDoApp'));

    describe('TodoController', function(){
        var scope, element, mocktoDoAppService, remainingTask;

        beforeEach(inject(function($controller, $rootScope, toDoAppService){

            scope=$rootScope.$new();

            mocktoDoAppService = toDoAppService;
            mocktoDoAppService.todos = [];

            mocktoDoAppService._getFromLocalStorage = function () {
                return [];
            };
            mocktoDoAppService._saveToLocalStorage = function (todos) {
                mocktoDoAppService.todos = todos;
            };


            $controller('TodoController', {
                $scope:scope,
                mocktoDoAppService :mocktoDoAppService
            });

        }));

        it('should not have an edited Todo on start', function () {
            expect(scope.editedTodo).toBeNull();
        });

        it('Should set the title value -- Awesome TODO App --', function(){
            expect(scope.appTitle).toBe('Awesome TODO App');
        });

        it('should not have any Todos on start', function () {
            expect(scope.todos.length).toBe(0);
        });

        xdescribe('having no Todos', function () {
            it('should have all Todos completed', function () {
                scope.$digest();
                expect(scope.allChecked).toBeTruthy();
            });


            it('should not add empty Todos', function () {
                scope.newTodo = '';
                scope.createToDo();
                scope.$digest();
                expect(scope.todos.length).toBe(0);
            });

            it('should not add items consisting only of whitespaces', function () {
                scope.newTodo = '   ';
                scope.createToDo();
                scope.$digest();
                expect(scope.todos.length).toBe(0);
            });


            it('should trim whitespace from new Todos', function () {
                expect(scope.todos.length).toBe(0);
                scope.newTodo = '  buy some unicorns  ';
                scope.createToDo();
                scope.$digest();
                expect(scope.todos.length).toBe(1);
            });
        });

        describe('having some saved Todos', function () {

            beforeEach(inject(function($controller){

                mocktoDoAppService.insert({ taskTitle: 'Uncompleted Item 1', completionStatus: false });
                mocktoDoAppService.insert({ taskTitle: 'Uncompleted Item 2', completionStatus: false });
                mocktoDoAppService.insert({ taskTitle: 'Completed Item 0', completionStatus: true })
                mocktoDoAppService.insert({ taskTitle: 'Completed Item 1', completionStatus: true })

            }));

            it('should count Todos correctly', function () {

                expect(scope.todos.length).toBe(4);
                expect(scope.remainingTask).toBe(2);
                //expect(scope.completedCount).toBe(2);
                //expect(scope.allChecked).toBeFalsy();
            });

            it('should save Todos to local storage', function () {
                expect(scope.todos.length).toBe(4);
            });


        });


        //
        //it('should change completion status',function(){
        //    scope.toggleCompleted(scope.todos[0]);
        //    expect(scope.todos[0].completionStatus).toBe(true);
        //});
        //
        //
        //it('should return notes array with two elements initially and then remove one', function(){
        //    expect(scope.todos.length).toBe(3);
        //    scope.removeToDoTask(scope.todos[0]);
        //    expect(scope.todos.length).toBe(2);
        //});
        //
        //it('should change Task Title',function(){
        //    scope.saveEdits(scope.todos[0]);
        //    expect(scope.todos[0].taskTitle).toBe('Task11');
        //});
        //
        //it('should remove all todos', function(){
        //    expect(scope.todos.length).toBe(2);
        //    scope.clearCompletedTodos();
        //    console.log('dd',scope.todos.length)
        //    expect(scope.todos.length).toBe(0);
        //})
    })

});