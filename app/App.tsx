import { useState } from 'react';
import './App.css';
import Home from './pages/Home.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import i18n from './utils/i18n.ts';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
