import { getDoc, getDocs, query, where } from 'firebase/firestore';
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';

import {
	groupUserDocument,
	groupUsersCollection,
	onAuthChanged
} from '../utils/firebase';

type GroupUsersWrapper = {
	groupName: string | undefined;
	groupUsers: string[];
};
type GroupUsersState = [
	GroupUsersWrapper,
	Dispatch<SetStateAction<GroupUsersWrapper>>
];

const GroupUsersContext = createContext<GroupUsersState>(undefined as never);

export const GroupUsersProvider: FC<PropsWithChildren> = ({ children }) => {
	const [groupUsersState, setGroupUsersState] = useState<GroupUsersWrapper>({
		groupName: undefined,
		groupUsers: []
	});

	const fetchUserGroup = async (user_email: string) => {
		const groupUserDoc = await getDoc(groupUserDocument(user_email));
		const groupName = groupUserDoc.data()?.group_name;
		const q = query(groupUsersCollection, where('group_name', '==', groupName));
		const querySnapshot = await getDocs(q);
		setGroupUsersState({
			groupName,
			groupUsers: querySnapshot.docs.map(doc => doc.id)
		});
	};

	useEffect(() => {
		onAuthChanged(async u => {
			if (!u?.email) return;
			fetchUserGroup(u.email);
		});
	}, []);

	return (
		<GroupUsersContext.Provider value={[groupUsersState, setGroupUsersState]}>
			{children}
		</GroupUsersContext.Provider>
	);
};

export const useGroupUsers = () => useContext(GroupUsersContext);
