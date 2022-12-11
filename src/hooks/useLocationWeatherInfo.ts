import useSWR from 'swr';
import { useMemo } from 'react';

import { fetchFromWeatherApi } from '../utils/fetchers';

import { useUnitSettings } from './useUnitSettings';

const useLocationWeatherInfo = (locationIds: number[]) => {
	const [unitSettings] = useUnitSettings();

	const units = useMemo(
		() => (unitSettings ? 'metric' : 'imperial'),
		[unitSettings]
	);

	const query = `?id=${locationIds.join(
		','
	)}&units=${units}&APPID=f8d581c6a5f819893fdbba63dc78bfe7`;

	// NOTE: null prevents SWR from fetching data (e.g. when the list is empty)
	const { data, error } = useSWR(
		locationIds.length > 0
			? ['https://api.openweathermap.org/data/2.5/group', query]
			: null,
		fetchFromWeatherApi
	);

	return {
		weatherInfo: data?.list,
		isLoading: !error && !data,
		error
	};
};

export default useLocationWeatherInfo;
