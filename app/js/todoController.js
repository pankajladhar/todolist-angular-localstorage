'use strict';

var toDoAppControllers = angular.module('toDoAppControllers',[]);

toDoAppControllers.controller('TodoController',['$scope', 'toDoAppService', '$routeParams',  function($scope, toDoAppService, $routeParams){


        var remainingTask = function(todos) {
            var count = 0;
            todos.forEach(function (todo) {
                count += todo.completionStatus ? 0 : 1;
            });
            return count;
        }

        $scope.todos = toDoAppService.get();

        $scope.appTitle = "Awesome TODO App";
        $scope.editedTodo = null;

       $scope.$watch(function(){
            $scope.isToggleToDoTaskList = ($scope.todos.length==0) ? true : false;
            $scope.remainingTask = remainingTask($scope.todos);
            $scope.completedCount = $scope.todos.length - $scope.remainingTask;
            $scope.allChecked = (!$scope.remainingTask);

        });

        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';
            $scope.statusFilter = (status === 'active') ? { completionStatus: false } : (status === 'completed') ? { completionStatus: true } : {};
        });


        $scope.createToDo = function() {
            var newTodo = {
                taskTitle: $scope.newTodo.trim(),
                completionStatus: false
            };

            if (!newTodo.taskTitle) {
                return;
            }

            toDoAppService.insert(newTodo);
            $scope.newTodo = '';
        };

        $scope.removeToDoTask = function(removeToDoTask) {
            toDoAppService.delete(removeToDoTask);
        };


        $scope.toggleCompleted = function (changeStatusToDo, completed) {
            if (angular.isDefined(completed)) {
                changeStatusToDo.completionStatus = completed;
            }
            toDoAppService.change(changeStatusToDo,$scope.todos.indexOf(changeStatusToDo));
        };



        $scope.toggleEditMode = function(todo) {
            $scope.editedTodo = todo;
            $scope.originalTodo = angular.extend({}, todo);
        }

        $scope.saveEdits = function(editAbleToDo) {
            toDoAppService.change(editAbleToDo,$scope.todos.indexOf(editAbleToDo));
            $scope.editedTodo = null;
        }

        $scope.markAllCompleted = function (completed) {
            $scope.todos.forEach(function (todo) {
                if(todo.completionStatus !== completed){
                    $scope.toggleCompleted(todo, completed)
                }
            });
        }

        $scope.revertEdits = function(revertTodo){
            $scope.todos[$scope.todos.indexOf(revertTodo)] = $scope.originalTodo;
            $scope.originalTodo = null;
        }

        $scope.clearCompletedTodos = function(){
            toDoAppService.clearCompleted();
        }

}]);



