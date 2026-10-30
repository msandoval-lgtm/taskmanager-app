export const guardarTareasLocales = (tareas) => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

export const obtenerTareasLocales = () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : null;
};