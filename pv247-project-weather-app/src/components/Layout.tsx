import { FC, PropsWithChildren } from 'react';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();
	const navigate = useNavigate();

	return (
		<>
			{!!user && (
				<AppBar sx={{ position: 'sticky', top: 0 }}>
					<Container maxWidth="lg">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<Button component={Link} to="/">
								My Group
							</Button>
							<Box sx={{ flexGrow: 1 }} />
							<Button
								onClick={() => {
									navigate('/');
									return signOut();
								}}
							>
								Logout
							</Button>
						</Toolbar>
					</Container>
				</AppBar>
			)}

			<Container
				maxWidth="xl"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					//justifyContent: 'center',
					alignItems: 'center',
					flexGrow: 1,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};

export default Layout;
