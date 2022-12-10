import { useCallback, useEffect } from 'react';
import { getDoc, setDoc } from 'firebase/firestore';

import { unitSettingsDocument } from '../utils/firebase';

import { useUnitSettings } from './useUnitSettings';
import useLoggedInUser from './useLoggedInUser';

const useUnitSwitch = () => {
	const [userSettings, setUserSettings] = useUnitSettings();
	const user = useLoggedInUser();

	// Checks whether user already logged in and thus has his entry in the database
	// if not, new entry with default value (celsius, we are not dumbasses) is created
	const getSettings = async () => {
		if (user) {
			const docSnap = await getDoc(unitSettingsDocument(user?.email as string));

			if (docSnap.exists()) {
				setUserSettings(docSnap.data().useCelsius);
			} else {
				await setDoc(unitSettingsDocument(user?.email as string), {
					userEmail: user?.email as string,
					useCelsius: true
				});
				setUserSettings(true);
			}
		}
	};

	useEffect(() => {
		getSettings().catch(err => console.log(err));
	}, [user]);

	return {
		id: 'unit-switch',
		value: userSettings,
		checked: userSettings,
		onChange: useCallback(async () => {
			await setDoc(unitSettingsDocument(user?.email as string), {
				userEmail: user?.email as string,
				useCelsius: !userSettings
			});
			setUserSettings(prevState => !prevState);
		}, [user, userSettings]),
		size: 'medium' as 'small' | 'medium' | undefined
	};
};

export default useUnitSwitch;
