if(localStorage.getItem("listadoTareas") === null){
  let tareas = [];
  localStorage.setItem("listadoTareas", JSON.stringify(tareas)); 
}


const tareas = JSON.parse(localStorage.getItem("listadoTareas"));
const inputTodo = [...document.querySelectorAll(".inputTodo")];
const todoContainer = document.getElementById("todoContainer");
const activeContainer = document.getElementById("activeContainer");
const completedContainer = document.getElementById("completedContainer");
const addBtn1 = document.getElementById("addBtn1");
const addBtn2 = document.getElementById("addBtn2");
const input1 = document.getElementById("inputTodo1");
const input2 = document.getElementById("inputTodo2");



/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/
addBtn1.addEventListener("click", () =>  addTask(input1));
addBtn2.addEventListener("click", () => addTask(input2));

// Función para añadir una nueva tarea
function addTask(input) {
  if (input.value === "") {
    alert("Debe ingresar la tarea");
  }else{
    let ultimoID = 0;
    tareas.forEach(element => element.id > ultimoID && element.id != 0 ? ultimoID = element.id : ultimoID);
    tareas.push({
      id: ultimoID +1,
      title: input.value,
      status: "Completada"
    });
    localStorage.setItem("listadoTareas", JSON.stringify(tareas));
    input.value = "";
  }
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask() {

}

// Función para borrar una tarea
function deleteTask() {
  
}

// Funcion para borrar todas las tareas
function deleteAll() {
  
}

// Función para filtrar tareas completadas
function filterCompleted(lista) {
    completedContainer.innerHTML = ""
    for(let tarea of lista){
      if(tarea.status === "Completada")
      {
      const li = document.createElement("li");
      li.classList.add("form-check");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = tarea.id + "-completada";
      input.classList.add("form-check-input");
      const label = document.createElement("label");
      label.setAttribute("for", tarea.id + "-completada");
      label.classList.add("form-check-label");
      label.innerText = tarea.title;
      input.checked = true;
      input.onchange = modificar(tarea.id);
      label.classList.add("completada");
      completedContainer.appendChild(li);
      li.append(input, label);    
      }  
    }
}

// Función para filtrar tareas incompletas
function filterUncompleted(lista) {
    activeContainer.innerHTML = ""
    for(let tarea of lista){
      if(tarea.status === "Activa")
      {
      const li = document.createElement("li");
      li.classList.add("form-check");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = tarea.id;
      input.classList.add("form-check-input");
      const label = document.createElement("label");
      label.setAttribute("for", tarea.id);
      label.classList.add("form-check-label");
      label.innerText = tarea.title;
      input.checked = false;
      //label.classList.remove("completada");
      activeContainer.appendChild(li);
      li.append(input, label);    
      }
    }
}

//Funcion para mostrar las tareas
function showAll(lista){
  todoContainer.innerHTML = "";
  for(let tarea of lista){
    const li = document.createElement("li");
    li.classList.add("form-check");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = tarea.id;
    input.classList.add("form-check-input");
    const label = document.createElement("label");
    label.setAttribute("for", tarea.id);
    label.classList.add("form-check-label");
    label.innerText = tarea.title;
    input.checked = tarea.status === "Completada" ? (label.classList.add("completada"), input.checked = true) : (input.checked = false, label.classList.remove("completada"));
    todoContainer.appendChild(li);
    li.append(input, label);    
  }
}



showAll(tareas);
filterUncompleted(tareas);
filterCompleted(tareas);

function modificar(tarea){
  alert(tarea)
};