import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import LocationSummary from '../components/LocationSummary';
import WeatherCard from '../components/WeatherCard';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';
import useTitle from '../hooks/useTitle';

const LocationDetail = () => {
	useTitle('Location Detail');
	const { locationId } = useParams();

	if (!locationId) {
		return <Typography>Error</Typography>;
	}

	const { weatherInfo, isLoading, error } = useLocationWeatherInfo([
		parseInt(locationId.replace(':', ''))
	]);

	if (error) {
		return <div>failed to load</div>;
	}

	if (isLoading) return <div>loading...</div>;
	return (
		<>
			<LocationSummary
				id={locationId?.replace(':', '')}
				weather={weatherInfo[0]}
			/>
			<WeatherCard
				latitude={weatherInfo[0].coord.lat}
				longitude={weatherInfo[0].coord.lon}
			/>
		</>
	);
};

export default LocationDetail;
