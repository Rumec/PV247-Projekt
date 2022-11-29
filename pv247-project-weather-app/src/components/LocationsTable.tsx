import { Button, CircularProgress } from '@mui/material';

import { LocationWeather } from '../utils/typeDefinitions';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';
import { useUserLocations } from '../hooks/useUserLocations';

import LocationTableItem from './LocationTableItem';

const LocationsTable = () => {
	//TODO: Load from firebase
	const [placeIds] = useUserLocations();
	const { weatherInfo, isLoading, error } = useLocationWeatherInfo(placeIds);

	if (!weatherInfo) {
		return <div />;
	}

	if (error) {
		return <div>failed to load</div>;
	}
	if (isLoading) return <CircularProgress />;

	return (
		<>
			{weatherInfo.map((p: LocationWeather) => (
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
