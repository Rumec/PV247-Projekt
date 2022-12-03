import { Button } from '@mui/material';
import { deleteDoc } from 'firebase/firestore';
import { FC, useState } from 'react';

import { useGroupUsers } from '../hooks/useGroupUsers';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { fetchAllUsersInGroup, groupUserDocument } from '../utils/firebase';

import CreateGroup from './CreateGroup';
import GroupDialog from './GroupDialog';
import GroupUsersList from './GroupUsersList';

const DrawerContent: FC = () => {
	const user = useLoggedInUser();
	const [openSelectDialog, setOpenSelectDialog] = useState(false);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [{ groupName, groupUsers }, setGroupUsers] = useGroupUsers();

	const handleSelectClose = async (value: string | undefined) => {
		setOpenSelectDialog(false);
		const users = await fetchAllUsersInGroup(value);
		setGroupUsers({
			groupName: value,
			groupUsers: users
		});
	};

	const handleCreateClose = async (group: string | undefined) => {
		setOpenCreateDialog(false);
		handleSelectClose(group);
	};

	return (
		<>
			{!groupName && (
				<Button
					onClick={() => {
						setOpenSelectDialog(true);
					}}
				>
					Join User Group
				</Button>
			)}
			{!groupName && (
				<Button
					onClick={() => {
						setOpenCreateDialog(true);
					}}
				>
					Create User Group
				</Button>
			)}
			<GroupDialog
				selectedValue={groupName}
				open={openSelectDialog}
				onClose={handleSelectClose}
			/>
			<CreateGroup open={openCreateDialog} onClose={handleCreateClose} />
			{groupName && (
				<GroupUsersList groupName={groupName} groupUsers={groupUsers} />
			)}
			{groupName && user?.email && (
				<Button
					onClick={() => {
						if (!user?.email) return;
						const groupUserDoc = groupUserDocument(user?.email);
						deleteDoc(groupUserDoc);
						setGroupUsers({ groupName: undefined, groupUsers: [] });
					}}
				>
					Leave User Group
				</Button>
			)}
		</>
	);
};

export default DrawerContent;
