import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import LocationSummary from '../components/LocationSummary';
import WeatherCard from '../components/WeatherCard';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';
import useTitle from '../hooks/useTitle';

const LocationDetail = () => {
	useTitle('Location Detail');
	const { locationId } = useParams();
	console.log('location detail', locationId);
	if (!locationId) {
		return <Typography>Error</Typography>;
	}
	console.log('location detail', locationId.replace(':', ''));
	const { weatherInfo, isLoading, error } = useLocationWeatherInfo([
		parseInt(locationId.replace(':', ''))
	]);
	if (error) {
		return <div>failed to load</div>;
	}
	if (isLoading) return <div>loading...</div>;
	// TODO: Add some fancy details, map, etc .... Use useLocationWeatherInfo hook to get fetched data
	return (
		<>
			<Typography variant="h1">Detail of {weatherInfo[0].name}</Typography>
			<LocationSummary id={locationId?.replace(':', '')} />
			<WeatherCard
				name={weatherInfo[0].name}
				latitude={weatherInfo[0].coord.lat}
				longitude={weatherInfo[0].coord.lon}
			/>
		</>
	);
};

export default LocationDetail;
