import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyDa0oK8xxq-QpCiBEk6x_qmUYyR9HetQPg',
  authDomain: 'al-tiro-60b50.firebaseapp.com',
  projectId: 'al-tiro-60b50',
  storageBucket: 'al-tiro-60b50.firebasestorage.app',
  messagingSenderId: '924744746273',
  appId: '1:924744746273:web:d594dd41ba6c8ef60f6a60',
});

const auth = getAuth(app);
const googleAuthProvider = GoogleAuthProvider;
export { auth, googleAuthProvider, signInWithPopup };
