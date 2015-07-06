'use strict';

angular.module('toDoApp', [
    'ngRoute',
    'toDoAppControllers',
    'toDoAppServices',
    'toDoAppFilters',
    'todoDirectives'
])
.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'views/todo-view.html',
        controller :'TodoController'
    }).when('/:status',{
        templateUrl: 'views/todo-view.html',
        controller :'TodoController'
    })
    .otherwise({
        redirectTo :'/'
    })
}]);


