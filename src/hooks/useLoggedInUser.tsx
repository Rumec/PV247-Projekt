import { User } from 'firebase/auth';
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';

import { onAuthChanged } from '../utils/firebase';

type UserState = User | undefined;
const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<UserState>();

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useLoggedInUser = () => useContext(UserContext);
export default useLoggedInUser;
