import useSWR from 'swr';

import { fetchWeatherByIds } from '../utils/fetchers';

const useLocationWeatherInfo = (locationIds: number[]) => {
	const query = `?id=${locationIds.join(
		','
	)}&units=metric&APPID=f8d581c6a5f819893fdbba63dc78bfe7`;
	const { data, error } = useSWR(
		['https://api.openweathermap.org/data/2.5/group', query],
		fetchWeatherByIds
	);

	return {
		weatherInfo: data?.list,
		isLoading: !error && !data,
		error
	};
};

export default useLocationWeatherInfo;
