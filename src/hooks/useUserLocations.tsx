import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState
} from 'react';

import { FavoritePlace } from '../utils/firebase';

export type FavoritePlaceWrapper = FavoritePlace & { dbID: string };

type UserLocationsState = [
	FavoritePlaceWrapper[],
	Dispatch<SetStateAction<FavoritePlaceWrapper[]>>
];

const UserLocationsContext = createContext<UserLocationsState>(
	undefined as never
);

export const UserLocationsProvider: FC<PropsWithChildren> = ({ children }) => {
	const userLocationsState = useState<FavoritePlaceWrapper[]>([]);
	return (
		<UserLocationsContext.Provider value={userLocationsState}>
			{children}
		</UserLocationsContext.Provider>
	);
};

export const useUserLocations = () => useContext(UserLocationsContext);
