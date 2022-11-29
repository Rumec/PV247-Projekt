import { FC, useCallback } from 'react';
import { Box, ButtonBase, Grid, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { deleteDoc } from 'firebase/firestore';

import { useUserLocations } from '../hooks/useUserLocations';
import { favoritePlacesDocument } from '../utils/firebase';

type Props = {
	dbId: string;
	id: number;
	name: string;
	temperature: number;
	weather: string;
};

const LocationTableItem: FC<Props> = ({
	dbId,
	id,
	name,
	temperature,
	weather
}) => {
	const navigate = useNavigate();
	const [places] = useUserLocations();

	const onDelete = useCallback(async () => {
		await deleteDoc(favoritePlacesDocument(dbId));
	}, [places]);

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
				<Grid container spacing={2} alignItems="center">
					<Grid
						item
						xs={4}
						display="flex"
						justifyContent="flex-start"
						alignItems="flex-end"
					>
						<Typography variant="h3" fontWeight="bold" color="black">
							{name}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h5" fontWeight="bold" color="black">
							Temperature: {temperature}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h5" fontWeight="bold" color="black">
							Weather: {weather}
						</Typography>
					</Grid>
				</Grid>
			</ButtonBase>
			<IconButton title="Delete" color="error" onClick={() => onDelete()}>
				<Delete />
			</IconButton>
		</Box>
	);
};

export default LocationTableItem;
