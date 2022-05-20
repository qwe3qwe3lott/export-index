import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from '../MainLayout';
import AboutPage from '../../pages/AboutPage';
import TablesPage from '../../pages/TablesPage';
import AuthorsPage from '../../pages/AuthorsPage';
import {useIsOnline} from 'react-use-is-online';
import OffLinePage from '../../pages/OffLinePage';

const App: React.FC = () => {
	const {isOnline} = useIsOnline();

	return(<Routes>
		<Route path={'/'} element={<MainLayout/>}>
			<Route index element={<AboutPage/>}/>
			<Route path={'authors'} element={<AuthorsPage/>}/>
			<Route path={'tables'} element={isOnline ? <TablesPage/> : <OffLinePage/>}/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Route>
	</Routes>);
};

export default App;
