import { CircularProgress, Typography } from '@mui/material';
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
		return <Typography variant="h1">Failed to load</Typography>;
	}
	if (isLoading) return <CircularProgress />;

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
