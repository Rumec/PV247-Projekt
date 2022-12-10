import { useUnitSettings } from './useUnitSettings';

const useUnitSign = () => {
	const [unitSettings] = useUnitSettings();

	return [unitSettings ? '°C' : '°F', unitSettings ? 'm/s' : 'ft/s'] as const;
};

export default useUnitSign;
