import { MessageCircle, Users, Settings, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChangeLanguageButton from '../components/changeLang';

function Home() {
	const { t } = useTranslation();

	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
				<ChangeLanguageButton />
				<div className="mb-6">
					<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
						<MessageCircle className="w-10 h-10 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						{t('homepage.title')}
					</h1>
					<p className="text-gray-600">{t('homepage.subtitle')}</p>
				</div>

				<div className="space-y-4 mb-8">
					<div className="flex items-center justify-center space-x-3 text-gray-700">
						<Users className="w-5 h-5 text-blue-500" />
						<span>{t('homepage.groupChats')}</span>
					</div>
					<div className="flex items-center justify-center space-x-3 text-gray-700">
						<Settings className="w-5 h-5 text-blue-500" />
						<span>{t('homepage.privacySettings')}</span>
					</div>
				</div>

				<div className="space-y-3">
					<button
						onClick={() => setCurrentPage('login')}
						className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
					>
						{t('homepage.loginButton')}
					</button>
					<button
						onClick={() => setCurrentPage('chat')}
						className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
					>
						{t('homepage.demoButton')}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
