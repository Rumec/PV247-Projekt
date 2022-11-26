import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Login from '../pages/Login';

const AppRoutes = () => {
	const user = useLoggedInUser();

	return (
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	);
};

export default AppRoutes;
