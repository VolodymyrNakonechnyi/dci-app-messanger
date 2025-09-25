import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import en from '../locales/en.json';
import uk from '../locales/ua.json';

const savedLang = localStorage.getItem('lang') || 'uk';

console.log(en);
console.log(uk);

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		uk: { translation: uk },
	},
	globalInjection: true,
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
