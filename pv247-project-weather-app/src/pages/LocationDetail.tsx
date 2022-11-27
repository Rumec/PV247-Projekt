import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const LocationDetail = () => {
	const { locationId } = useParams();
	// TODO: Add some fancy details, map, etc .... Use useLocationWeatherInfo hook to get fetched data
	return <Typography variant="h1">Detail of location {locationId}</Typography>;
};

export default LocationDetail;
