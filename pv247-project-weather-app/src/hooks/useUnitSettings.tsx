import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState
} from 'react';

export type UnitSettingsState = [boolean, Dispatch<SetStateAction<boolean>>];

const UnitSettingsContext = createContext<UnitSettingsState>(
	undefined as never
);

export const UnitSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
	const unitSettingsState = useState<boolean>(false);

	return (
		<UnitSettingsContext.Provider value={unitSettingsState}>
			{children}
		</UnitSettingsContext.Provider>
	);
};

export const useUnitSettings = () => useContext(UnitSettingsContext);
