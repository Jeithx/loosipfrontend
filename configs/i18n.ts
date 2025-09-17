export const supportedLanguages = ['de', 'en', 'tr'];
export const i18n = {
    defaultLocale: 'en',
    locales: supportedLanguages,
    langDirection: {
        en: 'ltr',
        de: 'ltr',
        tr: 'ltr',
    },
} as const;

export type Locale = (typeof i18n)['locales'][number];
