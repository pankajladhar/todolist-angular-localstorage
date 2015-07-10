'use strict';

describe('TODO App', function() {
    beforeEach(function(){
        browser.get('app/index.html');

    });

    //it('should open index.html', function () {
    //    browser.get('app/index.html');
    //    browser.sleep(100000);
    //});

    it('should hava a title', function(){
        expect(browser.getTitle()).toEqual('TO DO List - Using Angular and Local Storage')
    });

    it('should add New ToDo Task', function(){

        var todoList=[],
            remainingTaskCount = 0;

        todoList =  element.all(by.repeater('todo in todos'));
        remainingTaskCount = element(by.css('.remaining-task-count'));

        var newTodo = element(by.model('newTodo'));

        expect(todoList.count()).toEqual(0);

        newTodo.sendKeys('Task1');
        newTodo.sendKeys(protractor.Key.ENTER);

        expect(todoList.count()).toEqual(1);

        var textOfSpan = todoList.get(0).element(by.css('.task-title'));
        expect(textOfSpan.getText()).toEqual('1. Task1');

    });

    describe('operations on added ToDo Tasks', function(){
        var todoList=[],
            remainingTaskCount = 0,
            eventList = [];

        beforeEach(function(){
            todoList =  element.all(by.repeater('todo in todos'));
            remainingTaskCount = element(by.css('.remaining-task-count'));
            eventList = element.all(by.css('#filters li a'));

        });

        it('should add more todo tasks', function(){
            var newTodo = element(by.model('newTodo'));
            var submitButton = element(by.id('submit'));

            newTodo.sendKeys('New-Task1');
            newTodo.sendKeys(protractor.Key.ENTER);


            var newTodo = element(by.model('newTodo'));
            var submitButton = element(by.id('submit'));

            newTodo.sendKeys('New-Task2');
            newTodo.sendKeys(protractor.Key.ENTER);
            expect(todoList.count()).toEqual(3);
            expect(remainingTaskCount.getText()).toEqual('3');

        });

        it('should complete one task', function(){
            var checkBox = element(by.id('option-input0'));
            checkBox.click();
            expect(remainingTaskCount.getText()).toEqual('2');
        });

        it('should change text of task', function(){
            var textOfSpan = todoList.get(0).element(by.css('.task-title'));
            browser.actions().doubleClick(textOfSpan).perform();

            var editedTodo = todoList.get(0).element(by.model('todo.taskTitle'));
            editedTodo.clear();
            editedTodo.sendKeys('Edited Task');
            editedTodo.sendKeys(protractor.Key.ENTER);

            var textOfSpan = todoList.get(0).element(by.css('.task-title'));
            expect(textOfSpan.getText()).toEqual('1. Edited Task');


        });

        it('should show only uncompleted tasks when ACTIVE link is clicked',function(){
            expect(eventList.get(1).getText()).toBe('Active');
            eventList.get(1).click();
            expect(todoList.count()).toEqual(2);

        });

        it('should show all tasks when ALL link is clicked', function(){
            expect(eventList.get(0).getText()).toBe('All');
            eventList.get(0).click();
            expect(todoList.count()).toEqual(3);
        });

        it('should show completed tasks when COMPLETED link is clicked', function(){
            expect(eventList.get(2).getText()).toBe('Completed');
            eventList.get(2).click();
            expect(todoList.count()).toEqual(1);
        });

        it('should clear completed tasks when CLEAR CONMPLETED is clicked', function(){
            expect(eventList.get(3).getText()).toBe('Clear Completed');
            eventList.get(3).click();
            expect(todoList.count()).toEqual(2);
            expect(remainingTaskCount.getText()).toEqual('2');
        });

        it('should make all taks completed when click on Mark completed all checkbox', function(){
            var checkBox = element(by.id('option-input-all'));
            checkBox.click();
            expect(remainingTaskCount.getText()).toEqual('0');
        });
    });
});