import axios from 'axios';

export const fetchFromWeatherApi = async (url: string, query: string) => {
	const res = await axios.get(`${url}${query}`);

	if (res.status !== 200) {
		throw new Error('Data were not loaded properly');
	}

	return res.data;
};
