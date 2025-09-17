import { Locale } from '@/configs/i18n';
import 'server-only';

const dictionaries: Record<Locale, () => Promise<any>> = {
    en: () => import('@/messages/en.json').then((module) => module.default),
    de: () => import('@/messages/de.json').then((module) => module.default),
    tr: () => import('@/messages/tr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>;
