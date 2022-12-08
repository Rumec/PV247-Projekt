import {
	Avatar,
	Button,
	CardHeader,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import { CSVLink } from 'react-csv';

import { ForecastItem, WeatherForecast } from '../types/WeatherForecast';

const headers = [
	{ label: 'Date', key: 'date' },
	{ label: 'Description', key: 'desc' },
	{ label: 'Cloudiness', key: 'clouds' },
	{ label: 'Wind Speed', key: 'wind_speed' },
	{ label: 'Wind Direction', key: 'wind_dir' },
	{ label: 'Wind Gust', key: 'wind_gust' },
	{ label: 'Visibility', key: 'visibility' },
	{ label: 'Rain Probability', key: 'rain_prop' },
	{ label: 'Temperature', key: 'temp' },
	{ label: 'Feels like', key: 'feels_like' },
	{ label: 'Min Temperature', key: 'temp_min' },
	{ label: 'Max Temperature', key: 'temp_max' },
	{ label: 'Pressure', key: 'pressure' },
	{ label: 'Sea Level', key: 'sea_level' },
	{ label: 'Ground Level', key: 'grnd_level' },
	{ label: 'Humidity', key: 'humidity' }
];

const getWeatherData = (weather: WeatherForecast) =>
	weather.list.map((item: ForecastItem) => ({
		date: item.dt_txt,
		desc: item.weather[0].description,
		clouds: item.clouds.all,
		wind_speed: item.wind.speed,
		wind_dir: item.wind.deg,
		wind_gust: item.wind.gust,
		visibility: item.visibility,
		rain_prop: item.pop,
		temp: item.main.temp,
		feels_like: item.main.feels_like,
		temp_min: item.main.temp_min,
		temp_max: item.main.temp_max,
		pressure: item.main.pressure,
		sea_level: item.main.sea_level,
		grnd_level: item.main.grnd_level,
		humidity: item.main.humidity
	}));

type WeatherTableProps = {
	weather: WeatherForecast | undefined;
};

const WeatherTable: React.FC<WeatherTableProps> = ({ weather }) => (
	<Paper sx={{ width: '100%', overflow: 'hidden' }}>
		<TableContainer sx={{ maxHeight: 700, maxWidth: '100%' }}>
			<Table
				sx={{
					rowStyle: {
						fontSize: 24
					}
				}}
				size="small"
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell align="right">Description</TableCell>
						<TableCell align="right">Cloudiness</TableCell>
						<TableCell align="right">Wind Speed</TableCell>
						<TableCell align="right">Wind Direction</TableCell>
						<TableCell align="right">Wind Gust</TableCell>
						<TableCell align="right">Visibility</TableCell>
						<TableCell align="right">Rain probability</TableCell>
						<TableCell align="right">Temperature</TableCell>
						<TableCell align="right">Feels like</TableCell>
						<TableCell align="right">Min Temperature</TableCell>
						<TableCell align="right">Max Temperature</TableCell>
						<TableCell align="right">Pressure</TableCell>
						<TableCell align="right">Sea Level</TableCell>
						<TableCell align="right">Ground Level</TableCell>
						<TableCell align="right">Humidity</TableCell>
						{weather && (
							<TableCell align="right">
								<Button variant="outlined">
									<CSVLink data={getWeatherData(weather)} headers={headers}>
										Export to CSV
									</CSVLink>
								</Button>
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				{weather && (
					<TableBody>
						{weather.list.map((row: ForecastItem) => (
							<TableRow
								key={row.dt_txt}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									<CardHeader
										avatar={
											<Avatar
												alt=""
												src={`weather_icons/${row.weather[0].icon}.png`}
											/>
										}
										title={row.dt_txt}
									/>
								</TableCell>
								<TableCell align="right">
									{row.weather[0].description}
								</TableCell>
								<TableCell align="right">{row.clouds.all}</TableCell>
								<TableCell align="right">{row.wind.speed}</TableCell>
								<TableCell align="right">{row.wind.deg}</TableCell>
								<TableCell align="right">{row.wind.gust}</TableCell>
								<TableCell align="right">{row.visibility}</TableCell>
								<TableCell align="right">{row.pop}</TableCell>
								<TableCell align="right">{row.main.temp}</TableCell>
								<TableCell align="right">{row.main.feels_like}</TableCell>
								<TableCell align="right">{row.main.temp_min}</TableCell>
								<TableCell align="right">{row.main.temp_max}</TableCell>
								<TableCell align="right">{row.main.pressure}</TableCell>
								<TableCell align="right">{row.main.sea_level}</TableCell>
								<TableCell align="right">{row.main.grnd_level}</TableCell>
								<TableCell align="right">{row.main.humidity}</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	</Paper>
);

export default WeatherTable;
