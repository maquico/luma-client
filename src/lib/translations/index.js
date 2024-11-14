import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
    log: {
        level: dev ? 'warn' : 'error',
    },
    translations: {
        en: { lang },
        es: { lang },
    },
    loaders: [
        // English loaders
        // {
        //     locale: 'en',
        //     key: 'menu',
        //     loader: async () => (await import('../../lang/en/menu.json')).default,
        // },
        // {
        //     locale: 'en',
        //     key: 'about',
        //     routes: ['/about'],
        //     loader: async () => (await import('../../lang/en/about.json')).default,
        // },
        // {
        //     locale: 'en',
        //     key: 'home',
        //     routes: ['/'],
        //     loader: async () => (await import('../../lang/en/home.json')).default,
        // },
        {
            locale: 'en',
            key: 'profile_sidebar',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/en/profile_sidebar.json')).default,
        },
        {
            locale: 'en',
            key: 'profile_config_lang',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/en/profile_config.json')).default,
        },
        // Spanish loaders
        // {
        //     locale: 'es',
        //     key: 'menu',
        //     loader: async () => (await import('../../lang/es/menu.json')).default,
        // },
        // {
        //     locale: 'es',
        //     key: 'about',
        //     routes: ['/about'],
        //     loader: async () => (await import('../../lang/es/about.json')).default,
        // },
        // {
        //     locale: 'es',
        //     key: 'home',
        //     routes: ['/'],
        //     loader: async () => (await import('../../lang/es/home.json')).default,
        // },
        {
            locale: 'es',
            key: 'profile_sidebar',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/es/profile_sidebar.json')).default,
        },
        {
            locale: 'es',
            key: 'profile_config_lang',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/es/profile_config.json')).default,
        }
    ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));