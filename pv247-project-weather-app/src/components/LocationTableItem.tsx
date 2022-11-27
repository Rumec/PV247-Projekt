import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

type Props = {
	name: string;
	temperature: number;
	weather: string;
	// description?: string;
};

const LocationTableItem: FC<Props> = ({
	name,
	temperature,
	weather
	// description
}) => (
	// TODO: Styling
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'row',
			gap: 6,
			height: 'wrap-content',
			padding: 2,
			alignItems: 'flex-end',
			justifyContent: 'space-between',
			backgroundColor: 'primary.main',
			margin: 2,
			borderRadius: '2rem'
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
		<IconButton title="Delete" color="error">
			<Delete />
		</IconButton>
	</Box>
);

export default LocationTableItem;
