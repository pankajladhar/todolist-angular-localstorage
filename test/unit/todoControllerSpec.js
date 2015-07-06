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

        describe('the filter', function () {
            it('should default to ""', function () {
                scope.$emit('$routeChangeSuccess');

                expect(scope.status).toBe('');
                expect(scope.statusFilter.completionStatus).toBeUndefined();
            });

            describe('being at /active', function () {
                var ctrl;
                it('should filter non-completed', inject(function ($controller) {
                    ctrl = $controller('TodoController', {
                        $scope: scope,
                        mocktoDoAppService :mocktoDoAppService,
                        $routeParams: {
                            status: 'active'
                        }
                    });

                    scope.$emit('$routeChangeSuccess');
                    expect(scope.statusFilter.completionStatus).toBeFalsy();
                }));
            });

            describe('being at /completed', function () {
                var ctrl;
                it('should filter completed', inject(function ($controller) {
                    ctrl = $controller('TodoController', {
                        $scope: scope,
                        $routeParams: {
                            status: 'completed'
                        },
                        mocktoDoAppService :mocktoDoAppService
                    });

                    scope.$emit('$routeChangeSuccess');
                    expect(scope.statusFilter.completionStatus).toBeTruthy();
                }));
            });
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

        xdescribe('having some saved Todos', function () {

            beforeEach(inject(function($controller){

                mocktoDoAppService.insert({ taskTitle: 'Uncompleted Item 1', completionStatus: false });
                mocktoDoAppService.insert({ taskTitle: 'Uncompleted Item 2', completionStatus: false });
                mocktoDoAppService.insert({ taskTitle: 'Completed Item 0', completionStatus: true })
                mocktoDoAppService.insert({ taskTitle: 'Completed Item 1', completionStatus: true })
                scope.$digest();
            }));

            it('should count Todos correctly', function () {

                expect(scope.todos.length).toBe(4);
                expect(scope.remainingTask).toBe(2);
                expect(scope.completedCount).toBe(2);
                expect(scope.allChecked).toBeFalsy();
            });

            it('should save Todos to local storage', function () {
                expect(scope.todos.length).toBe(4);
            });


            it('clearCompletedTodos() should clear completed Todos', function () {
                scope.clearCompletedTodos();
                expect(scope.todos.length).toBe(2);
            });

            it('markAll() should mark all Todos completed', function () {
                scope.markAllCompleted(true);
                scope.$digest();
                expect(scope.completedCount).toBe(4);
            });

            it('revertTodo() get a Todo to its previous state', function () {
                var todo = mocktoDoAppService.todos[0];
                scope.toggleEditMode(todo);
                todo.title = 'Unicorn sparkly skypuffles.';
                scope.revertEdits(todo);
                scope.$digest();
                expect(scope.todos[0].taskTitle).toBe('Uncompleted Item 1');
            });


        });

    })

});