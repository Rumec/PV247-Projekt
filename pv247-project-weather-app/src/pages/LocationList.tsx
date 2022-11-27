import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography
} from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useSwitch from '../hooks/useSwitch';
import LocationsTable from '../components/LocationsTable';

const LocationList = () => {
	const user = useLoggedInUser();
	const [showGroupLocaitons, showGroupLocaitonsProps] = useSwitch(
		'show-group-locaitons',
		'medium'
	);

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
				<Button variant="contained" sx={{ fontWeight: 'bold' }}>
					Add new location
				</Button>
			</Box>

			<Box
				sx={{
					width: '80%'
				}}
			>
				<LocationsTable />
			</Box>
		</>
	);
};

export default LocationList;
