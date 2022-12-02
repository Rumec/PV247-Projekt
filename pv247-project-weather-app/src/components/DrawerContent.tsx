import { Button } from '@mui/material';
import { deleteDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';

import { fetchUserGroup, groupUserDocument } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

import GroupDialog from './GroupDialog';
import GroupUsersList from './GroupUsersList';

const DrawerContent: FC = () => {
	const user = useLoggedInUser();
	const [openDialog, setOpenDialog] = useState(false);
	const [groupName, setGroupName] = useState<string>();

	useEffect(() => {
		if (!user?.email) return;
		fetchUserGroup(user.email);
	}, []);

	const handleClose = async (value: string | undefined) => {
		// const q = query(userGroupsCollection, where('name', '==', value));
		// const userGroup = await getDocs(q);
		// if (user?.email) {
		// 	await addDoc(groupUsersCollection, {
		// 		user_email: user?.email,
		// 		group_name: value
		// 	});
		// }
		setOpenDialog(false);
		setGroupName(value);
	};

	return (
		<>
			{!groupName && (
				<Button
					onClick={() => {
						setOpenDialog(true);
					}}
				>
					Join User Group
				</Button>
			)}
			<GroupDialog
				selectedValue={groupName}
				open={openDialog}
				onClose={handleClose}
			/>
			{groupName && <GroupUsersList group_name={groupName} />}
			{groupName && user?.email && (
				<Button
					onClick={() => {
						if (!user?.email) return;
						const groupUserDoc = groupUserDocument(user?.email);
						deleteDoc(groupUserDoc);
						setGroupName(undefined);
					}}
				>
					Leave User Group
				</Button>
			)}
		</>
	);
};

export default DrawerContent;
