'use strict';

class Todo {
    constructor(form, input, todoList, todoComleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoComleted = document.querySelector(todoComleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
        console.log('todoData: ', this.todoData);
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render(){
        this.input.value = '';
        this.todoList.textContent = '';
        this.todoComleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem (todo){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend',  `<span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`);
        if(todo.completed){
            this.todoComleted.append(li);
        }else{
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();

        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }else{
            alert("Не будь лентяем!!!!");
        }
    }

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(item){
    
        let str = item.closest('li').childNodes[0].textContent;
        
        this.todoData.forEach((elem) => {
            
            str === elem.value ? this.todoData.delete(elem.key) : console.log(0);
            
        });
        
        item.closest('ul').removeChild(item.closest('li'));
        this.render();
        
    }
    
    completedItem(item){

        let str = item.closest('li').childNodes[0].textContent;

        this.todoData.forEach((elem) => {

            str === elem.value ? elem.completed = true : console.log(0);
            this.render();
        });
    }

    handler(){
        this.todoContainer.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.matches('.todo-complete')){
                this.completedItem(target);
            }else if(target.matches('.todo-remove')){
                this.deleteItem(target);
            }
        });

    }
    
    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this. handler();
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container'); 

todo.init();
