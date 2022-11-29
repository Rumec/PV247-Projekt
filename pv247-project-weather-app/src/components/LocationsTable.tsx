import { CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { onSnapshot, query, where } from 'firebase/firestore';

import { LocationWeather } from '../utils/typeDefinitions';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';
import { useUserLocations } from '../hooks/useUserLocations';
import { favoritePlacesCollection } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

import LocationTableItem from './LocationTableItem';

const LocationsTable = () => {
	const user = useLoggedInUser();
	const [places, setPlaces] = useUserLocations();
	const { weatherInfo, isLoading, error } = useLocationWeatherInfo(
		places.map(place => place.placeId)
	);

	useEffect(() => {
		// TODO: Will be filtering by groups
		//       ATM for individuals only
		const q = query(favoritePlacesCollection, where('by', '==', user?.email));

		const unsubscribe = onSnapshot(q, snapshot => {
			setPlaces(snapshot.docs.map(doc => ({ ...doc.data(), dbID: doc.id })));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	if (!weatherInfo) {
		return <div />;
	}

	if (error) {
		return <Typography variant="h1">Failed to load</Typography>;
	}
	if (isLoading) return <CircularProgress />;

	return (
		<>
			{weatherInfo.map((p: LocationWeather) => (
				<LocationTableItem
					key={p.id}
					// TODO: Do it better, it's ugly
					dbId={places.filter(pl => pl.placeId === p.id)[0]?.dbID}
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
