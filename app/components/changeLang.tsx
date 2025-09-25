import { useLanguage } from '../hooks/useLang';
import i18n from '../utils/i18n';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function ChangeLanguageButton() {
	const [currentPage, setCurrentPage] = useState('home');
	const { currentLang, changeLanguage } = useLanguage();

	return (
		<button
			onClick={() => {
				const newLang = currentLang === 'uk' ? 'en' : 'uk';
				changeLanguage(newLang);
				i18n.changeLanguage(newLang);
			}}
			className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-1 text-sm text-gray-600"
		>
			<Globe className="w-4 h-4" />
			<span className="font-medium">{currentLang}</span>
		</button>
	);
}
