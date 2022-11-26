import { FC, PropsWithChildren } from 'react';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();

	return (
		<>
			{!!user && (
				<AppBar sx={{ position: 'sticky', top: 0 }}>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							{/*TODO: Solve this*/}
							<Button component={Link} to="/">
								My Group
							</Button>
							{/*Takes up remaining space*/}
							<Box sx={{ flexGrow: 1 }} />
							<Button onClick={signOut}>Logout</Button>
						</Toolbar>
					</Container>
				</AppBar>
			)}

			<Container
				maxWidth="sm"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					flexGrow: 1,
					gap: 2,
					py: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};

export default Layout;
