import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	// apiKey: 'AIzaSyAMutb8nnQynerYgDZFsnxOPIn7R3Pw0R0',
	// authDomain: 'pv247-projekt-1a41d.firebaseapp.com',
	// projectId: 'pv247-projekt-1a41d',
	// storageBucket: 'pv247-projekt-1a41d.appspot.com',
	// messagingSenderId: '1054167423490',
	// appId: '1:1054167423490:web:8ed048c0325443ed7e251b'
	apiKey: 'AIzaSyDN-_-jpqKyjvQqrr8KnLUw9akKKxYvp74',
	authDomain: 'pv247-projekt-9b911.firebaseapp.com',
	projectId: 'pv247-projekt-9b911',
	storageBucket: 'pv247-projekt-9b911.appspot.com',
	messagingSenderId: '592431243266',
	appId: '1:592431243266:web:d6f56aa36c4eba5423c71b'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

/************************ Firestore *******************************************/

// Firestore
const db = getFirestore();

// FavoritePlace collection
export type FavoritePlace = {
	// Email (as unique identifier) of user - owner
	by: string;
	// Id of the location provided by wheather api
	placeId: number;
};

export const favoritePlacesCollection = collection(
	db,
	'favorite_places'
) as CollectionReference<FavoritePlace>;

export const favoritePlacesDocument = (id: string) =>
	doc(db, 'favorite_places', id) as DocumentReference<FavoritePlace>;

export type UnitSettings = {
	userEmail: string;
	useCelsius: boolean;
};

export const unitSettingsCollection = collection(
	db,
	'unit_settings'
) as CollectionReference<UnitSettings>;

export const unitSettingsDocument = (userEmail: string) =>
	doc(db, 'unit_settings', userEmail) as DocumentReference<UnitSettings>;

// UserGroup collection
export type UserGroup = Record<string, never>;

export const userGroupsCollection = collection(
	db,
	'user_groups'
) as CollectionReference<UserGroup>;

export const groupDocument = (id: string) =>
	doc(db, 'user_groups', id) as DocumentReference<UserGroup>;

// GroupUsers collection
export type GroupUser = {
	group_name: string;
};

export const groupUsersCollection = collection(
	db,
	'group_users'
) as CollectionReference<GroupUser>;

export const groupUserDocument = (id: string) =>
	doc(db, 'group_users', id) as DocumentReference<GroupUser>;

export const fetchUserGroup = async (user_email: string) => {
	const groupName = await getDoc(groupUserDocument(user_email));
	return groupName;
};

export const fetchAllUsersInGroup = async (groupName: string | undefined) => {
	const q = query(groupUsersCollection, where('group_name', '==', groupName));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(doc => doc.id);
};
