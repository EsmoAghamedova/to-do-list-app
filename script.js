const input = document.getElementById(taskInput);
const addTaskBtn = document.getElementById(addTaskBtn);
const taskList = document.getElementById(tasks);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const renderTask = (taskText, completed = false) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.textContent = taskText;
    if (completed) span.classList.add('completed');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';

    checkbox.addEventListener('change', () => {
        span.classList.toggle('completed');
        saveAllTasks();
    });

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        saveAllTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
};

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        renderTask(taskText);
        taskInput.value = '';
        saveAllTasks();
    }
});



