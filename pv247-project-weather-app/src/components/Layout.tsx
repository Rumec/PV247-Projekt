import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

import GroupDrawer from './GroupDrawer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();
	const navigate = useNavigate();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<>
			{!!user && (
				<AppBar sx={{ position: 'sticky', top: 0 }}>
					<Container maxWidth="lg">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<Button
								onClick={() => {
									console.log('in on click button');
									setOpenDrawer(true);
								}}
							>
								My Group
							</Button>
							<GroupDrawer
								openDrawer={openDrawer}
								setOpenDrawer={setOpenDrawer}
							/>
							<Button
								onClick={() => {
									navigate('/LocationList');
								}}
							>
								Home
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
