//Inicializamos el localStorage
if(localStorage.getItem("listadoTareas") === null){
  let tareas = [];
  localStorage.setItem("listadoTareas", JSON.stringify(tareas)); 
}

//Obtenemos los datos del localStorage
let tareas = JSON.parse(localStorage.getItem("listadoTareas"));

//Obtenemos nuestros elementos del DOM
const todoContainer = document.getElementById("todoContainer");
const activeContainer = document.getElementById("activeContainer");
const completedContainer = document.getElementById("completedContainer");
const addBtn1 = document.getElementById("addBtn1");
const addBtn2 = document.getElementById("addBtn2");
const input1 = document.getElementById("inputTodo1");
const input2 = document.getElementById("inputTodo2");

//Agregamos los EventListeners
addBtn1.addEventListener("click", () =>  addTask(input1));
addBtn2.addEventListener("click", () => addTask(input2));
input1.addEventListener("keypress", (e) => e.key === "Enter"? addTask(input1): undefined);
input2.addEventListener("keypress", (e) => e.key === "Enter"? addTask(input2): undefined);
guardarRenderizar(tareas);

// Función para añadir una nueva tarea
function addTask(input) {
  //Validamos que el texto no este vacio
  if (input.value === "") {
    vacio(input);
  }else{
    noVacio(input);
    //Ubicamos el ultimonID para crear el nuevo ID que asignaremos a esta tarea
    const ultimoID = tareas.reduce((max, tarea) => Math.max(max, tarea.id), 0);
    //Enviamos la nueva tarea al array
    tareas.push({id: ultimoID +1, title: input.value, status: "Activa"});
    //reseteamos el input
    input.value = "";
  }
  guardarRenderizar(tareas)
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(tarea) {
  // con una ternaria unpbicanos nuestro elemento a modificar
  tareas.forEach(element => element.id === tarea ? 
  //y cambiamos su Estado, si esta completo pasa a Activa y viceversa
  (element.status === "Completada" ? element.status = "Activa" : element.status = "Completada")
  : undefined);
  guardarRenderizar(tareas);
}

// Función para borrar una tarea
function deleteTask(tarea) {
  //Eliminamos del array la tarea con el id que pasamos como argumento a la funcion
  tareas = tareas.filter(elemento => elemento.id != tarea);
  guardarRenderizar(tareas);
}

//Funcion que realiza las acciones para editar la tarea
function editTask(input, tarea) {
  //Validamos que el texto no este vacio
  if (input.value === "") {
    vacio(input);
  }else{
    noVacio(input);
    //Buscamos en nuestro array la tarea a editar y actualizamos su valor
    tareas.forEach(element => element.id === tarea ? element.title = input.value : undefined);
    guardarRenderizar(tareas);
  }
}

// Funcion para borrar todas las tareas Completadas
function deleteAll() {
  //Como el boton se encuentra en la pestaña de las completadas, filtramos para eliminar solamente las que tienen status "Completada"
  tareas = tareas.filter(element => element.status != "Completada")
  guardarRenderizar(tareas);
}

//Funcion para mostrar todas las tareas
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
    input.checked = tarea.status === "Completada" ? (label.classList.add("completada"), input.checked = true) : (label.classList.remove("completada"), input.checked = false);
    input.onchange = function() {completeTask(tarea.id)};
    const edit = document.createElement("i");
    edit.classList.add("fa-regular", "fa-pen-to-square")
    edit.onclick = function() {setEdit(tarea.id, label, edit)};
    todoContainer.appendChild(li);
    li.append(input, label, edit);    
  }
}

// Función para mostrar tareas incompletas
function showUncompleted(lista) {
    activeContainer.innerHTML = ""
    for(let tarea of lista){
      if(tarea.status === "Activa")
      {
      const li = document.createElement("li");
      li.classList.add("form-check");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = tarea.id + "-Active";
      input.classList.add("form-check-input");
      const label = document.createElement("label");
      label.setAttribute("for", tarea.id + "-Active");
      label.classList.add("form-check-label");
      label.innerText = tarea.title;
      input.checked = false;
      input.onchange = function() {completeTask(tarea.id)};
      activeContainer.appendChild(li);
      li.append(input, label);    
      }
    }
}

// Función para mostrar tareas completadas
function showCompleted(lista) {
    completedContainer.innerHTML = ""
    for(let tarea of lista){
      if(tarea.status === "Completada")
      {
      const li = document.createElement("li");
      li.classList.add("form-check");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = tarea.id + "-Completed";
      input.classList.add("form-check-input");
      const label = document.createElement("label");
      label.setAttribute("for", tarea.id + "-Completed");
      label.classList.add("form-check-label");
      label.innerText = tarea.title;
      input.checked = true;
      input.onchange = function() {completeTask(tarea.id)};
      label.classList.add("completada");
      const remove = document.createElement("i");
      remove.classList.add("fa-regular", "fa-trash-can")
      remove.onclick = function() {deleteTask(tarea.id)};
      completedContainer.appendChild(li);
      li.append(input, label, remove);    
      }  
    }
      const deleteAl = document.createElement("button")
      deleteAl.textContent = "delete all"
      deleteAl.classList.add("btn", "deleteAll", "btn-primary")
      deleteAl.onclick = deleteAll;
      completedContainer.append(deleteAl);
}

//Prepara los elementos para editar la tarea
function setEdit(tarea, label, edit) {
  tareas.forEach(elemento => {if(elemento.id === tarea) {
    const newInput = document.createElement("input");
    newInput.type= "text"
    newInput.value = elemento.title;
    newInput.name = elemento.id;
    newInput.classList.add("editInput");
    newInput.focus();
    newInput.addEventListener("keypress", (e) => e.key === "Enter" ? editTask(newInput, tarea): undefined);
    label.parentNode.replaceChild(newInput, label);
    newInput.focus(); 
    edit.classList.remove("fa-pen-to-square");
    edit.classList.add("fa-circle-check");
    edit.onclick = function(){editTask(newInput, tarea)}
   }
  });
}

//Funcion para ejecutar el renderizado
function guardarRenderizar (array){
  //actualizamos el localStorage
  localStorage.setItem("listadoTareas", JSON.stringify(array));
  //Volvemos a renderizar nuestras listas
  showAll(array);
  showUncompleted(array);
  showCompleted(array);
}

//Helper Functions
function vacio(input){
  input.classList.add("alerta");
  input.placeholder = "Can't be empty";  input.focus();
  
};

function noVacio(input){
  input.classList.remove("alerta");
  input.placeholder = "add details";
  input.focus();
};

