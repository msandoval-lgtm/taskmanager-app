import { guardarTareasLocales, obtenerTareasLocales } from './storage.js';
import { consultarTareasAPI } from './api.js';
import { mostrarNotificacion, renderizarDashboard, crearNodoTarea } from './ui.js';

let tareas = [];
let filtroActual = 'Todas';
let busquedaActual = '';
let ordenActual = 'fecha';

const formTarea = document.getElementById('form-tarea');
const inputTitulo = document.getElementById('titulo-tarea');
const selectPrioridad = document.getElementById('prioridad-tarea');
const inputId = document.getElementById('tarea-id');
const listaTareas = document.getElementById('lista-tareas');
const inputBuscar = document.getElementById('buscar-tarea');
const selectOrden = document.getElementById('orden-tarea');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

const iniciarApp = async () => {
    const tareasGuardadas = obtenerTareasLocales();
    
    if (!tareasGuardadas || tareasGuardadas.length === 0) {
        try {
            tareas = await consultarTareasAPI();
            guardarTareasLocales(tareas);
            mostrarNotificacion('Tareas iniciales cargadas desde la API.');
        } catch (error) {
            mostrarNotificacion(error.message, true);
            tareas = [];
        }
    } else {
        tareas = tareasGuardadas;
    }
    actualizarVista();
};

formTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = inputTitulo.value.trim();
    const prioridad = selectPrioridad.value;
    const idEditar = inputId.value;

    if (titulo === '') {
        mostrarNotificacion('El título no puede estar vacío.', true);
        return;
    }

    if (idEditar) {
        const index = tareas.findIndex(t => t.id === parseFloat(idEditar));
        if (index !== -1) {
            tareas[index].titulo = titulo;
            tareas[index].prioridad = prioridad;
            mostrarNotificacion('Tarea actualizada con éxito.');
        }
        inputId.value = '';
        document.getElementById('btn-guardar').textContent = 'Agregar Tarea';
    } else {
        tareas.push({
            id: Date.now(),
            titulo,
            prioridad,
            completada: false,
            fecha: Date.now()
        });
        mostrarNotificacion('Tarea agregada con éxito.');
    }

    inputTitulo.value = '';
    sincronizarDatos();
});

const alternarEstado = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    tareas[index].completada = !tareas[index].completada;
    sincronizarDatos();
};

const cargarEdicion = (tarea) => {
    inputId.value = tarea.id;
    inputTitulo.value = tarea.titulo;
    selectPrioridad.value = tarea.prioridad;
    document.getElementById('btn-guardar').textContent = 'Guardar Cambios';
};

const borrarTarea = (id) => {
    tareas = tareas.filter(t => t.id !== id);
    mostrarNotificacion('Tarea eliminada.');
    sincronizarDatos();
};

inputBuscar.addEventListener('input', (e) => {
    busquedaActual = e.target.value.toLowerCase();
    actualizarVista();
});

botonesFiltro.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filtroActual = e.target.dataset.estado;
        actualizarVista();
    });
});

selectOrden.addEventListener('change', (e) => {
    ordenActual = e.target.value;
    actualizarVista();
});

const procesarListaTareas = () => {
    let listaFiltrada = [...tareas];

    if (busquedaActual !== '') {
        listaFiltrada = listaFiltrada.filter(t => t.titulo.toLowerCase().includes(busquedaActual));
    }

    if (filtroActual === 'Pendientes') {
        listaFiltrada = listaFiltrada.filter(t => !t.completada);
    } else if (filtroActual === 'Completadas') {
        listaFiltrada = listaFiltrada.filter(t => t.completada);
    }

    listaFiltrada.sort((a, b) => {
        if (ordenActual === 'fecha') {
            return b.fecha - a.fecha; 
        } else {
            const pesoPrioridad = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
            return pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad];
        }
    });

    return listaFiltrada;
};

const actualizarVista = () => {
    listaTareas.innerHTML = '';
    const tareasParaMostrar = procesarListaTareas();
    
    tareasParaMostrar.forEach(tarea => {
        const elementoDOM = crearNodoTarea(tarea, alternarEstado, cargarEdicion, borrarTarea);
        listaTareas.appendChild(elementoDOM);
    });
    
    renderizarDashboard(tareas); 
};

const sincronizarDatos = () => {
    guardarTareasLocales(tareas);
    actualizarVista();
};

document.addEventListener('DOMContentLoaded', iniciarApp);