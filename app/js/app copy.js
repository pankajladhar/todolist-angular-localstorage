'use strict';

angular.module('toDoApp', [

])
.controller('toDoAppCtrl', ['$scope', function($scope) {

        var storageUtil = {
            setStorage: function() {
                localStorage.setItem('toDoTaskListStore', JSON.stringify($scope.toDoTaskList));
            }
        }

        var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        
        var dateUtil = {
            getDateAndMonth : function(providedDate){
                var dateAndMonth = providedDate.getDay()+ " " + month[providedDate.getMonth()];
                return dateAndMonth;
            },

            toDay : function(){
                return new Date()
            }
        }


        $scope.appTitle = "Pankaj's Awesome ToDo App";
        $scope.saved = localStorage.getItem('toDoTaskListStore');
        $scope.toDoTaskList = (localStorage.getItem('toDoTaskListStore')) ? JSON.parse($scope.saved) : [];
        $scope.isToggleToDoTaskList = true;
        $scope.isShowCompleted = false;
        $scope.btnTitle="Show Completed !";
        $scope.userSelecteddate = dateUtil.toDay();




        $scope.toggleToDoTaskList = function() {
            $scope.isToggleToDoTaskList ? $scope.isToggleToDoTaskList = false : $scope.isToggleToDoTaskList = true;
        }

        $scope.addToDoTask = function() {
            var a = dateUtil.getDateAndMonth($scope.userSelecteddate)
            console.log(a)
            $scope.toDoTaskList.push({
                taskTitle: $scope.toDoTask,
                completionStatus: false,
                date : a
            });
            $scope.toDoTask = '';
            storageUtil.setStorage();
        }


        $scope.removeToDoTask = function(removableToDoTaskItem) {
            var i = $scope.toDoTaskList.indexOf(removableToDoTaskItem);
            $scope.toDoTaskList.splice(i, 1);
            storageUtil.setStorage();
        }


        $scope.toggleCompleted = function(chktoDoTaskItem) {
            var j = $scope.toDoTaskList.indexOf(chktoDoTaskItem);
            $scope.toDoTaskList[j].completionStatus = chktoDoTaskItem.completionStatus;
            storageUtil.setStorage();
        }

        $scope.remainingTask = function() {
            var count = 0;
            angular.forEach($scope.toDoTaskList, function(todo) {
                count += todo.completionStatus ? 0 : 1;
            });
            return count;
        }

        $scope.removedCompletedTask = function() {
            var confirmInput = confirm('Really you want to Delete !!');
            if (confirmInput) {
                var oldToDoTaskList = $scope.toDoTaskList;
                $scope.toDoTaskList = [];
                angular.forEach(oldToDoTaskList, function(todo) {
                    if (!todo.completionStatus) {
                        $scope.toDoTaskList.push(todo);
                    }
                    storageUtil.setStorage();
                });
            }

        }

        $scope.markAll = function(allChecked) {
            angular.forEach($scope.toDoTaskList, function(todo) {
                todo.completionStatus = allChecked;
                storageUtil.setStorage();
            });
        }

        $scope.showCompletedTask = function() {               
            var oldToDoTaskList = (localStorage.getItem('toDoTaskListStore')) ? JSON.parse(localStorage.getItem('toDoTaskListStore')) : [];                
            if(!$scope.isShowCompleted){                
                $scope.isShowCompleted = true;
                $scope.btnTitle="Show All Tasks!";
                $scope.toDoTaskList = [];
                angular.forEach(oldToDoTaskList, function(todo) {
                    if (todo.completionStatus) {
                        $scope.toDoTaskList.push(todo);
                    }                
                });
            } 
            else{               
                $scope.btnTitle="Show Completed !";
                $scope.isShowCompleted = false;                
                $scope.toDoTaskList = oldToDoTaskList;

            }                       
        }

        $scope.toggleEditMode = function(){
            var $elem =angular.element(event.target);
            $elem.parent().parent().toggleClass('editing');
        }

        $scope.editOnEnter = function(todo){
             if(event.keyCode == 13 && todo.taskTitle){
                var j = $scope.toDoTaskList.indexOf(todo);
                $scope.toDoTaskList[j].taskTitle = todo.taskTitle;
                storageUtil.setStorage();
                $scope.toggleEditMode()
            }
        }

    }]);




