import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
// import 'firebase/analytics';
import config from './config';

// Initialize Firebase
firebase.initializeApp(config);
// firebase.analytics();

// Export firebase stuff.
export const { auth, firestore, storage, functions } = firebase;

// Uncomment this while running firebase emulator.
// if (process.env.NODE_ENV === 'development') {
//   firebase.functions().useFunctionsEmulator('http://localhost:5001');
// }

export default firebase;
