document.addEventListener('DOMContentLoaded', function() {
    mostrarTareas(); 
    mostrarTareasCompletadas();
});

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;

    const tarea = {
        titulo,
        descripcion,
        fecha
    };

    let tareas = JSON.parse(localStorage.getItem('tareas'))
    if (tareas == null) {
        tareas = [];
    }
    
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    document.getElementById('task-form').reset();
    mostrarTareas();
});

function mostrarTareas() {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const listaTareas = document.getElementById('lista-tareas');

    listaTareas.innerHTML = ''; 

    tareas.forEach((tarea, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${tarea.titulo}</h3>
            <p>${tarea.descripcion}</p>
            <p><strong>Fecha Límite:</strong> ${tarea.fecha}</p>
            <button class="delete-btn" onClick="eliminarTarea
            (${index})">Marcar como completado</button>
        `;

        listaTareas.appendChild(card);
    });
    
}

function eliminarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    let tareas_completadas = JSON.parse(localStorage.getItem('tareas_completadas')) || [];
    tareas_completadas.push(tareas[index]);
    localStorage.setItem('tareas_completadas', JSON.stringify(tareas_completadas));
    tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
    mostrarTareasCompletadas();
}

function mostrarTareasCompletadas() {
    const tareas_completadas = JSON.parse(localStorage.getItem('tareas_completadas')) || [];
    const listaTareasCompletadas = document.getElementById('lista-tareas-completadas');

    listaTareasCompletadas.innerHTML = ''; 

    tareas_completadas.forEach((tarea, index) => {
        const card = document.createElement('div');
        card.classList.add('card-completada');

        card.innerHTML = `
            <h3>${tarea.titulo}</h3>
            <p>${tarea.descripcion}</p>
            <p><strong>Fecha Límite:</strong> ${tarea.fecha}</p>
        `;

        listaTareasCompletadas.appendChild(card);
    });
    
}