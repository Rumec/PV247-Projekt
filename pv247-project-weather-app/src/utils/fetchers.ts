import axios from 'axios';

export const fetchWeatherByIds = async (ids: string) => {
	const res = await axios.get(
		`https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&APPID=f8d581c6a5f819893fdbba63dc78bfe7`
	);

	if (res.status !== 200) {
		const err = new Error('Data were not loaded properly');
		throw err;
	}

	return res.data;
};
