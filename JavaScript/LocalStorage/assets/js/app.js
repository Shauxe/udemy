// Variables

const listaTareas = document.getElementById('lista-tareas');


// Event Listeners

eventListeners();
function eventListeners() {
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);

    // Borrar tareas
    listaTareas.addEventListener('click', borrarTarea);

    // Cargar contenido HTML desde Local Storage
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

/* Añadir tarea al formulario */
function agregarTarea(e) {
    e.preventDefault(); //Cancela el evento si este es cancelable
    
    const tarea = document.getElementById('tarea').value; // Leer el valor del textarea

    // Crear boton para eliminar las tareas
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tarea';
    botonBorrar.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tarea;
    // Añadir el boton y el texto de la tarea
    li.appendChild(botonBorrar);
    listaTareas.appendChild(li);

    //Agregar al LocalStorage
    agregarTareaLocalStorage(tarea);
}

/* Elimina la tarea del DOM */
function borrarTarea(e) {
    e.preventDefault();

    if(e.target.className === 'borrar-tarea') {
        e.target.parentElement.remove(); // Eliminara el <li> del HTML
        alert('Tarea Eliminada');
        borrarTareaLocalStorage(e.target.parentElement.innerText);
    }
    
}

/* Agregar datos del Local Storage al HTML */
function localStorageListo() {
    let tareasHTML;

    tareasHTML = obtenerTareasLocalStorage();

    tareasHTML.forEach(function(tarea) {

        // Crear boton para eliminar las tareas
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tarea';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tarea;
        // Añadir el boton y el texto de la tarea
        li.appendChild(botonBorrar);
        listaTareas.appendChild(li);
        
    });
    
}

/* Agrega el texto de la tarea al LocalStorage */
function agregarTareaLocalStorage(textoTarea) {
    let tarea;
    tarea = obtenerTareasLocalStorage();

    // Añadir la nueva Tarea
    tarea.push(textoTarea);
    localStorage.setItem('Tareas', JSON.stringify(tarea));
}

/* Comprobar que tengamos elementos en Local Storage, retornara un array */
function obtenerTareasLocalStorage() {
    let tareas;

    // Revisamos los valores del Local Storage
    if(localStorage.getItem('Tareas') === null) {
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem('Tareas'));
    }
    return tareas;
}

/* Eliminar la tarea del Local Storage */
function borrarTareaLocalStorage(tarea) {
    let tareas, tareaModificada;
    
    tareaModificada = tarea.substring(0, tarea.length -1); // Eliminaremos el ultimo caracter del String (X)
    
    tareas = obtenerTareasLocalStorage();
    
    tareas.forEach(function(tarea, index) { // Recorremos las tareas
        if(tareaModificada === tarea){ // Si la tarea a borrar es igual a la tarea actual recorrida
            tareas.splice(index, 1); 
        }
    });
    
    localStorage.setItem('Tareas', JSON.stringify(tareas)); // Elimina la tarea del Local Storage
}

