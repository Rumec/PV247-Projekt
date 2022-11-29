import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	getFirestore,
	DocumentReference
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyAMutb8nnQynerYgDZFsnxOPIn7R3Pw0R0',
	authDomain: 'pv247-projekt-1a41d.firebaseapp.com',
	projectId: 'pv247-projekt-1a41d',
	storageBucket: 'pv247-projekt-1a41d.appspot.com',
	messagingSenderId: '1054167423490',
	appId: '1:1054167423490:web:8ed048c0325443ed7e251b'
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

// UserGroup collection
export type UserGroup = {
	user_email: string;
};

export const userGroupsCollection = collection(
	db,
	'user_groups'
) as CollectionReference<UserGroup>;
