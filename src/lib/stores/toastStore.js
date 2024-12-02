// src/lib/stores/toastStore.js
import { writable } from 'svelte/store';
import { toasts } from 'svelte-toasts';

export const showToast = (message, options = {}) => {
	toasts.add({
		description: message,
		duration: options.duration || 3000,
		placement: options.placement || 'bottom-right',
		theme: options.theme || 'light',
		type: options.type || 'success',
		...options,
	});
};
