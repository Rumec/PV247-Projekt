import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Login from '../pages/Login';
import LocationList from '../pages/LocationList';
import NotFound from '../pages/NotFound';
import LocationDetail from '../pages/LocationDetail';

const AppRoutes = () => {
	const user = useLoggedInUser();

	return (
		<Routes>
			{!user && <Route path="/" element={<Login />} />}
			<Route path="/" element={<LocationList />} />
			{user && <Route path="/LocationList" element={<LocationList />} />}
			{user && (
				<Route path="/LocationDetail:locationId" element={<LocationDetail />} />
			)}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
