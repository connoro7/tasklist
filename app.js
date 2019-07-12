// Define UI Vars
const form = document.querySelector('#task-form'); // Grabs the <form>…</form> content
const taskList = document.querySelector('.collection'); // Grabs the <ul>…</ul> content, which is our list of tasks
const clearBtn = document.querySelector('.clear-tasks'); // Grabs the <a>…</a> from the "Clear Tasks" button
const filter = document.querySelector('#filter'); // Grabs the <input>…</input> content that is part of our Filter Task system
const taskInput = document.querySelector('#task'); // Grabs the <input>…</input> content that is part of our Add Task system 

// ^ Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// ^ Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class to li
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class to <a></a>
        link.className = 'delete-item secondary-content';
        // Add icon html to <a></a>
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// ^ Add Task Functionality
// Takes "Task List" form input and appends it to the current list of tasks
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class to li
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class to <a></a>
    link.className = 'delete-item secondary-content';
    // Add icon html to <a></a>
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// ^ Store Task in Local Storage Functionality 
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// ^ Remove Task Functionality
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        // @ Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        // if (confirm('Are you sure?')) {
            // placed above code in here for confirmation before deletion
        // }
    }
}

// ^ Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    // x console.log(taskItem);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ^ Clear Task Functionality
function clearTasks() {
    // Method 1
    // x taskList.innerHTML = '';

    // Method 2 (optimized as per https://jsperf.com/innerhtml-vs-removechild)
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // @ Clear from Local Storage
    clearTasksFromLocalStorage();
}

// ^ Clear Task from Local Storage Functionality
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// ^ Filter Tasks Functionality
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelector('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    )
}