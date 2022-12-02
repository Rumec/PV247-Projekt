import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography
} from '@mui/material';
import { onSnapshot, query, where } from 'firebase/firestore';
import { FC, useEffect } from 'react';

import { useGroupUsers } from '../hooks/useGroupUsers';
import { groupUsersCollection } from '../utils/firebase';

type Props = { group_name: string };
const GroupUsersList: FC<Props> = ({ group_name }) => {
	// const [groupUsers, setGroupUsers] = useState<string[]>([]);
	const [{ groupUsers }, setGroupUsers] = useGroupUsers();
	console.log(group_name);
	useEffect(() => {
		const q = query(
			groupUsersCollection,
			where('group_name', '==', group_name)
		);
		const unsubscribe = onSnapshot(q, snapshot => {
			setGroupUsers({
				groupName: group_name,
				groupUsers: snapshot.docs.map(doc => doc.id)
			});
			console.log(groupUsers);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<List>
			<Typography variant="h2">{group_name}</Typography>
			<Divider />
			{groupUsers.length === 0 ? (
				<ListItemText
					primary="Group is empty"
					primaryTypographyProps={{ variant: 'h5' }}
				/>
			) : (
				groupUsers.map((user_name: string, k: number) => (
					<>
						<ListItem key={k}>
							<ListItemText
								primary={user_name}
								primaryTypographyProps={{ variant: 'h5' }}
							/>
						</ListItem>
						<Divider key={k + 1000} light style={{ width: '100%' }} />
					</>
				))
			)}
		</List>
	);
};

export default GroupUsersList;
