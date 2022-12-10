import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	Typography
} from '@mui/material';
import { useState } from 'react';

import useSwitch from '../hooks/useSwitch';
import LocationsTable from '../components/LocationsTable';
import useTitle from '../hooks/useTitle';
import AddLocationDialog from '../components/AddLocationDialog';
import { UserLocationsProvider } from '../hooks/useUserLocations';
import { useGroupUsers } from '../hooks/useGroupUsers';

const LocationList = () => {
	useTitle('Locations');
	const [showGroupLocations, showGroupLocaitonsProps] = useSwitch(
		'show-group-locations',
		'medium'
	);
	const [{ groupName }] = useGroupUsers();

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	return (
		<>
			<Grid
				container
				sx={{
					width: { sm: '88%', md: '78%' },
					marginTop: { xs: '1rem', md: 0 },
					alignItems: 'center'
				}}
			>
				<Grid item xs={12} md={4}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: { xs: '3rem', lg: '4.5rem' }
						}}
					>
						Locations
					</Typography>
				</Grid>
				{groupName && (
					<Grid
						item
						xs={6}
						md={4}
						sx={{
							display: 'flex',
							justifyContent: { xs: 'start', md: 'center' }
						}}
					>
						<FormGroup>
							<FormControlLabel
								control={<Switch {...showGroupLocaitonsProps} />}
								label="Show group locations"
							/>
						</FormGroup>
					</Grid>
				)}
				<Grid
					item
					xs={6}
					md={4}
					sx={{ display: 'flex', justifyContent: 'end' }}
				>
					<Button
						variant="contained"
						sx={{ fontWeight: 'bold' }}
						onClick={() => setOpenDialog(true)}
					>
						Add new location
					</Button>
				</Grid>
			</Grid>
			<Box
				sx={{
					width: { md: '80%' }
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
