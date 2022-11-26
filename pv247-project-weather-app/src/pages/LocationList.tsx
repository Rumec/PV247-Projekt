import { useEffect } from 'react';
import {
	Box,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography
} from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useSwitch from '../hooks/useSwitch';

const LocationList = () => {
	const user = useLoggedInUser();
	const [showGroupLocaitons, showGroupLocaitonsProps] = useSwitch(
		'show-group-locaitons',
		'medium'
	);

	// TODO: Firebase call
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	useEffect(() => {}, []);

	return (
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
		</Box>
	);
};

export default LocationList;
