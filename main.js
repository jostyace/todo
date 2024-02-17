if(localStorage.getItem("listadoTareas") === null){
  let tareas = [];
  localStorage.setItem("listadoTareas", JSON.stringify(tareas)); 
}


let tareas = JSON.parse(localStorage.getItem("listadoTareas"));
//Obtenemos nuestros elementos del DOM
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
//Agregamos los EventListeners
addBtn1.addEventListener("click", () =>  addTask(input1));
addBtn2.addEventListener("click", () => addTask(input2));

// Función para añadir una nueva tarea
function addTask(input) {
  //Validamos que el texto no este vacio
  if (input.value === "") {
    alert("Debe ingresar la tarea");
  }else{
    //Ubicamos el ultimonID para crear el nuevo ID que asignaremos a esta tarea
    let ultimoID = 0;
    tareas.forEach(element => element.id > ultimoID && element.id != 0 ? ultimoID = element.id : ultimoID);
    //Enviamos la nueva tarea al array
    tareas.push({
      id: ultimoID +1,
      title: input.value,
      status: "Activa"
    });
   
    //reseteamos el input
    input.value = "";
  }
  //actualizamos el localStorage
  localStorage.setItem("listadoTareas", JSON.stringify(tareas));
  //Volvemos a renderizar nuestras listas
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(tarea) {
  // con una ternaria unpbicanos nuestro elemento a modificar
  tareas.forEach(element => element.id === tarea ? 
  //y cambiamos su Estado, si esta completo pasa a Activa y viceversa
  (element.status === "Completada" ? element.status = "Activa" : element.status = "Completada")
  : undefined);
  //Actualizamoe el localStorage y volvemos a renderizar las listas
  localStorage.setItem("listadoTareas", JSON.stringify(tareas));
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
}

// Función para borrar una tarea
function deleteTask(tarea) {
  //Eliminamos del array la tarea con el id que pasamos como argumento a la funcion
  tareas = tareas.filter(elemento => elemento.id != tarea)
  //Actualizamos el localStorage y volvemos a renderizar las listas
  localStorage.setItem("listadoTareas", JSON.stringify(tareas));
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
}

function setEdit(tarea) {
  tareas.forEach(elemento => {if(elemento.id === tarea) {
    input1.value = elemento.title;
    addBtn1.textContent = "Update";
    console.log(elemento.title);
   }});
  
  localStorage.setItem("listadoTareas", JSON.stringify(tareas));
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
}

// Funcion para borrar todas las tareas
function deleteAll() {
  //Como el boton se encuentra en la pestaña de las completadas, filtramos para eliminar solamente las que tienen status "Completada"
  tareas = tareas.filter(element => element.status != "Completada")
  //
  localStorage.setItem("listadoTareas", JSON.stringify(tareas));
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
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
      input.id = tarea.id;
      input.classList.add("form-check-input");
      const label = document.createElement("label");
      label.setAttribute("for", tarea.id);
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
      deleteAl.textContent = "Delete"
      deleteAl.onclick = deleteAll;
      completedContainer.append(deleteAl);
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
      input.onchange = function() {completeTask(tarea.id)};
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
    input.onchange = function() {completeTask(tarea.id)};
    const edit = document.createElement("i");
    edit.classList.add("fa-regular", "fa-pen-to-square")
    edit.onclick = function() {setEdit(tarea.id)};
    todoContainer.appendChild(li);
    li.append(input, label, edit);    
  }
}

function renderizar (array){
  //actualizamos el localStorage
  localStorage.setItem("listadoTareas", JSON.stringify(tareas));
  //Volvemos a renderizar nuestras listas
  showAll(tareas);
  filterUncompleted(tareas);
  filterCompleted(tareas);
}

renderizar(tareas);

