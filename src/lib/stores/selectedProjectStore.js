import { writable } from 'svelte/store';

// Tienda para almacenar el proyecto seleccionado
export const selectedProjectStore = writable('');
