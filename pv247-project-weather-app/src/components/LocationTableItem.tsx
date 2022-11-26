import { FC } from 'react';
import { Box, Typography } from '@mui/material';

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
		<Typography variant="h4" fontWeight="bold" color="black">
			Coordinates: {latitude}, {longitude}
		</Typography>
		{description && (
			<Typography variant="h4" fontWeight="bold" color="black">
				Description: {description}
			</Typography>
		)}
	</Box>
);

export default LocationTableItem;
