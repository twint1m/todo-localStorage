const form = document.querySelector('.todo-control');
const plusButton = document.querySelector('.header-button');
const removeButtons = document.querySelectorAll('.todo-remove');
const list = document.querySelector('.todo-list');
const completedList = document.querySelector('.todo-completed');
const input = document.querySelector('.header-input');
let toDo = [];

const loadFromLocalStorage = function() {
    const data = localStorage.getItem('todoList');
    if (data) {
        toDo = JSON.parse(data);
    }
};

const saveToLocalStorage = function() {
    localStorage.setItem('todoList', JSON.stringify(toDo));
};

const render = function () {
    list.innerHTML = '';
    completedList.innerHTML = '';
    toDo.forEach(function(item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML =
        '<span class="text-todo">' + item.text + '</span>'+
        '<div class="todo-buttons">'+
            '<button class="todo-remove"></button>'+
            '<button class="todo-complete"></button>'+
        '</div>';
        if (item.completed) {
            completedList.appendChild(li);
        } else {
            list.appendChild(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed;
            saveToLocalStorage();
            render();
        });
        li.querySelector('.todo-remove').addEventListener('click', () => {
            li.parentNode.removeChild(li);
            toDo.splice(index, 1);
            saveToLocalStorage();
            render();
        });
    });
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const newToDo = {
        text: input.value,
        completed: false
    };
    toDo.push(newToDo);
    input.value = '';
    saveToLocalStorage();
    render();
});

window.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    render();
});