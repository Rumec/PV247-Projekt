/*****************************************************************************/
/****************************Weather data types*******************************/
/*****************************************************************************/
type Coord = {
	lon: number;
	lat: number;
};

type SystemData = {
	country: string;
	timezone: number;
	sunrise: number;
	sunset: number;
};

type Weather = [
	{
		id: number;
		main: string;
		description: string;
		icon: string;
	}
];

type MainData = {
	temp: number;
	feels_like: number;
	temp_min: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
};

type WindData = {
	speed: number;
	deg: number;
};

type Clouds = {
	all: number;
};

export type LocationWeather = {
	coord: Coord;
	sys: SystemData;
	weather: Weather;
	main: MainData;
	visibility: number;
	wind: WindData;
	clouds: Clouds;
	dt: number;
	id: number;
	name: string;
};

export type WeatherDataReturned = {
	cnt: number;
	list: LocationWeather[];
};
/*****************************************************************************/
