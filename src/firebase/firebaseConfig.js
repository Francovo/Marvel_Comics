// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDXlx8ApZ5dOCekG7QZWNLqSNUMCNuFzms',
	authDomain: 'marvelcomics-3d77b.firebaseapp.com',
	projectId: 'marvelcomics-3d77b',
	storageBucket: 'marvelcomics-3d77b.appspot.com',
	messagingSenderId: '699148154552',
	appId: '1:699148154552:web:40db9d725acfeb7e59264d',
	measurementId: 'G-7WJFPCR7NP',
};

const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const db = getFirestore();

export { app, google, db };
