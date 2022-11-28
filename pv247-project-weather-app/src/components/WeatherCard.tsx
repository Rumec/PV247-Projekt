import {
	Card,
	CardContent,
	Box,
	CardMedia,
	Grid,
	Paper,
	Typography
} from '@mui/material';
import { useEffect, FC, useState } from 'react';

import { WeatherData } from '../types/WeatherData';

import LocationSummary from './LocationSummary';
import WeatherTable from './WeatherTable';

//
type WeatherCardProps = {
	name: string;
	latitude: number;
	longitude: number;
};
const apiKey = 'f8d581c6a5f819893fdbba63dc78bfe7';

// function to fetch weather data from API
const fetchWeather = async (latitude: number, longitude: number) => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
	);
	const data = await response.json();
	return data;
};

const groupWeatherDataByDay = (data: any) => {
	const groupedData = data.list.reduce((acc: any, item: any) => {
		const date = item.dt_txt.split(' ')[0];
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(item);
		return acc;
	}, {});
	return Object.keys(groupedData).map((date: any) =>
		// console.log(groupedData[date][0].weather[0].icon);
		({
			date,
			data: groupedData[date],
			icon: groupedData[date][0].weather[0].icon
		})
	);
};

const getAverageTemp = (data: any, key: string) => {
	const temps = data.map((item: any) => item.main[key]);
	const sum = temps.reduce((acc: any, temp: any) => acc + temp, 0);
	return temps.length !== 0 ? sum / temps.length : 0;
};

const getMainAvgValues = (data: any, date: string, icon: string) => {
	console.log(icon);
	const avgTemp = getAverageTemp(data, 'temp');
	const avgFeelsLike = getAverageTemp(data, 'feels_like');
	const avgTempMin = getAverageTemp(data, 'temp_min');
	const avgTempMax = getAverageTemp(data, 'temp_max');
	const avgPressure = getAverageTemp(data, 'pressure');
	const avgSeaLevel = getAverageTemp(data, 'sea_level');
	const avgGroundLevel = getAverageTemp(data, 'grnd_level');
	const avgHumidity = getAverageTemp(data, 'humidity');
	return {
		date,
		avgTemp,
		avgFeelsLike,
		avgTempMin,
		avgTempMax,
		avgPressure,
		avgSeaLevel,
		avgGroundLevel,
		avgHumidity,
		icon
	};
};
const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const WeatherCard: FC<WeatherCardProps> = ({ name, latitude, longitude }) => {
	const [weather, setWeather] = useState<WeatherData>();
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		fetchWeather(latitude, longitude)
			.then(data => {
				setWeather(data);
				setLoading(false);
				// console.log(groupWeatherDataByDay(data));
				// console.log(
				// 	groupWeatherDataByDay(data).map((item: any) =>
				// 		getMainAvgValues(item.data, item.date)
				// 	)
				// );
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, [latitude, longitude]);

	return (
		<>
			{weather && <LocationSummary {...weather.city} />}
			{weather && (
				<Grid container spacing={3} justifyContent="center">
					{groupWeatherDataByDay(weather)
						.map((item: any) =>
							getMainAvgValues(item.data, item.date, item.icon)
						)
						.map((item: any, k) => {
							console.log(`weather_icons/${item.icon}.png`);
							return (
								<Grid item xs={2} sm={2} md={2} lg={2} key={k}>
									<Card
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
											width: '100%',
											textAlign: 'left'
										}}
										component={Paper}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between'
												}}
											>
												<Typography variant="h4" color="textSecondary">
													{`${days[new Date(item.date).getDay()]} - ${new Date(
														item.date
													).toLocaleDateString()}`}
												</Typography>
												<Box
													sx={{
														display: 'flex',
														justifyContent: 'center'
													}}
												>
													<CardMedia
														component="img"
														sx={{ objectFit: 'contain' }}
														image={`weather_icons/${item.icon.substring(
															0,
															2
														)}d.png`}
													/>
												</Box>
											</Box>
											<Typography variant="h5" color="textSecondary">
												Temperature: {Math.round(item.avgTemp * 100) / 100}°C
											</Typography>
											<Typography variant="h5" color="textSecondary">
												Feels Like Temperature:{' '}
												{Math.round(item.avgFeelsLike * 100) / 100}°C
											</Typography>
											<Typography variant="h5" color="textSecondary">
												Min Temperature:{' '}
												{Math.round(item.avgTempMin * 100) / 100}°C
											</Typography>
											<Typography variant="h5" color="textSecondary">
												Max Temperature:{' '}
												{Math.round(item.avgTempMax * 100) / 100}°C
											</Typography>
											<Typography variant="h5" color="textSecondary">
												Pressure: {Math.round(item.avgPressure * 100) / 100} hPa
											</Typography>
											<Typography variant="h5" color="textSecondary">
												Humidity: {Math.round(item.avgHumidity * 100) / 100}%
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
				</Grid>
			)}
			<WeatherTable weather={weather} />
		</>
	);
};

export default WeatherCard;
