import { CircularProgress, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { onSnapshot, Query, query, where } from 'firebase/firestore';

import { LocationWeather } from '../utils/typeDefinitions';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';
import { useUserLocations } from '../hooks/useUserLocations';
import { FavoritePlace, favoritePlacesCollection } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useGroupUsers } from '../hooks/useGroupUsers';

import LocationTableItem from './LocationTableItem';

type Props = { showGroup: boolean };
const LocationsTable: FC<Props> = ({ showGroup }) => {
	const user = useLoggedInUser();
	const [places, setPlaces] = useUserLocations();
	const [{ groupUsers }] = useGroupUsers();
	const { weatherInfo, isLoading, error } = useLocationWeatherInfo(
		places.map(place => place.placeId)
	);

	const getLocationQuery = (wholeGroup: boolean): Query<FavoritePlace> => {
		if (wholeGroup) {
			return query(favoritePlacesCollection, where('by', 'in', groupUsers));
		}
		return query(favoritePlacesCollection, where('by', '==', user?.email));
	};

	useEffect(() => {
		const q = getLocationQuery(showGroup);

		const unsubscribe = onSnapshot(q, snapshot => {
			setPlaces(snapshot.docs.map(doc => ({ ...doc.data(), dbID: doc.id })));
		});
		return () => {
			unsubscribe();
		};
	}, [showGroup]);

	if (!weatherInfo) {
		return <div />;
	}

	if (error) {
		return <Typography variant="h1">Failed to load</Typography>;
	}
	if (isLoading) return <CircularProgress />;

	return (
		<>
			{weatherInfo
				.sort((a: LocationWeather, b: LocationWeather) =>
					a.name.localeCompare(b.name)
				)
				.map((p: LocationWeather) => (
					<LocationTableItem
						key={p.id}
						id={p.id}
						name={p.name}
						temperature={p.main.temp}
						weather={p.weather[0].description}
					/>
				))}
		</>
	);
};

export default LocationsTable;
