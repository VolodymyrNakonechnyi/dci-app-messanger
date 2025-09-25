import { useTranslation } from 'react-i18next';

export function useLanguage() {
	const { i18n } = useTranslation();

	const currentLang = i18n.language;

	const changeLanguage = (lang: 'en' | 'uk') => {
		i18n.changeLanguage(lang);
		localStorage.setItem('lang', lang);
	};

	return { currentLang, changeLanguage };
}
