import React, { Dispatch, FC, FormEvent, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { addDoc } from 'firebase/firestore';

import useField from '../hooks/useField';
import { useUserLocations } from '../hooks/useUserLocations';
import { fetchFromWeatherApi } from '../utils/fetchers';
import { favoritePlacesCollection } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	isOpened: boolean;
	setIsOpened: Dispatch<React.SetStateAction<boolean>>;
};

const AddLocationDialog: FC<Props> = ({ isOpened, setIsOpened }) => {
	const user = useLoggedInUser();
	const [places] = useUserLocations();
	const [location, locationFieldProps, setLocation] = useField('locationField');

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Dialog open={isOpened} onClose={() => setIsOpened(false)}>
			<Paper
				component="form"
				onSubmit={async (e: FormEvent) => {
					e.preventDefault();

					const query = `?q=${location}&APPID=f8d581c6a5f819893fdbba63dc78bfe7`;

					const data = await fetchFromWeatherApi(
						'https://api.openweathermap.org/data/2.5/weather',
						query
					).catch(err => {
						if (err?.response?.status === 404) {
							setSubmitError('Location not found');
						} else {
							setSubmitError('Unknown error occured');
						}
					});

					if (data && places.map(p => p.placeId).includes(data?.id))
						setSubmitError('Location already added');
					else if (data?.id) {
						try {
							await addDoc(favoritePlacesCollection, {
								by: user?.email,
								placeId: data.id
							});
						} catch (e) {
							setSubmitError('Firestore error');
						}
						setLocation('');
						setIsOpened(false);
					}
				}}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
			>
				<DialogTitle>Add a Location</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: { md: 500 }
					}}
				>
					<TextField
						sx={{ marginTop: 1 }}
						label="Location Name"
						InputProps={{
							endAdornment: <Search />
						}}
						{...locationFieldProps}
					/>
					{submitError && (
						<Typography
							variant="caption"
							textAlign="right"
							sx={{ color: 'error.main' }}
						>
							{submitError}
						</Typography>
					)}
				</DialogContent>
			</Paper>
		</Dialog>
	);
};

export default AddLocationDialog;
