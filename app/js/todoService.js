var toDoAppServices = angular.module('toDoAppServices',[]);

toDoAppServices.factory('toDoAppService', function($q) {

    var STORAGE_ID = "ToDo-TaskList-Store"
    var store = {

        todos : [],

        _getFromLocalStorage: function() {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        _saveToLocalStorage: function(todos) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        },
        
        get : function () {
            return angular.copy(store._getFromLocalStorage(), store.todos);
        },

        insert : function (todo) {
            store.todos.push(todo);
            store._saveToLocalStorage(store.todos);
        },

        delete : function(todo) {
            store.todos.splice(store.todos.indexOf(todo), 1);
            store._saveToLocalStorage(store.todos);
        },

        change: function(todo, index){
            store.todos[index] = todo;
            store._saveToLocalStorage(store.todos);
        },

        clearCompleted : function(){
            var completed = [];
            var unCompleted = [];
            store.todos.forEach(function(todo){
                if(todo.completionStatus){
                    completed.push(todo);
                }
                else{
                    unCompleted.push(todo);
                }
            });
            angular.copy(unCompleted, store.todos);
            store._saveToLocalStorage(store.todos);

        }

    }
    return store;
});