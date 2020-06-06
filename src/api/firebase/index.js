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

// Uncomment this while running firebase emulator.
if (process.env.NODE_ENV === 'development') {
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false,
  });
}

// Export firebase stuff.
export const { auth, firestore, storage, functions } = firebase;

export default firebase;
