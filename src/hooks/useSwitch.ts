import { useCallback, useState } from 'react';

type SizeType = 'small' | 'medium' | undefined;

const useSwitch = (id: string, size: SizeType) => {
	const [isOn, setIsOn] = useState(false);

	return [
		isOn,
		{
			id,
			value: isOn,
			checked: isOn,
			onChange: useCallback(() => setIsOn(prevState => !prevState), []),
			size
		}
	] as const;
};

export default useSwitch;
