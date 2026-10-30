export const mostrarNotificacion = (mensaje, esError = false) => {
    const div = document.getElementById('notificacion');
    div.textContent = mensaje;
    div.className = esError ? 'notificacion error' : 'notificacion exito';
    div.style.display = 'block';
    setTimeout(() => div.style.display = 'none', 3500);
};

export const renderizarDashboard = (tareas) => {
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;
    
    document.getElementById('total-tareas').textContent = total;
    document.getElementById('completadas-tareas').textContent = completadas;
    document.getElementById('pendientes-tareas').textContent = pendientes;
};

export const crearNodoTarea = (tarea, onToggle, onEdit, onDelete) => {
    const li = document.createElement('li');
    li.className = `tarea-item ${tarea.completada ? 'completada' : ''}`;
    
    li.innerHTML = `
        <div>
            <input type="checkbox" ${tarea.completada ? 'checked' : ''}>
            <strong>${tarea.titulo}</strong> 
            <small>[${tarea.prioridad}]</small>
        </div>
        <div>
            <button class="btn-editar">Editar</button>
            <button class="btn-eliminar">Eliminar</button>
        </div>
    `;

    li.querySelector('input[type="checkbox"]').addEventListener('change', () => onToggle(tarea.id));
    li.querySelector('.btn-editar').addEventListener('click', () => onEdit(tarea));
    li.querySelector('.btn-eliminar').addEventListener('click', () => onDelete(tarea.id));

    return li;
};