const add = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const clearButton = document.getElementById("clearAllButton");
let tasks = JSON.parse(localStorage.getItem('task')) || [];

function clearAll() {
    clearButton.addEventListener("click", function () {
        localStorage.clear();
        list.innerHTML = "";
        tasks = [];
        taskInput.value = "";
    });
}

function saveTasks() {
    add.addEventListener("click", function () {
        if (taskInput.value === "") return;
        tasks.push(taskInput.value);
        localStorage.setItem("task", JSON.stringify(tasks));
        list.innerHTML = "";
        showTask();
    });
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            if (taskInput.value === "") return;
            tasks.push(taskInput.value);
            localStorage.setItem("task", JSON.stringify(tasks));
            list.innerHTML = "";
            showTask();
        }
    });

}

function showTask() {
    tasks.forEach((valor) => {
        const li = document.createElement("li");
        const btn =document.createElement("button");
        btn.className = "btn btn-danger p-1 m-1";
        btn.innerHTML = "X";
        btn.addEventListener("click", function () {
            const index = tasks.indexOf(valor);
            tasks.splice(index, 1);
            localStorage.setItem("task", JSON.stringify(tasks));
            list.innerHTML = "";
            showTask();
        });
        li.innerHTML = valor;
        li.appendChild(btn);
        list.appendChild(li);
    });
    taskInput.value = "";
}
function init() {
    showTask();
    saveTasks();
    clearAll();
}

init();