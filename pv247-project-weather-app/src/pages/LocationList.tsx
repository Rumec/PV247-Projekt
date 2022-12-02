import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography
} from '@mui/material';
import { useState } from 'react';

import useSwitch from '../hooks/useSwitch';
import LocationsTable from '../components/LocationsTable';
import useTitle from '../hooks/useTitle';
import AddLocationDialog from '../components/AddLocationDialog';
import { UserLocationsProvider } from '../hooks/useUserLocations';

const LocationList = () => {
	useTitle('Locations');
	const [showGroupLocations, showGroupLocaitonsProps] = useSwitch(
		'show-group-locations',
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
				<UserLocationsProvider>
					<LocationsTable showGroup={showGroupLocations} />
					<AddLocationDialog
						isOpened={openDialog}
						setIsOpened={setOpenDialog}
					/>
				</UserLocationsProvider>
			</Box>
		</>
	);
};

export default LocationList;
