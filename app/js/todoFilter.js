'use strict';
var toDoAppFilters = angular.module('toDoAppFilters',[]) ;

toDoAppFilters.filter('truncate', function() {
    return function(input,length) {
        return (input.length > length ? input.substring(0, length) : input );
    };
});