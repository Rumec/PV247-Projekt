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
import LocationTableItem from '../components/LocationTableItem';

const LocationList = () => {
	const user = useLoggedInUser();
	const [showGroupLocaitons, showGroupLocaitonsProps] = useSwitch(
		'show-group-locaitons',
		'medium'
	);

	// TODO: Firebase call
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	useEffect(() => {}, []);

	const places = [
		{
			id: 1,
			name: 'Prague',
			latitude: '50.1',
			longitude: '14.43',
			description: 'Prdelakov'
		},
		{
			id: 2,
			name: 'Wein',
			latitude: '48.1',
			longitude: '16.5',
			description: 'Podivni lidi zde ziji'
		},
		{
			id: 3,
			name: 'Nairobi',
			latitude: '57.1',
			longitude: '89.43',
			description: 'Odpadky vsude'
		},
		{
			id: 4,
			name: 'Wellington',
			latitude: '73.3',
			longitude: '1.43'
		}
	];

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
			</Box>
			<Box>
				{places.map(p => (
					<LocationTableItem
						key={p.id}
						name={p.name}
						latitude={p.latitude}
						longitude={p.longitude}
						description={p.description}
					/>
				))}
			</Box>
		</>
	);
};

export default LocationList;
