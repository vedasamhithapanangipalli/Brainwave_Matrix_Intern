const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const uncompletedBtn = document.getElementById("uncompletedBtn");
let tasks = [];
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        taskInput.value = "";
        renderTasks();
}});
function renderTasks(filter = 'all') {
    todoList.innerHTML = '';
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'uncompleted') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    filteredTasks.forEach(task => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        if (task.completed) todoItem.classList.add('completed');
        todoItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="check-box" data-id="${task.id}" />
            <span>${task.text}</span>
            <div>
                <button class="edit-btn" data-id="${task.id}">✏️</button>
                <button class="delete-btn" data-id="${task.id}">🗑️</button>
            </div>
        `;
        const checkBox = todoItem.querySelector('.check-box');
        const editBtn = todoItem.querySelector('.edit-btn');
        const deleteBtn = todoItem.querySelector('.delete-btn');
        checkBox.addEventListener('change', () => toggleComplete(task.id));
        editBtn.addEventListener('click', () => editTask(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        todoList.appendChild(todoItem);
    });
}
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt("Edit your task:", task.text);
    if (newText !== null) {
        task.text = newText;
        renderTasks();
    }
}
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}
allBtn.addEventListener('click', () => renderTasks('all'));
completedBtn.addEventListener('click', () => renderTasks('completed'));
uncompletedBtn.addEventListener('click', () => renderTasks('uncompleted'));
renderTasks(); // Initial render of tasks