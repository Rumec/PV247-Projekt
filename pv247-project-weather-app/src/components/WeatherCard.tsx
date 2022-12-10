import {
	Box,
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Grid,
	Paper,
	Typography
} from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import {
	ForecastItem,
	MainDataKey,
	WeatherForecast
} from '../types/WeatherForecast';
import { useUnitSettings } from '../hooks/useUnitSettings';
import useUnitSign from '../hooks/useUnitSign';

import WeatherTable from './WeatherTable';

const apiKey = 'f8d581c6a5f819893fdbba63dc78bfe7';

const fetchWeather = async (
	latitude: number,
	longitude: number,
	unitSettings: boolean
): Promise<WeatherForecast> => {
	const units = unitSettings ? 'metric' : 'imperial';
	// console.log(
	// 	`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
	// );
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
	);
	const data = await response.json();
	return data;
};

type WeatherGroupValues = Record<string, ForecastItem[]>;
type WeatherGrouped = {
	date: string;
	data: ForecastItem[];
	icon: string;
};
const groupWeatherDataByDay = (data: WeatherForecast): WeatherGrouped[] => {
	const groupedData = data.list.reduce(
		(acc: WeatherGroupValues, item: ForecastItem) => {
			const date = item.dt_txt.split(' ')[0];
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(item);
			return acc;
		},
		{}
	);
	return Object.keys(groupedData).map((date: string) => ({
		date,
		data: groupedData[date],
		icon: groupedData[date][0].weather[0].icon
	}));
};

const getAverageVal = (data: ForecastItem[], key: MainDataKey): number => {
	const temps = data.map((item: ForecastItem) => item.main[key]);
	const sum = temps.reduce((acc: number, temp: number) => acc + temp, 0);
	return temps.length !== 0 ? sum / temps.length : 0;
};

const getMinVal = (data: ForecastItem[], key: MainDataKey): number => {
	const temps: number[] = data.map((item: ForecastItem) => item.main[key]);
	return Math.min(...temps);
};

const getMaxVal = (data: ForecastItem[], key: MainDataKey): number => {
	const temps: number[] = data.map((item: ForecastItem) => item.main[key]);
	return Math.max(...temps);
};

const getMainAvgValues = (data: ForecastItem[], date: string, icon: string) => {
	const avgTemp = getAverageVal(data, 'temp');
	const avgFeelsLike = getAverageVal(data, 'feels_like');
	const avgTempMin = getMinVal(data, 'temp_min');
	const avgTempMax = getMaxVal(data, 'temp_max');
	const avgPressure = getAverageVal(data, 'pressure');
	const avgSeaLevel = getAverageVal(data, 'sea_level');
	const avgGroundLevel = getAverageVal(data, 'grnd_level');
	const avgHumidity = getAverageVal(data, 'humidity');
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

type WeatherCardProps = {
	latitude: number;
	longitude: number;
};
const WeatherCard: FC<WeatherCardProps> = ({ latitude, longitude }) => {
	const [weather, setWeather] = useState<WeatherForecast>();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [unitSettings] = useUnitSettings();
	const [tempSign] = useUnitSign();

	useEffect(() => {
		// NOTE: This is ugly AF
		setLoading(true);
		fetchWeather(latitude, longitude, unitSettings)
			.then(data => {
				setWeather(data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, [latitude, longitude, unitSettings]);

	if (error) {
		return <Typography variant="h1">Failed to load</Typography>;
	}

	if (loading) return <CircularProgress />;

	return (
		<>
			{weather && (
				<Grid container spacing={1} justifyContent="space-between">
					{groupWeatherDataByDay(weather)
						.map((item: WeatherGrouped) =>
							getMainAvgValues(item.data, item.date, item.icon)
						)
						.map((item, k) => (
							<Grid item xs={2} sm={2} md={2} lg={2} key={k}>
								<Card
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										width: '100%',
										height: '100%',
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
											<Typography variant="h5" color="textSecondary">
												{`${days[new Date(item.date).getDay()]} ${new Date(
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
										<Typography variant="h6" color="textSecondary">
											Temperature: {Math.round(item.avgTemp * 100) / 100}
											{tempSign}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											Feels Like Temperature:{' '}
											{Math.round(item.avgFeelsLike * 100) / 100}
											{tempSign}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											Min Temperature: {Math.round(item.avgTempMin * 100) / 100}
											{tempSign}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											Max Temperature: {Math.round(item.avgTempMax * 100) / 100}
											{tempSign}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											Pressure: {Math.round(item.avgPressure * 100) / 100} hPa
										</Typography>
										<Typography variant="h6" color="textSecondary">
											Humidity: {Math.round(item.avgHumidity * 100) / 100}%
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
				</Grid>
			)}
			<WeatherTable weather={weather} />
		</>
	);
};

export default WeatherCard;
