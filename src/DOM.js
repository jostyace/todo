export{showCompleted, showUncompleted, showAll, setEdit};

// Función para mostrar tareas completadas
function showCompleted(lista, completeTask, deleteTask, deleteAll) {
  completedContainer.innerHTML = ""

  let completadas = lista.filter(element => element.status === "Completada");
  if(completadas.length < 1){
      sinElementos(completedContainer, "No tasks completed yet, please add a task and complete it.", "regular", "face-sad-tear");
  }
  else{
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
      const soloCompletadas = lista.filter(element => element.status == "Completada")
      if(soloCompletadas.length > 1){
        const deleteAl = document.createElement("button")
        deleteAl.textContent = "delete all"
        deleteAl.classList.add("btn", "deleteAll", "btn-primary")
        deleteAl.onclick = deleteAll;
        completedContainer.append(deleteAl);
    }
  }
}

// Función para mostrar tareas incompletas
function showUncompleted(lista, completeTask) {
  activeContainer.innerHTML = ""
  let incompletas = lista.filter(element => element.status === "Activa");
  if(incompletas.length < 1){
    sinElementos(activeContainer, "No active tasks, please add a task.", "regular", "square-plus");
}
else{
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
}

//Funcion para mostrar todas las tareas
function showAll(lista, completeTask, editTask){
  todoContainer.innerHTML = "";
  if(lista.length < 1){
    sinElementos(todoContainer, "No tasks added, please add a task.", "regular", "square-plus");
}
else{

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
      edit.onclick = function() {setEdit(tarea.id, label, edit, lista, editTask)};
      todoContainer.appendChild(li);
      li.append(input, label, edit);    
    }
  }
}

//Prepara los elementos para editar la tarea
function setEdit(tarea, label, edit, array, editTask) {
    array.forEach(elemento => {if(elemento.id === tarea) {
    const newInput = document.createElement("input");
    newInput.type= "text"
    newInput.value = elemento.title;
    newInput.name = elemento.id;
    newInput.classList.add("editInput");
    newInput.focus();
    newInput.addEventListener("keypress", (e) => e.key === "Enter" ? editTask(newInput, tarea): undefined);
    newInput.addEventListener("input", (e) => newInput.classList.remove("alertaEdit"));
    label.parentNode.replaceChild(newInput, label);
    newInput.focus(); 
    edit.classList.remove("fa-pen-to-square");
    edit.classList.add("fa-circle-check");
    edit.onclick = function(){editTask(newInput, tarea)}
   }
  });
}

function sinElementos(container, texto, estilo, icono){
  const li = document.createElement("li");
  li.classList.add("sinElementos");
  const icon = document.createElement("i");
  icon.classList.add("fa-"+estilo, "fa-"+ icono, "iconoVacio");
  const span = document.createElement("span");
  span.textContent = texto;
  container.appendChild(li);
  li.append(icon, span);

}
