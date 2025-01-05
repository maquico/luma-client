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
        {
            locale: 'en',
            key: 'faq',
            routes: ['/faq'],
            loader: async () => (await import('../../lang/en/faq.json')).default,
        },
        {
            locale: 'en',
            key: 'profile_sidebar',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/en/navbars/profile.sidebar.json')).default,
        },
        {
            locale: 'en',
            key: 'profile_config_lang',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/en/user/config.json')).default,
        },
        {
            locale: 'en',
            key: 'profile_dropdown',
            routes: ['/', '/1/overview', '/1/board', '/1/dashboard'],
            loader: async () => (await import('../../lang/en/user/user.dropdown.json')).default,
        },
        {
            locale: 'en',
            key: 'project_sidebar',
            routes: ['/1/overview'],
            loader: async () => (await import('../../lang/en/navbars/project.sidebar.json')).default,
        },
        {
            locale: 'en',
            key: 'project_config',
            routes: ['/', '/1/config'],
            loader: async () => {
                const data = (await import('../../lang/en/navbars/project.config.sidebar.json')).default;
                console.log('Loaded project_sidebar translations:', data);
                return data;
            },
        },
        {
            locale: 'en',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../lang/en/home.json')).default,
        },
        {
            locale: 'en',
            key: 'create_project',
            routes: ['/'],
            loader: async () => (await import('../../lang/en/modals/createProject.json')).default,
        },
        // Spanish loaders
        {
            locale: 'es',
            key: 'faq',
            routes: ['/faq'],
            loader: async () => (await import('../../lang/es/faq.json')).default,
        },
        {
            locale: 'es',
            key: 'profile_sidebar',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/es/navbars/profile.sidebar.json')).default,
        },
        {
            locale: 'es',
            key: 'profile_config_lang',
            routes: ['/account/config/language'],
            loader: async () => (await import('../../lang/es/user/config.json')).default,
        },
        {
            locale: 'es',
            key: 'profile_dropdown',
            routes: ['/', '/1/overview', '/1/board', '/1/dashboard'],
            loader: async () => (await import('../../lang/es/user/user.dropdown.json')).default,
        },
        {
            locale: 'es',
            key: 'project_sidebar',
            routes: ['/1/overview', '/1/board', '/1/dashboard'],
            loader: async () => (await import('../../lang/es/navbars/project.sidebar.json')).default,
        },
        {
            locale: 'es',
            key: 'project_config',
            routes: ['/', '/1/config'],
            loader: async () => (await import('../../lang/es/navbars/project.config.sidebar.json')).default,
        },
        {
            locale: 'es',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../lang/es/home.json')).default,
        },
        {
            locale: 'es',
            key: 'create_project',
            routes: ['/'],
            loader: async () => (await import('../../lang/es/modals/createProject.json')).default,
        },
    ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));