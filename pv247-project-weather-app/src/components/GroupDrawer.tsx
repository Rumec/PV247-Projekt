import { Drawer } from '@mui/material';
import { FC } from 'react';

import DrawerContent from './DrawerContent';

type Props = {
	openDrawer: boolean;
	setOpenDrawer: (openDrawer: boolean) => void;
};

const GroupDrawer: FC<Props> = ({ openDrawer, setOpenDrawer }) => (
	<Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
		{/* {getUserGroups(user)} */}
		<DrawerContent />
	</Drawer>
);

export default GroupDrawer;
