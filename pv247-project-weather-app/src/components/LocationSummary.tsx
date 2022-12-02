import {
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';

import Map from '../components/Map';
import { CurrentWeather } from '../types/CurrentWeather';

type LocationSummaryProps = {
	id: string | undefined;
	weather: CurrentWeather;
};

const LocationSummary: FC<LocationSummaryProps> = ({ id, weather }) => {
	if (!id) {
		return <Typography>Error</Typography>;
	}
	console.log(weather);

	return (
		<Grid
			container
			spacing={0}
			justifyContent="center"
			sx={{ width: '100%' }}
			mt={2}
		>
			<Grid item xs={6} sm={6}>
				<Card sx={{ width: '100%', height: '100%' }} variant="outlined">
					<Grid
						container
						spacing={0}
						justifyContent="center"
						sx={{ height: '100%' }}
					>
						<Grid item xs={6} sm={6}>
							<Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
								<CardHeader
									title={
										<Box>
											{weather.name}, {weather.sys.country}{' '}
											<FlagIcon
												code={weather.sys.country as FlagIconCode}
												size={36}
											/>
										</Box>
									}
									subheader={`Latitude: ${weather.coord.lat} | Longitude: ${weather.coord.lon}`}
									titleTypographyProps={{ variant: 'h3' }}
									subheaderTypographyProps={{ variant: 'subtitle1' }}
								/>
								<CardContent sx={{ alignItems: 'center', justify: 'center' }}>
									<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
										<Avatar alt="" src="weather_icons/sunrise.png" />
										<Typography variant="h6">
											{new Date(weather.sys.sunrise * 1000).toLocaleString()}
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
										<Avatar alt="" src="weather_icons/sunset.png" />
										<Typography variant="h6">
											{new Date(weather.sys.sunset * 1000).toLocaleString()}
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
										{weather.weather[0].description
											.split(' ')
											.map(word => word[0].toUpperCase() + word.slice(1))
											.join(' ')}
									</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<CardMedia
											component="img"
											image={`weather_icons/${weather.weather[0].icon}.png`}
											height="150"
											width="150"
											sx={{ objectFit: 'contain' }}
											alt=""
										/>
									</Box>
								</Box>
								<Typography variant="h5" color="textSecondary">
									Visibility: {weather.visibility / 1000} km
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Rain: {weather.rain ? `${weather.rain['1h']}  mm` : 'unknown'}
								</Typography>
								<Typography variant="h6" color="textSecondary">
									Wind: {weather.wind.speed} m/s | {weather.wind.deg} deg
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Cloudiness: {weather.clouds.all} %
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Temperature: {weather.main.temp} °C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Feels Like Temp: {weather.main.feels_like} °C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Min Temperature: {weather.main.temp_min} °C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Max Temperature: {weather.main.temp_max} °C
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Pressure: {weather.main.pressure} hPa
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Humidity: {weather.main.humidity} %
								</Typography>
							</Card>
						</Grid>
					</Grid>
				</Card>
			</Grid>
			<Grid item xs={6} sm={6}>
				<Map
					name={weather.name}
					lat={weather.coord.lat}
					lon={weather.coord.lon}
				/>
			</Grid>
		</Grid>
	);
};

export default LocationSummary;
