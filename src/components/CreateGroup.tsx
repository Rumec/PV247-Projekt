import {
	Dialog,
	DialogContent,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { onSnapshot, query, setDoc } from 'firebase/firestore';
import { FC, FormEvent, useEffect, useState } from 'react';

import { groupDocument, userGroupsCollection } from '../utils/firebase';
import useField from '../hooks/useField';

export type CreateGroupProps = {
	open: boolean;
	onClose: (value: boolean) => void;
	onSubmit: (value: string | undefined) => void;
};

const CreateGroup: FC<CreateGroupProps> = ({ open, onClose, onSubmit }) => {
	const [userGroups, setUserGroups] = useState<string[]>([]);
	const [group, groupFieldProps] = useField('groupField');

	const [submitError, setSubmitError] = useState<string>();

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
		onClose(false);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<Paper
				component="form"
				onSubmit={async (e: FormEvent) => {
					e.preventDefault();
					if (userGroups.map(p => p).includes(group))
						setSubmitError('Group alreeady exists');
					else {
						const groupDoc = groupDocument(group);
						setDoc(groupDoc, {});
						onSubmit(group);
					}
				}}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
			>
				<DialogTitle>Create New Group</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: { md: 500 }
					}}
				>
					<TextField
						sx={{ marginTop: 1 }}
						label="Group Name"
						{...groupFieldProps}
					/>
					{submitError && (
						<Typography
							variant="caption"
							textAlign="right"
							sx={{ color: 'error.main' }}
						>
							{submitError}
						</Typography>
					)}
				</DialogContent>
			</Paper>
		</Dialog>
	);
};

export default CreateGroup;
