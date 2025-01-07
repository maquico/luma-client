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
            loader: async () => (await import('../../lang/en/user/user.dropdown.json')).default,
        },
        {
            locale: 'en',
            key: 'project_sidebar',
            loader: async () => (await import('../../lang/en/navbars/project.sidebar.json')).default,
        },
        {
            locale: 'en',
            key: 'project_config_sidebar',
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
        {
            locale: 'en',
            key: 'project_overview',
            loader: async () => (await import('../../lang/en/project/overview.json')).default,
        },
        {
            locale: 'en',
            key: 'project_board',
            loader: async () => (await import('../../lang/en/project/board.json')).default,
        },
        {
            locale: 'en',
            key: 'approve_task',
            loader: async () => (await import('../../lang/en/modals/approveTask.json')).default,
        },
        {
            locale: 'en',
            key: 'create_task',
            loader: async () => (await import('../../lang/en/modals/createTask.json')).default,
        },
        {
            locale: 'en',
            key: 'delete_task',
            loader: async () => (await import('../../lang/en/modals/deleteTask.json')).default,
        },
        {
            locale: 'en',
            key: 'modal',
            loader: async () => (await import('../../lang/en/modals/modal.json')).default,
        },
        {
            locale: 'en',
            key: 'project_config',
            loader: async () => (await import('../../lang/en/project/config.json')).default,
        },
        {
            locale: 'en',
            key: 'delete_project',
            loader: async () => (await import('../../lang/en/modals/deleteProject.json')).default,
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
            loader: async () => (await import('../../lang/es/user/user.dropdown.json')).default,
        },
        {
            locale: 'es',
            key: 'project_sidebar',
            loader: async () => (await import('../../lang/es/navbars/project.sidebar.json')).default,
        },
        {
            locale: 'es',
            key: 'project_config_sidebar',
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
        {
            locale: 'es',
            key: 'project_overview',
            loader: async () => (await import('../../lang/es/project/overview.json')).default,
        },
        {
            locale: 'es',
            key: 'project_board',
            loader: async () => (await import('../../lang/es/project/board.json')).default,
        },
        {
            locale: 'es',
            key: 'approve_task',
            loader: async () => (await import('../../lang/es/modals/approveTask.json')).default,
        },
        {
            locale: 'es',
            key: 'create_task',
            loader: async () => (await import('../../lang/es/modals/createTask.json')).default,
        },
        {
            locale: 'es',
            key: 'delete_task',
            loader: async () => (await import('../../lang/es/modals/deleteTask.json')).default,
        },
        {
            locale: 'es',
            key: 'modal',
            loader: async () => (await import('../../lang/es/modals/modal.json')).default,
        },
        {
            locale: 'es',
            key: 'project_config',
            loader: async () => (await import('../../lang/es/project/config.json')).default,
        },
        {
            locale: 'es',
            key: 'delete_project',
            loader: async () => (await import('../../lang/es/modals/deleteProject.json')).default,
        },
    ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));