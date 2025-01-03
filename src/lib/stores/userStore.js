import { writable } from 'svelte/store';

export const userData = writable(null);

export function setUserData(data) {
	userData.set(data);
}
