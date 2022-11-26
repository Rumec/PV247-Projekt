import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

type Props = {
	name: string;
	latitude: string;
	longitude: string;
	description?: string;
};

const LocationTableItem: FC<Props> = ({
	name,
	latitude,
	longitude,
	description
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
			justifyContent: 'flex-start',
			backgroundColor: 'primary.main',
			margin: 2,
			borderRadius: '2rem'
		}}
	>
		<Typography variant="h3" fontWeight="bold" color="black">
			{name}
		</Typography>
		<Typography variant="h5" fontWeight="bold" color="black">
			Coordinates: {latitude}, {longitude}
		</Typography>
		{description && (
			<Typography variant="h5" fontWeight="bold" color="black">
				Description: {description}
			</Typography>
		)}
		<IconButton title="Delete" color="error">
			<Delete />
		</IconButton>
	</Box>
);

export default LocationTableItem;
