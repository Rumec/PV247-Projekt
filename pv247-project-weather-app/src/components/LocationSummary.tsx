import {
	Box,
	Typography,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Avatar,
	Grid
} from '@mui/material';
import { FC } from 'react';

import Map from '../components/Map';
import useLocationWeatherInfo from '../hooks/useLocationWeatherInfo';

type LocationSummaryProps = {
	id: string | undefined;
	// name: string;
	// coord: {
	// 	lat: number;
	// 	lon: number;
	// };
	// country: string;
	// population: number;
	// timezone: number;
	// sunrise: number;
	// sunset: number;
};

const LocationSummary: FC<LocationSummaryProps> = ({ id }) => {
	if (!id) {
		return <Typography>Error</Typography>;
	}
	console.log('parseInt>>>>>>', parseInt(id));
	const { weatherInfo, isLoading, error } = useLocationWeatherInfo([
		parseInt(id)
	]);

	return (
		<Grid container spacing={3} justifyContent="start" sx={{ width: '100%' }}>
			<Grid item xs={6} sm={6}>
				<Card sx={{ width: '100%', height: '100%' }} variant="outlined">
					<Grid
						container
						spacing={3}
						justifyContent="center"
						sx={{ height: '100%' }}
					>
						<Grid item xs={6} sm={6}>
							<Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
								<CardHeader
									title={`${weatherInfo[0].name}, ${weatherInfo[0].sys.country}`}
									subheader={`Latitude: ${weatherInfo[0].coord.lat} | Longitude: ${weatherInfo[0].coord.lon}`}
									titleTypographyProps={{ variant: 'h3' }}
									subheaderTypographyProps={{ variant: 'subtitle1' }}
								/>
								<CardContent sx={{ alignItems: 'center', justify: 'center' }}>
									<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
										<Avatar alt="" src="weather_icons/sunrise.png" />
										<Typography variant="h6">
											{new Date(
												weatherInfo[0].sys.sunrise * 1000
											).toLocaleString()}
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
										<Avatar alt="" src="weather_icons/sunset.png" />
										<Typography variant="h6">
											{new Date(
												weatherInfo[0].sys.sunset * 1000
											).toLocaleString()}
										</Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={6} sm={6}>
							<Card sx={{ width: '100%', height: '100%' }} variant="outlined">
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<Typography variant="h3" color="textSecondary">
										Rain - moderate rain
									</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<CardMedia
											component="img"
											image="weather_icons/03d.png"
											height="250"
											sx={{ objectFit: 'contain' }}
											alt=""
										/>
									</Box>
								</Box>
								<Typography variant="h5" color="textSecondary">
									Visibility - 8km
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Rain volume 3.16mm
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Wind - 0.62 349* 1.18
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Cloudiness 98%
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Temperature: 20°C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Feels Like Temperature: 16°C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Min Temperature: 12°C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Max Temperature: 18°C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Pressure: 1020 hPa
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Humidity: 80.5%
								</Typography>
							</Card>
						</Grid>
					</Grid>
				</Card>
			</Grid>
			<Grid item xs={6} sm={6}>
				<Map
					name={weatherInfo[0].name}
					lat={weatherInfo[0].coord.lat}
					lon={weatherInfo[0].coord.lon}
				/>
			</Grid>
		</Grid>
	);
};

export default LocationSummary;
