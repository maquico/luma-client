import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/auth.js';

export const handle = async ({ event, resolve }) => {

	// event.locals.something = 'Whatever i want'
	// Aqui estoy llamando a la funcion que esta dentro de lib para validar que tipo de usuario tengo
	event.locals.user = authenticateUser(event)

	// Implementacion con hooks

	if (event.url.pathname.endsWith('/') ||

			event.url.pathname.includes('/board') ||
			event.url.pathname.includes('/team') ||
			event.url.pathname.includes('/dashboard') ||
			event.url.pathname.includes('/overview') ||

			event.url.pathname.includes('/config') ||
			event.url.pathname.includes('/badge') ||
			event.url.pathname.includes('/language') ||
			event.url.pathname.includes('/profile') ||
			event.url.pathname.includes('/security') ||

			event.url.pathname.includes('/shop') ) {
		if( !event.locals.user){
			throw redirect(303, "/account/redirect")
		}
	}

	const response = await resolve(event)
	return response
}
