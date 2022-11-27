import { LocationWeather } from '../utils/typeDefinitions';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';

import LocationTableItem from './LocationTableItem';

const LocationsTable = () => {
	//TODO: Load from firebase
	const placesIds = [524901, 703448, 2643743, 14256];

	const { weatherInfo, isLoading, error } = useLocationWeatherInfo(placesIds);

	if (error) {
		return <div>failed to load</div>;
	}
	if (isLoading) return <div>loading...</div>;

	return weatherInfo.map((p: LocationWeather) => (
		<LocationTableItem
			key={p.id}
			id={p.id}
			name={p.name}
			temperature={p.main.temp}
			weather={p.weather[0].description}
		/>
	));
};

export default LocationsTable;
