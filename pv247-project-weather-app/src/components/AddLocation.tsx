import { Dispatch, FC } from 'react';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@mui/material';

type Props = {
	isOpened: boolean;
	setIsOpened: Dispatch<React.SetStateAction<boolean>>;
};

const AddLocation: FC<Props> = ({ isOpened, setIsOpened }) => (
	<Dialog open={isOpened} onClose={() => setIsOpened(false)}>
		<DialogTitle>Add a review</DialogTitle>
		<DialogContent
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				minWidth: 500
			}}
		>
			<Box>
				<p>smth</p>
			</Box>
		</DialogContent>
		<DialogActions>
			<p>smth</p>
		</DialogActions>
	</Dialog>
);

export default AddLocation;
