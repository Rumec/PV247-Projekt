import useSWR from 'swr';

import { fetchWeatherByIds } from '../utils/fetchers';

const useLocationWeatherInfo = (locationIds: number[]) => {
	const { data, error } = useSWR(locationIds.join(','), fetchWeatherByIds);

	return {
		weatherInfo: data?.list,
		isLoading: !error && !data,
		error
	};
};

export default useLocationWeatherInfo;
