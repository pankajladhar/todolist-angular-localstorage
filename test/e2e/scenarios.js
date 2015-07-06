'use strict';

describe('TODO App', function() {
    var todoList;
    beforeEach(function(){
        browser.get('app/index.html');
        todoList =  element.all(by.repeater('todo in todos'));
    });

    xit('should open index.html', function () {
        browser.get('app/index.html');
    });

    it('should hava a title', function(){
        expect(browser.getTitle()).toEqual('TO DO List - Using Angular and Local Storage')
    });

    it('should add New ToDo Task', function(){

        var newTodo = element(by.model('newTodo'));
        var submitButton = element(by.id('submit'));


        expect(todoList.count()).toEqual(0);

        newTodo.sendKeys('Task1');
        newTodo.sendKeys(protractor.Key.ENTER);

        browser.sleep(10000);

        expect(todoList.count()).toEqual(1);

        var textOfSpan = todoList.get(0).element(by.css('.task-title'));

        expect(textOfSpan.getText()).toEqual('1. Task1');

    });
})