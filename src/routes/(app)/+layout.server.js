import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { locales, loadTranslations, translations, defaultLocale } from '$lib/translations';

export const load = async ({ url, cookies, request }) => {
	const { data, error } = await supabase.auth.getSession();
	const { data: { user } } = await supabase.auth.getUser()

	console.log({data});
	console.log({user});

	// if (data.session) {
	// 	console.log('User is already logged in');
	// 	throw redirect(303, '/');
	// }
	//
	// if (error || !data.session) {
	// 	console.log('compai, pero loggeate por lo menos');
	//
	// 	// Redirect the user to the login page if there's no session
	// 	throw redirect(303, '/account/login');
	// }

	//i18n implementation
	const { pathname } = url;

	// Try to get the locale from cookie
	let locale = (cookies.get('lang') || '').toLowerCase();

	// Get user preferred locale
	if (!locale) {
		// If no cookie is set, try to determine the locale from the 'Accept-Language' header
		const acceptLanguageHeader = request.headers.get('accept-language') || '';
		// Attempt to match the language code with optional region code
		let match = acceptLanguageHeader.match(/^[a-z]+(?=[-_])/i);

		// If no match is found, try to match just the language code
		if (!match) {
			match = acceptLanguageHeader.match(/^[a-z]+/i);
		}

		// If a match is found, use it as the locale, otherwise fall back to the default locale
		locale = match ? match[0].toLowerCase() : defaultLocale;
	}


	// Get defined locales
	const supportedLocales = locales.get().map((l) => l.toLowerCase());

	// Use default locale if current locale is not supported
	if (!supportedLocales.includes(locale)) {
		locale = defaultLocale;
	}

	await loadTranslations(locale, pathname); // keep this just before the `return`


	// If the user is authenticated, return the session data or user information
	return {
		session: data.session,
		i18n: { locale, route: pathname },
		translations: translations.get(), // `translations` on server contain all translations loaded by different clients
	};
};

// import { redirect } from '@sveltejs/kit';
// import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
//
// export const load = async ({ cookies }) => {
// 	const supabase = createSupabaseServerClient({
// 		supabaseUrl: 'https://kyttbsnmnrayejpbxmpp.supabase.co/',
// 		supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dHRic25tbnJheWVqcGJ4bXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NzkyODMsImV4cCI6MjAzNDU1NTI4M30.FlLb0Y8VtqCGYwz13CCkLVns78B_6LzTBw8WcA5QI5o',
// 		cookies,
// 	});
//
// 	const { data: { session } } = await supabase.auth.getSession();
//
// 	console.log({session});
//
// 	// Redirect user to login if session doesn't exist
// 	if (!session) {
// 		throw redirect(303, '/account/login');
// 	}
//
// 	return { session };
// };
