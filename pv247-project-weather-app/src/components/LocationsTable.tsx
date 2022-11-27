import useSWR from 'swr';

import { fetchWeatherByIds } from '../utils/fetchers';
import { LocationWeather } from '../utils/typeDefinitions';

import LocationTableItem from './LocationTableItem';

const LocationsTable = () => {
	//TODO: Load from firebase
	const placesIds = [524901, 703448, 2643743, 14256];
	const { data, error } = useSWR(placesIds.join(','), fetchWeatherByIds);

	if (error) {
		return <div>failed to load</div>;
	}
	if (!data) return <div>loading...</div>;

	return data.list.map((p: LocationWeather) => (
		<LocationTableItem
			key={p.id}
			name={p.name}
			temperature={p.main.temp}
			weather={p.weather[0].description}
		/>
	));
};

export default LocationsTable;
