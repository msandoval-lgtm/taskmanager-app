export const consultarTareasAPI = async () => {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        if (!respuesta.ok) {
            throw new Error('Error de servidor al cargar tareas iniciales');
        }
        const datos = await respuesta.json();
        
        return datos.map(tarea => ({
            id: Date.now() + Math.random(), 
            titulo: tarea.title,
            completada: tarea.completed,
            prioridad: 'Media',
            fecha: Date.now()
        }));
    } catch (error) {
        throw new Error('Error de red. Iniciando en modo offline.');
    }
};