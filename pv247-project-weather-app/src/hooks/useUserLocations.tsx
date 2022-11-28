import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState
} from 'react';

type UserLocationsState = [number[], Dispatch<SetStateAction<number[]>>];

// TODO: This will be fetched from API (FireBase)
const UserLocationsContext = createContext<UserLocationsState>(
	undefined as never
);

export const UserLocationsProvider: FC<PropsWithChildren> = ({ children }) => {
	const userLocationsState = useState<number[]>([
		524901, 703448, 2643743, 14256
	]);
	return (
		<UserLocationsContext.Provider value={userLocationsState}>
			{children}
		</UserLocationsContext.Provider>
	);
};

export const useUserLocations = () => useContext(UserLocationsContext);
