const add = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("taskList");
//const del =document.createElement();



function addd() {

const li = document.createElement("li");
const del =document.createElement("button");
del.innerText = "del";


li.innerHTML += taskInput.value;



list.appendChild(li);
li.appendChild(del);
taskInput.value = "";
del.addEventListener("click", () => {
li.remove();

});
}





//Adiciona a tarefa a lista quando o botao ADICIONAR e clicado.
function adicionaTarefa() {

add.addEventListener("click", function() {
    //valida se o input esta vazio, caso esteja, exibe um alerta e nao adiciona a tarefa.
if (taskInput.value === "") {
    alert("Please enter a task.");
    return;}

addd();
    
  


});
}
//Adiciona a tarefa a lista quando a tecla ENTER e pressionada.
function adicionaTarefaEnter() {
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
if (taskInput.value === "") {
    alert("Please enter a task.");
    return;}

   addd();
   
    
    }});}



    adicionaTarefa();   
    adicionaTarefaEnter();