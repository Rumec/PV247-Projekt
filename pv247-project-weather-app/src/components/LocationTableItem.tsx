import { FC, useCallback } from 'react';
import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router';

import { useUserLocations } from '../hooks/useUserLocations';

type Props = {
	id: number;
	name: string;
	temperature: number;
	weather: string;
};

const LocationTableItem: FC<Props> = ({ id, name, temperature, weather }) => {
	const navigate = useNavigate();
	const [placeIds, setPlaceIds] = useUserLocations();

	const onDelete = useCallback(() => {
		setPlaceIds(prevState => prevState.filter(placeId => placeId !== id));
	}, [placeIds]);

	return (
		// TODO: Styling
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				backgroundColor: 'primary.main',
				margin: 2,
				borderRadius: '2rem'
			}}
		>
			<ButtonBase
				sx={{
					gap: 6,
					height: 'wrap-content',
					padding: 2,
					justifyContent: 'space-between',
					width: '100%'
				}}
				onClick={() => {
					navigate(`/LocationDetail:${id}`);
				}}
			>
				<Typography variant="h3" fontWeight="bold" color="black">
					{name}
				</Typography>
				<Typography variant="h5" fontWeight="bold" color="black">
					Temperature: {temperature}
				</Typography>
				<Typography variant="h5" fontWeight="bold" color="black">
					Weather: {weather}
				</Typography>
			</ButtonBase>
			<IconButton title="Delete" color="error" onClick={() => onDelete()}>
				<Delete />
			</IconButton>
		</Box>
	);
};

export default LocationTableItem;
