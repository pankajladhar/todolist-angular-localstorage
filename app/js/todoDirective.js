'use strict';

var todoDirectives = angular.module('todoDirectives',[]);

todoDirectives.directive('customBorderRadius', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.css({'border-radius': attrs.customBorderRadius+'px'});
        }
    };
});

todoDirectives.directive('todoFocus', function todoFocus($timeout) {
    return function (scope, elem, attrs) {
        scope.$watch(attrs.todoFocus, function (newVal) {
            if (newVal) {
                $timeout(function () {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});


todoDirectives.directive('todoEscape', function () {

    var ESCAPE_KEY = 27;

    return function (scope, elem, attrs) {
        elem.bind('keydown', function (event) {
            if (event.keyCode === ESCAPE_KEY) {
                scope.$apply(attrs.todoEscape);
            }
        });

        scope.$on('$destroy', function () {
            elem.unbind('keydown');
        });
    };
});
