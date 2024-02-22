//Importamos nuestras funciones desde el archivo DOM que nos permitirán manuipular el DOM para visualizar las listas
import {showCompleted, showUncompleted, showAll} from "./DOM.js";

//Inicializamos el localStorage
if(localStorage.getItem("listadoTareas") === null){
  let tareas = [];
  localStorage.setItem("listadoTareas", JSON.stringify(tareas)); 
}
if(localStorage.getItem("color") === null){
  let color = "";
  localStorage.setItem("color", JSON.stringify(color)); 
}

//Obtenemos los datos del localStorage
let tareas = JSON.parse(localStorage.getItem("listadoTareas"));
let color = JSON.parse(localStorage.getItem("color"));



//Obtenemos nuestros elementos del DOM
const todoContainer = document.getElementById("todoContainer");
const activeContainer = document.getElementById("activeContainer");
const completedContainer = document.getElementById("completedContainer");
const addBtn1 = document.getElementById("addBtn1");
const addBtn2 = document.getElementById("addBtn2");
const input1 = document.getElementById("inputTodo1");
const input2 = document.getElementById("inputTodo2");
const r = document.querySelector(':root');
const themeSelector = document.getElementById("themeSelector");
const btnTheme = document.getElementById("btnTheme");

//Inicializar Color con el obtenido del localStorage
r.style.setProperty('---color-primary', color);
let oscuro = tinycolor(color);
oscuro = oscuro.brighten(10).toString()
r.style.setProperty('---color-secondary', oscuro);

//Agregamos los EventListeners
addBtn1.addEventListener("click", () =>  addTask(input1));
addBtn2.addEventListener("click", () => addTask(input2));
input1.addEventListener("keypress", (e) => e.key === "Enter"? addTask(input1): undefined);
input2.addEventListener("keypress", (e) => e.key === "Enter"? addTask(input2): undefined);
btnTheme.addEventListener("click", () =>  themeSelector.classList.toggle("oculta"));
guardarRenderizar(tareas);

//Funcion para ejecutar el renderizado y actualizar el localStorage
function guardarRenderizar (array){
  //actualizamos el localStorage
  localStorage.setItem("listadoTareas", JSON.stringify(array));
  //Volvemos a renderizar nuestras listas
  showAll(array, completeTask, editTask);
  showUncompleted(array, completeTask);
  showCompleted(array, completeTask, deleteTask, deleteAll)
}

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
  if (input.value === "" || input.value.trim() === "") {
    vacio(input, tarea);
  }else{
    noVacio(input, tarea);
    //Buscamos en nuestro array la tarea a editar y actualizamos su valor
    tareas.forEach(element => element.id === tarea ? element.title = input.value : undefined);
    guardarRenderizar(tareas);
  }
}

// Funcion para borrar todas las tareas Completadas
function deleteAll() {
  //Como el boton se encuentra en la pestaña de las completadas, filtramos para eliminar solamente las que tienen status "Completada".
  tareas = tareas.filter(element => element.status != "Completada")
  guardarRenderizar(tareas);
}

//Helper Functions
function vacio(input, tarea){
  if(input.name == tarea){
    input.classList.add("alertaEdit");
    input.value = "";
    input.placeholder = "can't be empty";
  }else{
  input.classList.add("alerta");
  input.placeholder = "Can't be empty";  
  input.focus();
  }
};

function noVacio(input, tarea){
  if(input.name == tarea){
    input.classList.remove("alertaEdit");
  }else{
    input.classList.remove("alerta");
    input.placeholder = "add details";
    input.focus();
  }
  
};


themeSelector.addEventListener("click", (e) =>{
    if(e.target.id !== "themeSelector"){
        let colorActual = window.getComputedStyle(e.target).backgroundColor;
        localStorage.setItem("color", JSON.stringify(colorActual));
        r.style.setProperty('---color-primary', colorActual);
        let oscuro = tinycolor(colorActual);
        oscuro = oscuro.brighten(10).toString()
        r.style.setProperty('---color-secondary', oscuro);
        

        }
})  
