import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './hooks/useLoggedInUser';
import theme from './utils/theme';
import Layout from './components/Layout';
import AppRoutes from './components/AppRoutes';
import { GroupUsersProvider } from './hooks/useGroupUsers';
import { UnitSettingsProvider } from './hooks/useUnitSettings';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<GroupUsersProvider>
					<UnitSettingsProvider>
						<Layout>
							<AppRoutes />
						</Layout>
					</UnitSettingsProvider>
				</GroupUsersProvider>
			</BrowserRouter>
		</ThemeProvider>
	</UserProvider>
);

export default App;
