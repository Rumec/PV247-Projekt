import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography
} from '@mui/material';
import { useState } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useSwitch from '../hooks/useSwitch';
import LocationsTable from '../components/LocationsTable';
import useTitle from '../hooks/useTitle';
import AddLocation from '../components/AddLocation';

const LocationList = () => {
	useTitle('Locations');
	const user = useLoggedInUser();
	const [showGroupLocaitons, showGroupLocaitonsProps] = useSwitch(
		'show-group-locaitons',
		'medium'
	);

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	return (
		<>
			<Box
				sx={{
					width: '78%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Typography variant="h1" fontWeight="bold">
					Locations
				</Typography>
				<FormGroup>
					<FormControlLabel
						control={<Switch {...showGroupLocaitonsProps} />}
						label="Show group locations"
					/>
				</FormGroup>
				<Button
					variant="contained"
					sx={{ fontWeight: 'bold' }}
					onClick={() => setOpenDialog(true)}
				>
					Add new location
				</Button>
			</Box>

			<Box
				sx={{
					width: '80%'
				}}
			>
				<LocationsTable />
				<AddLocation isOpened={openDialog} setIsOpened={setOpenDialog} />
			</Box>
		</>
	);
};

export default LocationList;
