import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState
} from 'react';

export type UserSettingsState = [boolean, Dispatch<SetStateAction<boolean>>];

const UserSettingsContext = createContext<UserSettingsState>(
	undefined as never
);

export const UserSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
	const userSettingsState = useState<boolean>(false);

	return (
		<UserSettingsContext.Provider value={userSettingsState}>
			{children}
		</UserSettingsContext.Provider>
	);
};

export const useUserSettings = () => useContext(UserSettingsContext);
