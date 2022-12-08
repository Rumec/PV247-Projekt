import { Clouds, Coord, Weather } from '../utils/typeDefinitions';

type MainData = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	temp_kf: number;
};
export type MainDataKey = keyof MainData;

type CityData = {
	id: number;
	name: string;
	coord: Coord;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
};

type WindData = {
	speed: number;
	deg: number;
	gust: number;
};

export type ForecastItem = {
	dt: number;
	main: MainData;
	weather: Weather;
	clouds: Clouds;
	wind: WindData;
	visibility: number;
	pop: number;
	sys: {
		pod: string;
	};
	dt_txt: string;
};
export type ForecastItemKey = keyof ForecastItem;

export type WeatherForecast = {
	cos: string;
	message: string;
	cnt: number;
	list: [ForecastItem];
	city: CityData;
};
