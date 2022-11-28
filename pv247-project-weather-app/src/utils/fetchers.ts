import axios from 'axios';

export const fetchWeatherByIds = async (url: string, query: string) => {
	const res = await axios.get(`${url}${query}`);

	if (res.status !== 200) {
		const err = new Error('Data were not loaded properly');
		throw err;
	}

	return res.data;
};
