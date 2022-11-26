import React from 'react';
import { ThemeProvider } from '@mui/material';

import { UserProvider } from './hooks/useLoggedInUser';
import theme from './utils/theme';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<p />
		</ThemeProvider>
	</UserProvider>
);

export default App;
