// Select HTML Elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll("[data-filter]");

// Get any tasks that might be stored in localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// set all event listners
addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);
filterButtons.forEach(button => button.addEventListener("click", filterTasks));

// funcion to fetch tasks in localStorage if there is any.
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
    toggleEmptyMessage();
}

// addTask to list
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Edge case: empty or duplicate task
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }
    if (isDuplicate(taskText)) {
        alert("Task already exists!");
        return;
    }

    // Create and display the task
    createTaskElement(taskText, false);
    saveTask(taskText, false);
    
    // Clear input and update empty message
    taskInput.value = "";
    toggleEmptyMessage();
}

function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${completed ? "completed-task" : ""}`;
    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="btn btn-sm btn-success me-2 complete-btn">✔</button>
            <button class="btn btn-sm btn-danger delete-btn">✖</button>
        </div>
    `;
    taskList.appendChild(li);
}

function handleTaskClick(event) {
    const target = event.target;
    const taskItem = target.closest('li')
    const taskList = taskItem = taskItem.querySelector('span').textContent
}
function handleTaskClick(event) {
    const target = event.target;
    const taskItem = target.closest("li");
    const taskText = taskItem.querySelector("span").textContent;

    if (target.classList.contains("complete-btn")) {
        taskItem.classList.toggle("completed-task");
        updateTask(taskText, taskItem.classList.contains("completed-task"));
    } else if (target.classList.contains("delete-btn")) {
        taskItem.remove();
        deleteTask(taskText);
        toggleEmptyMessage();
    }
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => task.text === text ? { text, completed } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isDuplicate(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.some(task => task.text === text);
}

function toggleEmptyMessage() {
    emptyMessage.style.display = taskList.children.length ? "none" : "block";
}

function filterTasks(event) {
    const filter = event.target.dataset.filter;
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "active":
                task.style.display = task.classList.contains("completed-task") ? "none" : "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed-task") ? "flex" : "none";
                break;
        }
    });
}

function handleTaskClick(event) {
    const target = event.target;
    const taskItem = target.closest("li");
    const taskText = taskItem.querySelector("span").textContent;

    if (target.classList.contains("complete-btn")) {
        taskItem.classList.toggle("completed-task");
        updateTask(taskText, taskItem.classList.contains("completed-task"));
    } else if (target.classList.contains("delete-btn")) {
        taskItem.remove();
        deleteTask(taskText);
        toggleEmptyMessage();
    }
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => task.text === text ? { text, completed } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isDuplicate(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.some(task => task.text === text);
}

function toggleEmptyMessage() {
    emptyMessage.style.display = taskList.children.length ? "none" : "block";
}

function filterTasks(event) {
    const filter = event.target.dataset.filter;
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "active":
                task.style.display = task.classList.contains("completed-task") ? "none" : "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed-task") ? "flex" : "none";
                break;
        }
    });
}
