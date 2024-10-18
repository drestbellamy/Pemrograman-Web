const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = [];

function renderTodoList() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo;

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTodoItem(index));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodoItem(index));

        todoItem.appendChild(todoText);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
}

function addTodoItem() {
    const newTodo = todoInput.value.trim();
    if (newTodo) {
        todos.push(newTodo);
        todoInput.value = '';
        renderTodoList();
    }
}

function editTodoItem(index) {
    const updatedTodo = prompt('Edit your task:', todos[index]);
    if (updatedTodo) {
        todos[index] = updatedTodo;
        renderTodoList();
    }
}

function deleteTodoItem(index) {
    todos.splice(index, 1);
    renderTodoList();
}

addButton.addEventListener('click', addTodoItem);

todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodoItem();
    }
});