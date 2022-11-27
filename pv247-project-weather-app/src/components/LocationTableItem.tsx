import { FC } from 'react';
import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router';

type Props = {
	id: number;
	name: string;
	temperature: number;
	weather: string;
};

const LocationTableItem: FC<Props> = ({ id, name, temperature, weather }) => {
	const navigate = useNavigate();

	return (
		// TODO: Styling
		<ButtonBase
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
				borderRadius: '2rem',
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
			<IconButton title="Delete" color="error">
				<Delete />
			</IconButton>
		</ButtonBase>
	);
};

export default LocationTableItem;
