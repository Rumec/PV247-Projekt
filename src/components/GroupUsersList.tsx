import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography
} from '@mui/material';
import { FC } from 'react';

type Props = { groupName: string; groupUsers: string[] };
const GroupUsersList: FC<Props> = ({ groupName, groupUsers }) => (
	<List>
		<Typography variant="h2">{groupName}</Typography>
		<Divider />
		{groupUsers.length === 0 ? (
			<ListItemText
				primary="Group is empty"
				primaryTypographyProps={{ variant: 'h5' }}
				key={1}
			/>
		) : (
			groupUsers.map((user_name: string, k: number) => (
				<ListItem key={k}>
					<ListItemText
						primary={user_name}
						primaryTypographyProps={{ variant: 'h5' }}
					/>
				</ListItem>
			))
		)}
		<Divider />
	</List>
);
export default GroupUsersList;
