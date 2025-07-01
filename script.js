function createToDoListUI() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskListEl = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('#filters button');

    let tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    let currentFilter = 'all';
    let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    function generateId() {
        return nextId++;
    }

    function saveToLocalStorageAsync(data) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    localStorage.setItem('todoTasks', JSON.stringify(data));
                    resolve();
                }, 1000);
            } catch (error) {
                reject(error);
            }
        });
    }

    function getFilteredTasks() {
        if (currentFilter === 'active') return tasks.filter(t => !t.completed);
        if (currentFilter === 'completed') return tasks.filter(t => t.completed);
        return tasks;
    }

    function render() {
        taskListEl.innerHTML = '';

        const filtered = getFilteredTasks();

        if (filtered.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.textContent = 'No tasks found 😴';
            taskListEl.appendChild(emptyMsg);
            return;
        }

        filtered.forEach(task => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                toggleComplete(task.id);
            });

            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.completed) span.classList.add('completed');

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', () => {
                removeTask(task.id);
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskListEl.appendChild(li);
        });

        saveToLocalStorageAsync(tasks)
            .then(() => console.log('Tasks saved! 😎'))
            .catch(err => console.error('Save failed:', err));
    }

    function addTask(text) {
        tasks.push({
            id: generateId(),
            text,
            completed: false
        });
        render();
    }

    function toggleComplete(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            render();
        }
    }

    function removeTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        render();
    }

    function updateFilter(filterName) {
        currentFilter = filterName;
        render();
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
            taskInput.value = '';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateFilter(button.getAttribute('data-filter'));
        });
    });

    render();
}

createToDoListUI();
