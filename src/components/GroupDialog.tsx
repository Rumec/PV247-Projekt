import {
	Avatar,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { onSnapshot, query, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import { groupUserDocument, userGroupsCollection } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

export type GroupDialogProps = {
	open: boolean;
	selectedValue: string | undefined;
	onClose: (value: string | undefined) => void;
};

const GroupDialog = (props: GroupDialogProps) => {
	const { onClose, selectedValue, open } = props;
	const user = useLoggedInUser();
	const [userGroups, setUserGroups] = useState<string[]>([]);

	useEffect(() => {
		const q = query(userGroupsCollection);
		const unsubscribe = onSnapshot(q, snapshot => {
			setUserGroups(snapshot.docs.map(doc => doc.id));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value: string) => {
		if (!user?.email) return;
		const userGroupDoc = groupUserDocument(user?.email);
		setDoc(userGroupDoc, { group_name: value });
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Select user group</DialogTitle>
			<List sx={{ pt: 0 }}>
				{userGroups.map((group: string, k: number) => (
					<ListItem button onClick={() => handleListItemClick(group)} key={k}>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={group} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
};

export default GroupDialog;
