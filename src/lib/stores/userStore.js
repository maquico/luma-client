import { writable } from 'svelte/store';

export const userData = writable(null);

export function setProjectData(data) {
	userData.set(data);
}
