import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAB1VPLzAoCfkWaIp-elNTky1rySbnG6Dc',
	authDomain: 'alien-fashion-store-906f7.firebaseapp.com',
	projectId: 'alien-fashion-store-906f7',
	storageBucket: 'alien-fashion-store-906f7.appspot.com',
	messagingSenderId: '776907225519',
	appId: '1:776907225519:web:3a1a6ba9bb79db2272575a',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

//exports
export const auth = firebaseApp.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
