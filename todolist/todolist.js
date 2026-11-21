const add = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const clearButton = document.getElementById("clearAllButton");
let tasks = JSON.parse(localStorage.getItem('task')) || [];




//Exclui todas as tasks
function clearAll() {
    clearButton.addEventListener("click", function () {
        localStorage.clear();
        list.innerHTML = "";
        tasks = [];
        taskInput.value = "";
    });
}
//Adiciona tasks 
function addTasks() {
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
//Confirma a alteracao da task
function confirmButton(index) {

    const confirm = document.createElement("button");
    confirm.id = "confirmar";
    confirm.innerText = "confirm";
    //confirm.className = "btn btn-outline-primary";
    confirm.addEventListener("click", function () {
        tasks[index] = taskInput.value;
        localStorage.setItem("task", JSON.stringify(tasks));
        document.getElementById("delete").disabled = false;
    document.getElementById("update").disabled = false;
        add.disabled = false;
        confirm.remove();
        showTask();
    });

    
    taskInput.before(confirm);

}
//atualiza a task
function updateButton(index) {
    document.getElementById("delete").disabled = true;
    document.getElementById("update").disabled = true;

    add.disabled = true;
    taskInput.value = tasks[index];

    confirmButton(index);



}

//Deleta a task
function deleteButton(index) {
    tasks.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(tasks));

    showTask();
}
//Atualiza a tela
function showTask() {
    taskInput.value = "";
    list.innerHTML = "";
    tasks.forEach((valor, index) => {
        const group = document.createElement("div");
        group.className = "list-group-horizontal d-flex";
        const li = document.createElement("li");
            li.className = "d-flex justify-content-between align-items-center col-3";
            li.innerHTML = `${valor}`;

        const btnupdate = document.createElement("button");
            btnupdate.id = "update";
            btnupdate.innerText = "Update";
            btnupdate.className = "btn-sm m-1 rounded-2 col-2"

        const btdelete = document.createElement("button");
            btdelete.className = "btn-sm m-1 rounded-2 col-2";
            btdelete.id = "delete";
            btdelete.innerText = "delete";
        const speak = speakTask(index);
        speak.className = "col-2 rounded-2";
        btnupdate.addEventListener("click", () => updateButton(index));
        btdelete.addEventListener("click", () => deleteButton(index));
        list.appendChild(group);
        group.appendChild(li);
        group.appendChild(btnupdate);
        group.appendChild(btdelete);
        group.appendChild(speak);
        
        //li.appendChild(btnupdate);
        //li.appendChild(btdelete);
        //li.appendChild(speak);
        //list.appendChild(li);
    });
}
//Inicializa as funcoes
function init() {
    addTasks();
    showTask();
    clearAll();
}
//Adiciona a leitura
function speakTask(index) {
    const speechButton = document.createElement("Button");
    speechButton.id = "speak";
    speechButton.className = "btn btn-primary p-1 m-1";
    speechButton.innerHTML = "🔊";
    speechButton.addEventListener("click", function () {
        const taskText = tasks[index];
        const speech = new SpeechSynthesisUtterance(taskText);
        speech.lang = "pt-BR";
        window.speechSynthesis.speak(speech);
    });


    return speechButton;
}
init();