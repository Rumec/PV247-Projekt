import { useCallback, useEffect } from 'react';
import { getDoc, setDoc } from 'firebase/firestore';

import { userSettingsDocument } from '../utils/firebase';

import { useUserSettings } from './useUserSettings';
import useLoggedInUser from './useLoggedInUser';

const useUnitSwitch = () => {
	const [userSettings, setUserSettings] = useUserSettings();
	const user = useLoggedInUser();

	// Checks whether user already logged in and thus has his entry in the database
	// if not, new entry with default value (celsius, we are not dumbasses) is created
	const getSettings = async () => {
		if (user) {
			const docSnap = await getDoc(userSettingsDocument(user?.email as string));

			if (docSnap.exists()) {
				setUserSettings(docSnap.data().useCelsius);
			} else {
				await setDoc(userSettingsDocument(user?.email as string), {
					userEmail: user?.email as string,
					useCelsius: true
				});
				setUserSettings(true);
			}
		}
	};

	useEffect(() => {
		getSettings().catch(err => console.log('fuck', err));
	}, [user]);

	return {
		id: 'unit-switch',
		value: userSettings,
		checked: userSettings,
		onChange: useCallback(async () => {
			await setDoc(userSettingsDocument(user?.email as string), {
				userEmail: user?.email as string,
				useCelsius: !userSettings
			});
			setUserSettings(prevState => !prevState);
		}, [user, userSettings]),
		size: 'medium' as 'small' | 'medium' | undefined
	};
};

export default useUnitSwitch;
