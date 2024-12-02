import { writable } from 'svelte/store';

export const projectData = writable(null);

export function setProjectData(data) {
	projectData.set(data);
}
