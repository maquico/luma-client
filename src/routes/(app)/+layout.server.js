import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { locales, loadTranslations, translations, defaultLocale } from '$lib/translations';

export const load = async ({ url, cookies, request }) => {
	const { data, error } = await supabase.auth.getSession();
	const { data: { user } } = await supabase.auth.getUser()

	console.log({data});
	console.log({user});

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
