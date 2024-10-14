import { writable } from 'svelte/store';

export const filters = writable({
    project: null,
    availablility: null,
    priceRange: null,
});